import type { CompileContext, Token } from "mdast-util-from-markdown";
export declare const enter: {
    interpolationLink: typeof onEnterInterpolationLink;
    interpolationLinkTarget: typeof onEnterInterpolationLinkTarget;
};
export declare const exit: {
    interpolationLink: typeof onExitInterpolationLink;
    interpolationLinkFormula: typeof onExitInterpolationLinkFormula;
    interpolationLinkLabel: typeof onExitInterpolationLinkLabel;
};
declare function onEnterInterpolationLink(this: CompileContext, token: Token): void;
declare function onExitInterpolationLinkLabel(this: CompileContext, token: Token): void;
declare function onExitInterpolationLinkFormula(this: CompileContext, token: Token): void;
declare function onEnterInterpolationLinkTarget(this: CompileContext, token: Token): void;
declare function onExitInterpolationLink(this: CompileContext, token: Token): void;
export {};
