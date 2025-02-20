import type { CompileContext, Token } from "mdast-util-from-markdown";
export declare const enter: {
    interpolationlink: typeof onEnterInterpolationLink;
    interpolationlinkDestination: typeof onEnterInterpolationLinkDestination;
};
export declare const exit: {
    interpolationlink: typeof onExitInterpolationLink;
};
declare function onEnterInterpolationLink(this: CompileContext, token: Token): void;
declare function onEnterInterpolationLinkDestination(this: CompileContext, token: Token): void;
declare function onExitInterpolationLink(this: CompileContext, token: Token): void;
export {};
