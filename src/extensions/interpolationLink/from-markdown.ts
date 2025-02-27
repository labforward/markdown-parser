import type { CompileContext, Token } from "mdast-util-from-markdown";

export const enter = {
  interpolationLink: onEnterInterpolationLink,
  interpolationLinkDestination: onEnterInterpolationLinkDestination,
};

export const exit = {
  interpolationLink: onExitInterpolationLink,
};

function onEnterInterpolationLink(this: CompileContext, token: Token) {
  this.enter(
    {
      children: [],
      properties: {},
      props: {
        hotpink: true,
        serialized: this.sliceSerialize(token),
      },
      // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
      type: "interpolationLink",
    },
    token
  );
}

function onEnterInterpolationLinkDestination(
  this: CompileContext,
  token: Token
) {
  const link = this.stack[this.stack.length - 1];
  const raw = this.sliceSerialize(token);
  const match = raw.match(/{{(.*?)}}/);

  if (match) {
    // @ts-ignore
    link.properties = {
      formula: match[1],
      href: raw.replace(match[0], ""),
    };
  } else {
    // @ts-ignore
    link.properties = { href: raw };
  }
}

function onExitInterpolationLink(this: CompileContext, token: Token) {
  this.exit(token);
}
