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
      // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
      type: "banginterpolation",
      props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
      children: [],
    },
    token
  );
}

function onEnterInterpolation(this: CompileContext, token: Token) {
  this.enter(
    {
      // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
      type: "interpolation",
      props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
      children: [],
    },
    token
  );
}

function onExit(this: CompileContext, token: Token) {
  this.exit(token);
}
