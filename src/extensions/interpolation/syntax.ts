import type { Code, Effects, State } from "micromark-util-types";
import { codes } from "micromark-util-symbol/codes";

const validCode = (code: Code) =>
  code && /[a-zA-Z0-9=\-_]/.test(String.fromCharCode(code));
const interpolationConstruct = {
  name: "interpolation",
  tokenize: tokenizeInterpolation,
};

export default {
  text: {
    [codes.exclamationMark]: interpolationConstruct,
    [codes.leftCurlyBrace]: interpolationConstruct,
  },
};

function tokenizeInterpolation(effects: Effects, ok: State, nok: State) {
  let type = "interpolation";
  let markers = 0;

  return onInterpolationStart;

  function onInterpolationStart(code: Code) {
    if (code === codes.exclamationMark) {
      if (type === "bangInterpolation") return nok;

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

  function onInterpolationFormula(code: Code) {
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

  function onInterpolationEscapedFormula(code: Code) {
    if (code === codes.verticalBar) {
      effects.consume(code);

      return onInterpolationFormula;
    }

    return nok;
  }

  function onInterpolationEnd(code: Code) {
    if (code === codes.rightCurlyBrace) {
      effects.consume(code);
      markers -= 1;

      if (markers) return onInterpolationEnd;

      return ok;
    }

    return nok;
  }
}
