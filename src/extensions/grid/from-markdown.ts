import type { CompileContext, Token } from "mdast-util-from-markdown";

export const enter = {
  grid: onEnterGrid,
  gridProps: onEnterGridProps,
};
export const exit = {
  grid: onExitGrid,
};

function onEnterGrid(this: CompileContext, token: Token) {
  // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
  this.enter({ children: [], type: "grid" }, token);
}

function onEnterGridProps(this: CompileContext, token: Token) {
  const grid = this.stack[this.stack.length - 1];
  const raw = this.sliceSerialize(token);

  // parse grid props from plain string to props object
  // e.g. from "container card md={6}" to { container: 'container', card: 'card', md: 6 }
  const props = raw
    .trim()
    .split(/\s+/)
    .reduce((prev, next) => {
      let [key, value] = next.split("=");

      if (!value) {
        value = key;
      } else if (value.startsWith("{") && value.endsWith("}")) {
        value = value.slice(1, -1);
      }

      return { ...prev, [key]: value };
    }, {});

  // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
  grid.props = props;
}

function onExitGrid(this: CompileContext, token: Token) {
  this.exit(token);
}
