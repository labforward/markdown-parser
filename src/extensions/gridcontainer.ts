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
export * as fromMarkdown from './gridcontainer/from-markdown.js';
export { default as syntax } from './gridcontainer/syntax.js';
