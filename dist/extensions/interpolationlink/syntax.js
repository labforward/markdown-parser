var _a;
import { codes } from "micromark-util-symbol";
var interpolationLinkConstruct = {
    name: "interpolationlink",
    tokenize: tokenizeInterpolationLink,
};
var isEndOfLine = function (code) {
    return (code === codes.eof ||
        code === codes.lineFeed ||
        code === codes.carriageReturn ||
        code === codes.carriageReturnLineFeed);
};
// const startMarker = 0;
// const endMarker = 0;
export default {
    text: (_a = {},
        _a[codes.leftSquareBracket] = interpolationLinkConstruct,
        _a),
};
function tokenizeInterpolationLink(effects, ok, nok) {
    var self = this;
    var markers = 0;
    return start;
    function start(code) {
        if (code === codes.leftSquareBracket) {
            effects.enter("dummyEvent");
            effects.consume(code);
            effects.exit("dummyEvent");
            effects.enter("interpolationLink");
            effects.enter("interpolationLinkLabel");
            return label;
        }
        return nok(code);
    }
    function label(code) {
        if (code === codes.rightSquareBracket) {
            effects.exit("interpolationLinkLabel");
            effects.enter("dummyEvent");
            effects.consume(code);
            effects.exit("dummyEvent");
            return afterLabel;
        }
        if (isEndOfLine(code)) {
            return nok(code);
        }
        effects.consume(code);
        return label;
    }
    function afterLabel(code) {
        if (code === codes.leftParenthesis) {
            effects.enter("dummyEvent");
            effects.consume(code);
            effects.exit("dummyEvent");
            return afterLabel;
        }
        if (self.previous === codes.leftParenthesis) {
            effects.enter("interpolationLinkTarget");
            effects.consume(code);
            return location;
        }
        return nok(code);
    }
    function location(code) {
        if (code === codes.rightParenthesis) {
            // empty parenthesis, no target location
            if (self.previous === codes.leftParenthesis) {
                return nok(code);
            }
            // if (startMarker < 2 || endMarker < 2) {
            //   return nok(code);
            // }
            effects.exit("interpolationLinkTarget");
            effects.exit("interpolationLink");
            effects.enter("dummyEvent");
            effects.consume(code);
            effects.exit("dummyEvent");
            return ok;
        }
        if (code === codes.leftCurlyBrace) {
            effects.consume(code);
            markers += 1;
            if (markers === 2) {
                effects.enter("interpolationLinkFormula");
                return interpolationLinkFormula;
            }
            // effects.consume(code);
            return location;
        }
        if (isEndOfLine(code) || code === codes.virtualSpace) {
            return nok(code);
        }
        effects.consume(code);
        return location;
    }
    function interpolationLinkFormula(code) {
        if (code === codes.rightCurlyBrace) {
            // empty formula
            if (self.previous === codes.leftCurlyBrace) {
                return nok(code);
            }
            effects.exit("interpolationLinkFormula");
            effects.consume(code);
            return location;
        }
        effects.consume(code);
        return interpolationLinkFormula;
    }
}
//# sourceMappingURL=syntax.js.map