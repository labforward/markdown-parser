import type { CompileContext, Token } from 'mdast-util-from-markdown';
export declare const enter: {
    gridContainer: typeof onEnterGridContainer;
};
export declare const exit: {
    gridContainer: typeof onExitGridContainer;
};
declare function onEnterGridContainer(this: CompileContext, token: Token): void;
declare function onExitGridContainer(this: CompileContext, token: Token): void;
export {};
