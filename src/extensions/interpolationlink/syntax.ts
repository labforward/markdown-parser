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

const isEndOfLine = (code: Code) => {
  return (
    code === codes.eof ||
    code === codes.lineFeed ||
    code === codes.carriageReturn ||
    code === codes.carriageReturnLineFeed
  );
};

// const startMarker = 0;
// const endMarker = 0;

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
  // const markers = 0;

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

    if (isEndOfLine(code)) {
      return nok(code);
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
      // empty parenthesis, no target location
      if (self.previous === codes.leftParenthesis) {
        return nok(code);
      }

      // if (startMarker < 2 || endMarker < 2) {
      //   return nok(code);
      // }
      effects.consume(code);
      effects.exit("interpolationlinkDestination");
      effects.exit("interpolationlink");
      return ok;
    }

    if (isEndOfLine(code) || code === codes.virtualSpace) {
      return nok(code);
    }

    effects.consume(code);

    return destination;
  }
}
