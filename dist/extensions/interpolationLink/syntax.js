var _a;
import { codes } from "micromark-util-symbol";
var interpolationLinkConstruct = {
    name: "interpolationLink",
    tokenize: tokenizeInterpolationLink,
};
export default {
    text: (_a = {},
        _a[codes.leftSquareBracket] = interpolationLinkConstruct,
        _a),
};
function tokenizeInterpolationLink(effects, ok, nok) {
    var self = this;
    return start;
    function start(code) {
        if (code === codes.leftSquareBracket) {
            effects.enter("interpolationLink");
            effects.enter("interpolationLinkLabel");
            effects.consume(code);
            return label;
        }
        return nok(code);
    }
    function label(code) {
        if (code === codes.rightSquareBracket) {
            effects.consume(code);
            effects.exit("interpolationLinkLabel");
            return afterLabel;
        }
        // TODO: check for space, tab or line ending also
        if (code === codes.eof) {
            return nok(code);
        }
        effects.consume(code);
        return label;
    }
    function afterLabel(code) {
        if (code === codes.leftParenthesis) {
            effects.enter("interpolationLinkDestination");
            effects.consume(code);
            return destination;
        }
        // no markdown link format
        return nok(code);
    }
    function destination(code) {
        if (code === codes.rightParenthesis) {
            // empty parenthesis
            if (self.previous === codes.leftParenthesis) {
                return nok(code);
            }
            effects.consume(code);
            effects.exit("interpolationLinkDestination");
            effects.exit("interpolationLink");
            return ok;
        }
        // TODO: check for space, tab or line ending also
        if (code === codes.eof) {
            return nok(code);
        }
        effects.consume(code);
        return destination;
    }
}
//# sourceMappingURL=syntax.js.map