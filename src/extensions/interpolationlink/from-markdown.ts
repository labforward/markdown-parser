import type { CompileContext, Token } from "mdast-util-from-markdown";

export const enter = {
  interpolationlink: onEnterInterpolationLink,
  interpolationlinkDestination: onEnterInterpolationLinkDestination,
};

export const exit = {
  interpolationlink: onExitInterpolationLink,
};

function onEnterInterpolationLink(this: CompileContext, token: Token) {
  this.enter(
    {
      type: "interpolationlink",
      children: [],
      properties: {},
      // props: {
      //   hotpink: true,
      //   formuala: this.sliceSerialize(token),
      //   href: "foo",
      // },
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
    link.properties = {
      href: raw.replace(match[0], ""),
      formula: match[1],
    };
  } else {
    link.properties = { href: raw };
  }
}

function onExitInterpolationLink(this: CompileContext, token: Token) {
  this.exit(token);
}
