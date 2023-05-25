/*
  Replace %col blocks with Grid columns positioned in one row.

  Content placed under `%col` tag and indented with two spaces will be converted into a column.

  Adding a `card` tag will add a MUI Paper background and elevation to columns.

  We can define the number of cols the component is going to use by adding a tag for breakpoints
  and a corresponding number value.

  ```
  %col xs={12} md={6}
    First column
  %col card
    Second column
  %col
    Third column
  ```
*/
export * as fromMarkdown from "./grid/from-markdown.js";
export { default as syntax } from "./grid/syntax.js";
//# sourceMappingURL=grid.js.map