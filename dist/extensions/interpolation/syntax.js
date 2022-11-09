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
    // We add a dummy event here in order to be able to consume codes
    effects.enter("void");
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
            // this if statement needs to appear here, because we shouldn't
            // return the callback without consuming the character
            if (markers === 2) {
                // Exit the dummy event, enter proper interpolation
                effects.exit("void");
                effects.enter(type);
                return onInterpolationFormula;
            }
            return onInterpolationStart;
        }
        // return nok(code) instead of nok to ensure the wrong
        // character is also consumed
        return nok(code);
    }
    function onInterpolationFormula(code) {
        if (code === codes.rightCurlyBrace) {
            // When we encounter '}', exit interpolation,
            // enter the dummy event to consume the character
            effects.exit(type);
            effects.enter("void");
            effects.consume(code);
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
        return nok(code);
    }
    function onInterpolationEscapedFormula(code) {
        if (code === codes.verticalBar) {
            effects.consume(code);
            return onInterpolationFormula;
        }
        return nok(code);
    }
    function onInterpolationEnd(code) {
        // if the final code is '}', interpolation is complete,
        // if it is anything else, we abort with nok
        if (code === codes.rightCurlyBrace) {
            effects.consume(code);
            effects.exit("void");
            return ok;
        }
        return nok(code);
    }
}
//# sourceMappingURL=syntax.js.map