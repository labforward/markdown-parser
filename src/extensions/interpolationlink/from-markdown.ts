import type { CompileContext, Token } from "mdast-util-from-markdown";

export const enter = {
  interpolationLink: onEnterInterpolationLink,
  interpolationLinkTarget: onEnterInterpolationLinkTarget,
};

export const exit = {
  interpolationLink: onExitInterpolationLink,
  interpolationLinkLabel: onExitInterpolationLinkLabel,
};

function onEnterInterpolationLink(this: CompileContext, token: Token) {
  this.enter(
    {
      // @ts-ignore
      type: "interpolationlink",
      children: [],
      props: {},
    },
    token
  );
}

function onExitInterpolationLinkLabel(this: CompileContext, token: Token) {
  const label = this.sliceSerialize(token);
  const link = this.stack[this.stack.length - 1];

  // @ts-ignore
  link.props.label = label;
}

function onEnterInterpolationLinkTarget(this: CompileContext, token: Token) {
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

  if (matches.length > 0) {
    // @ts-ignore
    link.props = {
      // @ts-ignore
      ...link.props,
      formulas: matches.map((m) => m[1]),
      location: raw,
    };
  }
}

function onExitInterpolationLink(this: CompileContext, token: Token) {
  this.exit(token);
}
