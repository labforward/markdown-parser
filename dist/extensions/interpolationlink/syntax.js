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
    // const markers = 0;
    return start;
    function start(code) {
        if (code === codes.leftSquareBracket) {
            effects.enter("dummyEvent");
            effects.consume(code);
            effects.exit("dummyEvent");
            effects.enter("interpolationlink");
            effects.enter("interpolationlinkLabel");
            return label;
        }
        return nok(code);
    }
    function label(code) {
        if (code === codes.rightSquareBracket) {
            effects.enter("dummyEvent");
            effects.consume(code);
            effects.exit("dummyEvent");
            effects.exit("interpolationlinkLabel");
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
            effects.enter("interpolationlinkDestination");
            effects.consume(code);
            return destination;
        }
        return nok(code);
    }
    function destination(code) {
        if (code === codes.rightParenthesis) {
            // empty parenthesis, no target location
            if (self.previous === codes.leftParenthesis) {
                return nok(code);
            }
            // if (startMarker < 2 || endMarker < 2) {
            //   return nok(code);
            // }
            effects.exit("interpolationlinkDestination");
            effects.exit("interpolationlink");
            effects.enter("dummyEvent");
            effects.consume(code);
            effects.exit("dummyEvent");
            return ok;
        }
        if (isEndOfLine(code) || code === codes.virtualSpace) {
            return nok(code);
        }
        effects.consume(code);
        return destination;
    }
}
//# sourceMappingURL=syntax.js.map