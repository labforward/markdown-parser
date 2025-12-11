import { blankLine } from 'micromark-core-commonmark';
import { factorySpace } from 'micromark-factory-space';
import { markdownLineEnding } from 'micromark-util-character';
import { codes, types } from 'micromark-util-symbol';
import type {
  Code,
  Construct,
  Effects,
  Event,
  State,
  TokenizeContext,
} from 'micromark-util-types';

import factoryCharacters from '@/extensions/utils/factory-characters.js';

const prefixSize = (events: Array<Event>) => {
  const tail = events[events.length - 1];

  return tail && tail[1].type === types.linePrefix
    ? tail[2].sliceSerialize(tail[1], true).length
    : 0;
};
const gridConstruct: Construct = {
  continuation: {
    tokenize: tokenizeGridContinuation,
  },
  exit: tokenizeGridExit,
  name: 'grid',
  tokenize: tokenizeGrid,
};

const indentConstruct = {
  partial: true,
  tokenize: tokenizeIndent,
};

export default {
  document: {
    [codes.percentSign]: gridConstruct,
    [codes.lowercaseC]: gridConstruct,
  },
};

function tokenizeGrid(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
) {
  const self = this;
  const indentation = prefixSize(self.events);
  const cPrecededByPercentSign = (code: Code) =>
    self.previous === codes.percentSign && code === codes.lowercaseC;

  effects.enter('grid', { _container: true });
  // NOTE: the previous line ensures containerState is defined
  self.containerState!.indentation = indentation;

  effects.enter('gridPrefix');

  return factoryCharacters(
    effects,
    onGridStart,
    factoryCharacters(
      effects,
      onGridStart,
      nok,
    )([cPrecededByPercentSign, codes.lowercaseO, codes.lowercaseL]),
  )([codes.percentSign, codes.lowercaseC, codes.lowercaseO, codes.lowercaseL]);

  function onGridStart(_code: Code) {
    effects.exit('gridPrefix');

    return factorySpace(effects, onGridPropsStart, types.whitespace);
  }

  function onGridPropsStart(code: Code) {
    if (code === codes.eof || markdownLineEnding(code)) {
      return onGridContent(code);
    }

    effects.enter('gridProps');

    return onGridProps(code);
  }

  function onGridProps(code: Code) {
    if (code === codes.eof || markdownLineEnding(code)) {
      return onGridPropsEnd(code);
    }

    effects.consume(code);
    return onGridProps;
  }

  function onGridPropsEnd(code: Code) {
    effects.exit('gridProps');

    return onGridContent(code);
  }

  function onGridContent(code: Code) {
    return ok(code);
  }
}

function tokenizeGridContinuation(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
) {
  return effects.check(
    blankLine,
    ok,
    effects.attempt(indentConstruct, ok, nok),
  );
}

function tokenizeIndent(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
) {
  const self = this;

  return onIndent;

  function onIndent(code: Code) {
    const current = prefixSize(self.events);
    const maximum = getMaximumIndentation();

    if (current === 0) {
      // when grid are nested, each grid will check for continuation individually
      // but we should only consume the spaces once for the expected indentation of the deepest grid
      return factorySpace(
        effects,
        afterIndent,
        'linePrefix',
        maximum + 1, // somehow + 1 need to be there, else factorySpace will miss 1 space..
      )(code);
    }

    // all other grids within the same round of continuation check should
    // already have the correct amount of indentation consumed
    if (maximum === current) return afterIndent(code);

    return nok(code);
  }

  function afterIndent(code: Code) {
    // we typecast here because we know that this is defined
    const expected = self.containerState!.indentation;
    const actual = prefixSize(self.events);

    return expected < actual ? ok(code) : nok(code);
  }

  function getMaximumIndentation() {
    let open = 0;

    for (let index = self.events.length - 1; index >= 0; index -= 1) {
      const [event, data] = self.events[index];

      if (data.type === 'grid') {
        if (event === 'enter') open += 1;
        else if (event === 'exit') open -= 1;
      }
    }

    // maximum allowed indentation are 2 space per open grid
    return open * 2;
  }
}

function tokenizeGridExit(effects: Effects): undefined {
  effects.exit('grid');
}
