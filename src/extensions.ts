/*
 * This file is deliberately written in CommonJS syntax so that it can be required directly from node.
 */
import * as grid from "./extensions/grid.js";
import * as gridcontainer from "./extensions/gridcontainer.js";
import * as interpolation from "./extensions/interpolation.js";

function extensions() {
  const data = this.data();

  const add = (field, value) => {
    if (data[field]) data[field].push(value);
    else data[field] = [value];
  };

  [grid, gridcontainer, interpolation].forEach((extension) => {
    add.call(data, "micromarkExtensions", extension.syntax);
    add.call(data, "fromMarkdownExtensions", extension.fromMarkdown);
  });
}

export default extensions;
