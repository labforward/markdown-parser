import type { CompileContext, Token } from "mdast-util-from-markdown";
export declare const enter: {
    grid: typeof onEnterGrid;
    gridProps: typeof onEnterGridProps;
};
export declare const exit: {
    grid: typeof onExitGrid;
};
declare function onEnterGrid(this: CompileContext, token: Token): void;
declare function onEnterGridProps(this: CompileContext, token: Token): void;
declare function onExitGrid(this: CompileContext, token: Token): void;
export {};
