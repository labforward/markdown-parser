import { markdownLineEnding, markdownSpace } from 'micromark-util-character';
import { codes } from 'micromark-util-symbol';
import charactersConstruct from '../../extensions/utils/characters-construct.js';
const gridContainerConstruct = {
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
function tokenizeGridContainer(effects, ok, nok) {
    const self = this;
    return onGridContainerProbable;
    function onGridContainerProbable(code) {
        if (isGridContainerOpen())
            return nok(code);
        effects.enter('gridContainer', { _container: true });
        effects.enter('gridContainerPercentSign');
        effects.consume(code);
        return effects.check(charactersConstruct([
            codes.lowercaseC,
            codes.lowercaseO,
            codes.lowercaseL,
        ]), onGridContainerStart, nok);
    }
    function onGridContainerStart(code) {
        effects.exit('gridContainerPercentSign');
        return ok(code);
    }
    function isGridContainerOpen() {
        for (let index = self.events.length - 1; index >= 0; index -= 1) {
            const [event, data] = self.events[index];
            if (data.type === 'gridContainer') {
                if (event === 'enter')
                    return true;
                if (event === 'exit')
                    return false;
            }
        }
        return false;
    }
}
function tokenizeGridContainerContinuation(effects, ok, nok) {
    const self = this;
    let newlines = 0;
    return onContinue;
    function onContinue(code) {
        if (markdownLineEnding(self.previous))
            newlines += 1;
        return countNewLines(code);
    }
    function countNewLines(code) {
        if (!markdownLineEnding(code))
            return afterNewLines(code);
        effects.enter('gridContainerNewline');
        newlines += 1;
        effects.consume(code);
        effects.exit('gridContainerNewline');
        return countNewLines;
    }
    function afterNewLines(code) {
        if (markdownSpace(code))
            return ok(code);
        if (code === codes.percentSign) {
            if (newlines < 2)
                return ok(code);
            else
                return nok(code);
        }
        return nok(code);
    }
}
function tokenizeGridContainerExit(effects) {
    effects.exit('gridContainer');
}
//# sourceMappingURL=syntax.js.map