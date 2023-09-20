var _a;
import { markdownLineEnding, markdownSpace } from "micromark-util-character";
import { codes } from "micromark-util-symbol";
import charactersConstruct from "../../extensions/utils/characters-construct.js";
var gridContainerConstruct = {
    continuation: {
        tokenize: tokenizeGridContainerContinuation,
    },
    exit: tokenizeGridContainerExit,
    name: "gridcontainer",
    tokenize: tokenizeGridContainer,
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
            return nok(code);
        // For some reason, this cannot be in onGridContainerStart,
        // as it prevents the character from being consumed in "ok"
        effects.enter("gridContainer", { _container: true });
        // Add a temp event for the percent sign so it's not part
        // of the grid container
        effects.enter("gridContainerPercentSign");
        effects.consume(code);
        return effects.check(charactersConstruct([
            codes.lowercaseC,
            codes.lowercaseO,
            codes.lowercaseL,
        ]), onGridContainerStart, nok);
    }
    function onGridContainerStart(code) {
        effects.exit("gridContainerPercentSign");
        return ok(code);
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
        effects.enter("gridContainerNewline");
        newlines += 1;
        effects.consume(code);
        effects.exit("gridContainerNewline");
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
    effects.exit("gridContainer");
}
//# sourceMappingURL=syntax.js.map