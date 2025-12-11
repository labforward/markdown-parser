import { blankLine } from 'micromark-core-commonmark';
import { factorySpace } from 'micromark-factory-space';
import { markdownLineEnding } from 'micromark-util-character';
import { codes, types } from 'micromark-util-symbol';
import factoryCharacters from '../../extensions/utils/factory-characters.js';
const prefixSize = (events) => {
    const tail = events[events.length - 1];
    return tail && tail[1].type === types.linePrefix
        ? tail[2].sliceSerialize(tail[1], true).length
        : 0;
};
const gridConstruct = {
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
function tokenizeGrid(effects, ok, nok) {
    const self = this;
    const indentation = prefixSize(self.events);
    const cPrecededByPercentSign = (code) => self.previous === codes.percentSign && code === codes.lowercaseC;
    effects.enter('grid', { _container: true });
    self.containerState.indentation = indentation;
    effects.enter('gridPrefix');
    return factoryCharacters(effects, onGridStart, factoryCharacters(effects, onGridStart, nok)([cPrecededByPercentSign, codes.lowercaseO, codes.lowercaseL]))([codes.percentSign, codes.lowercaseC, codes.lowercaseO, codes.lowercaseL]);
    function onGridStart(_code) {
        effects.exit('gridPrefix');
        return factorySpace(effects, onGridPropsStart, types.whitespace);
    }
    function onGridPropsStart(code) {
        if (code === codes.eof || markdownLineEnding(code)) {
            return onGridContent(code);
        }
        effects.enter('gridProps');
        return onGridProps(code);
    }
    function onGridProps(code) {
        if (code === codes.eof || markdownLineEnding(code)) {
            return onGridPropsEnd(code);
        }
        effects.consume(code);
        return onGridProps;
    }
    function onGridPropsEnd(code) {
        effects.exit('gridProps');
        return onGridContent(code);
    }
    function onGridContent(code) {
        return ok(code);
    }
}
function tokenizeGridContinuation(effects, ok, nok) {
    return effects.check(blankLine, ok, effects.attempt(indentConstruct, ok, nok));
}
function tokenizeIndent(effects, ok, nok) {
    const self = this;
    return onIndent;
    function onIndent(code) {
        const current = prefixSize(self.events);
        const maximum = getMaximumIndentation();
        if (current === 0) {
            return factorySpace(effects, afterIndent, 'linePrefix', maximum + 1)(code);
        }
        if (maximum === current)
            return afterIndent(code);
        return nok(code);
    }
    function afterIndent(code) {
        const expected = self.containerState.indentation;
        const actual = prefixSize(self.events);
        return expected < actual ? ok(code) : nok(code);
    }
    function getMaximumIndentation() {
        let open = 0;
        for (let index = self.events.length - 1; index >= 0; index -= 1) {
            const [event, data] = self.events[index];
            if (data.type === 'grid') {
                if (event === 'enter')
                    open += 1;
                else if (event === 'exit')
                    open -= 1;
            }
        }
        return open * 2;
    }
}
function tokenizeGridExit(effects) {
    effects.exit('grid');
}
//# sourceMappingURL=syntax.js.map