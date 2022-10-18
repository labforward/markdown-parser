var _a;
import { codes } from "micromark-util-symbol/codes";
var validCode = function (code) {
    return code && /[a-zA-Z0-9=\-_]/.test(String.fromCharCode(code));
};
var interpolationConstruct = {
    name: "interpolation",
    tokenize: tokenizeInterpolation,
};
export default {
    text: (_a = {},
        _a[codes.exclamationMark] = interpolationConstruct,
        _a[codes.leftCurlyBrace] = interpolationConstruct,
        _a),
};
function tokenizeInterpolation(effects, ok, nok) {
    var type = "interpolation";
    var markers = 0;
    return onInterpolationStart;
    function onInterpolationStart(code) {
        if (code === codes.exclamationMark) {
            if (type === "bangInterpolation")
                return nok;
            type = "bangInterpolation";
            effects.consume(code);
            return onInterpolationStart;
        }
        if (code === codes.leftCurlyBrace) {
            effects.consume(code);
            markers += 1;
            return onInterpolationStart;
        }
        if (markers === 2) {
            effects.enter(type);
            return onInterpolationFormula;
        }
        return nok;
    }
    function onInterpolationFormula(code) {
        if (code === codes.rightCurlyBrace) {
            effects.exit(type);
            return onInterpolationEnd;
        }
        if (validCode(code) || code === codes.verticalBar) {
            effects.consume(code);
            return onInterpolationFormula;
        }
        // escaped formula's argument, e.g. {{function\|argument}}
        // used inside explicit table defintion
        if (code === codes.backslash) {
            effects.consume(code);
            return onInterpolationEscapedFormula;
        }
        return nok;
    }
    function onInterpolationEscapedFormula(code) {
        if (code === codes.verticalBar) {
            effects.consume(code);
            return onInterpolationFormula;
        }
        return nok;
    }
    function onInterpolationEnd(code) {
        if (code === codes.rightCurlyBrace) {
            effects.consume(code);
            markers -= 1;
            if (markers)
                return onInterpolationEnd;
            return ok;
        }
        return nok;
    }
}
//# sourceMappingURL=syntax.js.map