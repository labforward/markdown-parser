import * as grid from "./extensions/grid.js";
import * as gridcontainer from "./extensions/gridcontainer.js";
import * as interpolation from "./extensions/interpolation.js";
function extensions() {
    var data = this.data();
    var add = function (field, value) {
        if (data[field])
            data[field].push(value);
        else
            data[field] = [value];
    };
    [grid, gridcontainer, interpolation].forEach(function (extension) {
        add.call(data, "micromarkExtensions", extension.syntax);
        add.call(data, "fromMarkdownExtensions", extension.fromMarkdown);
    });
}
export default extensions;
//# sourceMappingURL=extensions.js.map