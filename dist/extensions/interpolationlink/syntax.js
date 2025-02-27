var _a;
import { codes } from "micromark-util-symbol";
var interpolationLinkConstruct = {
    name: "interpolationlink",
    tokenize: tokenizeInterpolationLink,
};
export default {
    text: (_a = {},
        _a[codes.leftSquareBracket] = interpolationLinkConstruct,
        _a),
};
function tokenizeInterpolationLink(effects, ok, nok) {
    // const self = this;
    // const markers = 0;
    return start;
    function start(code) {
        if (code === codes.leftSquareBracket) {
            effects.enter("interpolationlink");
            effects.enter("interpolationlinkLabel");
            effects.consume(code);
            return label;
        }
        return nok(code);
    }
    function label(code) {
        if (code === codes.rightSquareBracket) {
            effects.consume(code);
            effects.exit("interpolationlinkLabel");
            return afterLabel;
        }
        effects.consume(code);
        return label;
    }
    function afterLabel(code) {
        if (code === codes.leftParenthesis) {
            effects.enter("interpolationlinkDestination");
            effects.consume(code);
            return destination;
        }
        return nok(code);
    }
    function destination(code) {
        if (code === codes.rightParenthesis) {
            effects.consume(code);
            effects.exit("interpolationlinkDestination");
            effects.exit("interpolationlink");
            return ok;
        }
        effects.consume(code);
        return destination;
    }
}
//# sourceMappingURL=syntax.js.map