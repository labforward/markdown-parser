/*
  Wrap grids in a Grid Container. Content without indentation or two new
  line characters indicate the end of a row.

  ```
  %col
    First row, first column
  %col
    First row, second column

  %col
    Second row, first column
  %col
    Second row, second column
  ```
*/
export { default as syntax } from "./gridcontainer/syntax.js";
export * as fromMarkdown from "./gridcontainer/from-markdown.js";
//# sourceMappingURL=gridcontainer.js.map