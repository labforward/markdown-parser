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

  // We add a dummy event here in order to be able to consume codes
  effects.enter("interpolationTemp");

  return onInterpolationStart;

  function onInterpolationStart(code: Code) {
    if (code === codes.exclamationMark) {
      if (type === "bangInterpolation") return nok(code);

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
        effects.exit("interpolationTemp");
        effects.enter(type);

        return onInterpolationFormula;
      }

      return onInterpolationStart;
    }

    // return nok(code) instead of nok to ensure the wrong
    // character is also consumed
    return nok(code);
  }

  function onInterpolationFormula(code: Code) {
    if (code === codes.rightCurlyBrace) {
      // When we encounter '}', exit interpolation,
      // enter the dummy event to consume the character
      effects.exit(type);
      effects.enter("interpolationTemp");
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

  function onInterpolationEscapedFormula(code: Code) {
    if (code === codes.verticalBar) {
      effects.consume(code);

      return onInterpolationFormula;
    }

    return nok(code);
  }

  function onInterpolationEnd(code: Code) {
    // if the final code is '}', interpolation is complete,
    // if it is anything else, we abort with nok
    if (code === codes.rightCurlyBrace) {
      effects.consume(code);
      effects.exit("interpolationTemp");

      return ok;
    }

    return nok(code);
  }
}
