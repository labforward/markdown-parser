var _a;
import { codes } from "micromark-util-symbol/codes";
import { markdownLineEnding, markdownSpace } from "micromark-util-character";
import charactersConstruct from "../utils/characters-construct.js";
var gridContainerConstruct = {
    name: "gridcontainer",
    tokenize: tokenizeGridContainer,
    continuation: {
        tokenize: tokenizeGridContainerContinuation,
    },
    exit: tokenizeGridContainerExit,
};
export default {
    document: (_a = {},
        _a[codes.percentSign] = gridContainerConstruct,
        _a),
};
function tokenizeGridContainer(effects, ok, nok) {
    var self = this;
    return onGridContainerProbable;
    function onGridContainerProbable(code) {
        if (isGridContainerOpen())
            return nok;
        effects.consume(code);
        return effects.check(charactersConstruct([
            codes.lowercaseC,
            codes.lowercaseO,
            codes.lowercaseL,
        ]), onGridContainerStart, nok);
    }
    function onGridContainerStart(_code) {
        effects.enter("gridContainer", { _container: true });
        return ok;
    }
    function isGridContainerOpen() {
        for (var index = self.events.length - 1; index >= 0; index -= 1) {
            var _a = self.events[index], event = _a[0], data = _a[1];
            if (data.type === "gridContainer") {
                if (event === "enter")
                    return true;
                if (event === "exit")
                    return false;
            }
        }
        return false;
    }
}
function tokenizeGridContainerContinuation(effects, ok, nok) {
    var self = this;
    var newlines = 0;
    return onContinue;
    function onContinue(code) {
        if (markdownLineEnding(self.previous))
            newlines += 1;
        return countNewLines(code);
    }
    function countNewLines(code) {
        if (!markdownLineEnding(code))
            return afterNewLines(code);
        newlines += 1;
        effects.consume(code);
        return countNewLines;
    }
    function afterNewLines(code) {
        if (markdownSpace(code))
            return ok;
        if (code === codes.percentSign) {
            if (newlines < 2)
                return ok;
            else
                return nok;
        }
        return nok;
    }
}
function tokenizeGridContainerExit(effects) {
    effects.exit("gridContainer");
}
//# sourceMappingURL=syntax.js.map