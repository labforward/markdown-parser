import { codes } from 'micromark-util-symbol';
const validCode = (code) => code && /[a-zA-Z0-9=\-_]/.test(String.fromCharCode(code));
const interpolationConstruct = {
    name: 'interpolation',
    tokenize: tokenizeInterpolation,
};
export default {
    text: {
        [codes.exclamationMark]: interpolationConstruct,
        [codes.leftCurlyBrace]: interpolationConstruct,
    },
};
function tokenizeInterpolation(effects, ok, nok) {
    let type = 'interpolation';
    let markers = 0;
    const self = this;
    effects.enter('interpolationTemp');
    return onInterpolationStart;
    function onInterpolationStart(code) {
        if (code === codes.exclamationMark) {
            if (type === 'bangInterpolation')
                return nok(code);
            type = 'bangInterpolation';
            effects.consume(code);
            return onInterpolationStart;
        }
        if (code === codes.leftCurlyBrace) {
            effects.consume(code);
            markers += 1;
            if (markers === 2) {
                effects.exit('interpolationTemp');
                effects.enter(type);
                return onInterpolationFormula;
            }
            return onInterpolationStart;
        }
        return nok(code);
    }
    function onInterpolationFormula(code) {
        if (code === codes.rightCurlyBrace) {
            if (self.previous === codes.leftCurlyBrace) {
                return nok(code);
            }
            effects.exit(type);
            effects.enter('interpolationTemp');
            effects.consume(code);
            return onInterpolationEnd;
        }
        if (validCode(code) || code === codes.verticalBar) {
            effects.consume(code);
            return onInterpolationFormula;
        }
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
        if (code === codes.rightCurlyBrace) {
            effects.consume(code);
            effects.exit('interpolationTemp');
            return ok;
        }
        return nok(code);
    }
}
//# sourceMappingURL=syntax.js.map