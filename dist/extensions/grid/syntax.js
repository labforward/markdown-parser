var _a;
import { blankLine } from "micromark-core-commonmark";
import { codes } from "micromark-util-symbol/codes";
import { factorySpace } from "micromark-factory-space";
import { markdownLineEnding } from "micromark-util-character";
import { types } from "micromark-util-symbol/types";
import factoryCharacters from "../utils/factory-characters.js";
var prefixSize = function (events) {
    var tail = events[events.length - 1];
    return tail && tail[1].type === types.linePrefix
        ? tail[2].sliceSerialize(tail[1], true).length
        : 0;
};
var gridConstruct = {
    name: "grid",
    tokenize: tokenizeGrid,
    continuation: {
        tokenize: tokenizeGridContinuation,
    },
    exit: tokenizeGridExit,
};
var indentConstruct = {
    tokenize: tokenizeIndent,
    partial: true,
};
export default {
    document: (_a = {},
        _a[codes.percentSign] = gridConstruct,
        _a[codes.lowercaseC] = gridConstruct,
        _a),
};
function tokenizeGrid(effects, ok, nok) {
    var self = this;
    var indentation = prefixSize(self.events);
    var cPrecededByPercentSign = function (code) {
        return self.previous === codes.percentSign && code === codes.lowercaseC;
    };
    effects.enter("grid", { _container: true });
    // NOTE: the previous line ensures containerState is defined
    self.containerState.indentation = indentation;
    effects.enter("gridPrefix");
    return factoryCharacters(effects, onGridStart, factoryCharacters(effects, onGridStart, nok)([cPrecededByPercentSign, codes.lowercaseO, codes.lowercaseL]))([codes.percentSign, codes.lowercaseC, codes.lowercaseO, codes.lowercaseL]);
    function onGridStart(_code) {
        effects.exit("gridPrefix");
        return factorySpace(effects, onGridPropsStart, types.whitespace);
    }
    function onGridPropsStart(code) {
        if (code === codes.eof || markdownLineEnding(code)) {
            return onGridContent(code);
        }
        effects.enter("gridProps");
        return onGridProps(code);
    }
    function onGridProps(code) {
        if (code === codes.eof || markdownLineEnding(code)) {
            return onGridPropsEnd;
        }
        effects.consume(code);
        return onGridProps;
    }
    function onGridPropsEnd(code) {
        effects.exit("gridProps");
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
    var self = this;
    return onIndent;
    function onIndent(code) {
        var current = prefixSize(self.events);
        var maximum = getMaximumIndentation();
        if (current === 0) {
            // when grid are nested, each grid will check for continuation individually
            // but we should only consume the spaces once for the expected indentation of the deepest grid
            return factorySpace(effects, afterIndent, "linePrefix", maximum + 1 // somehow + 1 need to be there, else factorySpace will miss 1 space..
            )(code);
        }
        // all other grids within the same round of continuation check should
        // already have the correct amount of indentation consumed
        if (maximum === current)
            return afterIndent(code);
        return nok;
    }
    function afterIndent(code) {
        // we typecast here because we know that this is defined
        var expected = self.containerState.indentation;
        var actual = prefixSize(self.events);
        return expected < actual ? ok(code) : nok(code);
    }
    function getMaximumIndentation() {
        var open = 0;
        for (var index = self.events.length - 1; index >= 0; index -= 1) {
            var _a = self.events[index], event = _a[0], data = _a[1];
            if (data.type === "grid") {
                if (event === "enter")
                    open += 1;
                else if (event === "exit")
                    open -= 1;
            }
        }
        // maximum allowed indentation are 2 space per open grid
        return open * 2;
    }
}
function tokenizeGridExit(effects) {
    effects.exit("grid");
}
//# sourceMappingURL=syntax.js.map