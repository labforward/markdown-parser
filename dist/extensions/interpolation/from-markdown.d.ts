import type { CompileContext, Token } from 'mdast-util-from-markdown';
export declare const enter: {
    bangInterpolation: typeof onEnterBangInterpolation;
    interpolation: typeof onEnterInterpolation;
};
export declare const exit: {
    bangInterpolation: typeof onExit;
    interpolation: typeof onExit;
};
declare function onEnterBangInterpolation(this: CompileContext, token: Token): void;
declare function onEnterInterpolation(this: CompileContext, token: Token): void;
declare function onExit(this: CompileContext, token: Token): void;
export {};
