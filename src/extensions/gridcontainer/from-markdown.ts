import type { CompileContext, Token } from 'mdast-util-from-markdown';

export const enter = {
  gridContainer: onEnterGridContainer,
};
export const exit = {
  gridContainer: onExitGridContainer,
};

function onEnterGridContainer(this: CompileContext, token: Token) {
  // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
  this.enter({ children: [], type: 'gridcontainer' }, token);
}

function onExitGridContainer(this: CompileContext, token: Token) {
  this.exit(token);
}
