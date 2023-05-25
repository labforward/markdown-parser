import type { Processor } from "unified";

import * as grid from "./extensions/grid.js";
import * as gridcontainer from "./extensions/gridcontainer.js";
import * as interpolation from "./extensions/interpolation.js";
import type { FromMarkdown, Syntax } from "./extensions/types/extensions.js";

function extensions(this: Processor) {
  const data = this.data();

  const add = (field: string, value: Syntax | FromMarkdown) => {
    if (data[field]) (data[field] as Array<Syntax | FromMarkdown>).push(value);
    else data[field] = [value];
  };

  [grid, gridcontainer, interpolation].forEach((extension) => {
    add.call(data, "micromarkExtensions", extension.syntax);
    add.call(data, "fromMarkdownExtensions", extension.fromMarkdown);
  });
}

export default extensions;
