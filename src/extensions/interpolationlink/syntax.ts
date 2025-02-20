import { codes } from "micromark-util-symbol";
import type {
  Code,
  Effects,
  State,
  TokenizeContext,
} from "micromark-util-types";

const interpolationLinkConstruct = {
  name: "interpolationlink",
  tokenize: tokenizeInterpolationLink,
};

export default {
  text: {
    [codes.leftSquareBracket]: interpolationLinkConstruct,
  },
};

function tokenizeInterpolationLink(
  this: TokenizeContext,
  effects: Effects,
  ok: State,
  nok: State
) {
  // const self = this;
  // const markers = 0;

  console.log("HOTPINK tokenizeInterpolationLink", {
    effects,
    nok,
    ok,
    this: this,
  });

  return start;

  function start(code: Code) {
    if (code === codes.leftSquareBracket) {
      effects.enter("interpolationlink");
      effects.enter("interpolationlinkLabel");
      effects.consume(code);
      return label;
    }

    return nok(code);
  }

  function label(code: Code) {
    if (code === codes.rightSquareBracket) {
      effects.consume(code);
      effects.exit("interpolationlinkLabel");
      return afterLabel;
    }

    effects.consume(code);

    return label;
  }

  function afterLabel(code: Code) {
    if (code === codes.leftParenthesis) {
      effects.enter("interpolationlinkDestination");
      effects.consume(code);
      return destination;
    }

    return nok(code);
  }

  function destination(code: Code) {
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
