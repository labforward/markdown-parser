import { codes } from "micromark-util-symbol";
import type {
  Code,
  Effects,
  State,
  TokenizeContext,
} from "micromark-util-types";

const interpolationLinkConstruct = {
  name: "interpolationLink",
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
  const self = this;

  return start;

  function start(code: Code) {
    if (code === codes.leftSquareBracket) {
      effects.enter("interpolationLink");
      effects.enter("interpolationLinkLabel");
      effects.consume(code);

      return label;
    }

    return nok(code);
  }

  function label(code: Code) {
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

  function afterLabel(code: Code) {
    if (code === codes.leftParenthesis) {
      effects.enter("interpolationLinkDestination");
      effects.consume(code);

      return destination;
    }

    // no markdown link format
    return nok(code);
  }

  function destination(code: Code) {
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
