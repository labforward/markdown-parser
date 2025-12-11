import { markdownLineEnding, markdownSpace } from 'micromark-util-character';
import { codes } from 'micromark-util-symbol';
import type {
  Code,
  Construct,
  Effects,
  State,
  TokenizeContext,
} from 'micromark-util-types';

import charactersConstruct from '@/extensions/utils/characters-construct.js';

const gridContainerConstruct: Construct = {
  continuation: {
    tokenize: tokenizeGridContainerContinuation,
  },
  exit: tokenizeGridContainerExit,
  name: 'gridcontainer',
  tokenize: tokenizeGridContainer,
};

export default {
  document: {
    [codes.percentSign]: gridContainerConstruct,
  },
};

function tokenizeGridContainer(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
) {
  const self = this;

  return onGridContainerProbable;

  function onGridContainerProbable(code: Code) {
    if (isGridContainerOpen()) return nok(code);

    // For some reason, this cannot be in onGridContainerStart,
    // as it prevents the character from being consumed in "ok"
    effects.enter('gridContainer', { _container: true });
    // Add a temp event for the percent sign so it's not part
    // of the grid container
    effects.enter('gridContainerPercentSign');
    effects.consume(code);

    return effects.check(
      charactersConstruct([
        codes.lowercaseC,
        codes.lowercaseO,
        codes.lowercaseL,
      ]),
      onGridContainerStart,
      nok,
    );
  }

  function onGridContainerStart(code: Code) {
    effects.exit('gridContainerPercentSign');
    return ok(code);
  }

  function isGridContainerOpen() {
    for (let index = self.events.length - 1; index >= 0; index -= 1) {
      const [event, data] = self.events[index];

      if (data.type === 'gridContainer') {
        if (event === 'enter') return true;
        if (event === 'exit') return false;
      }
    }

    return false;
  }
}

function tokenizeGridContainerContinuation(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State,
) {
  const self = this;
  let newlines = 0;

  return onContinue;

  function onContinue(code: Code) {
    if (markdownLineEnding(self.previous)) newlines += 1;

    return countNewLines(code);
  }

  function countNewLines(code: Code) {
    if (!markdownLineEnding(code)) return afterNewLines(code);

    effects.enter('gridContainerNewline');
    newlines += 1;
    effects.consume(code);
    effects.exit('gridContainerNewline');

    return countNewLines;
  }

  function afterNewLines(code: Code) {
    if (markdownSpace(code)) return ok(code);
    if (code === codes.percentSign) {
      if (newlines < 2) return ok(code);
      else return nok(code);
    }

    return nok(code);
  }
}

function tokenizeGridContainerExit(effects: Effects): undefined {
  effects.exit('gridContainer');
}
