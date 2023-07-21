import type { CompileContext, Token } from "mdast-util-from-markdown";

export const enter = {
  bangInterpolation: onEnterBangInterpolation,
  interpolation: onEnterInterpolation,
};

export const exit = {
  bangInterpolation: onExit,
  interpolation: onExit,
};

function onEnterBangInterpolation(this: CompileContext, token: Token) {
  this.enter(
    {
      children: [],
      props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
      // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
      type: "banginterpolation",
    },
    token,
  );
}

function onEnterInterpolation(this: CompileContext, token: Token) {
  this.enter(
    {
      children: [],
      props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
      // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
      type: "interpolation",
    },
    token,
  );
}

function onExit(this: CompileContext, token: Token) {
  this.exit(token);
}
