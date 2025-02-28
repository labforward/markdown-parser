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
  // const matches = [...raw.matchAll(/{{(.*?)}}/g)];

  const matches = [];
  const regex = /{{(.*?)}}/g;
  let match;

  // eslint-disable-next-line no-cond-assign
  while ((match = regex.exec(raw)) !== null) {
    matches.push(match);
  }

  console.log("HOTPINK onEnter", {
    matches,
    raw,
    token,
    stack: this.stack,
    link,
  });

  if (matches.length > 0) {
    link.properties = {
      formulas: matches.map((m) => m[1]),
      location: raw.slice(1, -1),
    };
  }
}

function onExitInterpolationLink(this: CompileContext, token: Token) {
  this.exit(token);
}
