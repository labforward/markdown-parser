import * as grid from "./extensions/grid.js";
import * as gridcontainer from "./extensions/gridcontainer.js";
import * as interpolation from "./extensions/interpolation.js";
import * as interpolationlink from "./extensions/interpolationlink.js";
function extensions() {
    var data = this.data();
    var micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    var fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    [grid, gridcontainer, interpolation, interpolationlink].forEach(function (extension) {
        micromarkExtensions.push(extension.syntax);
        fromMarkdownExtensions.push(extension.fromMarkdown);
    });
}
export default extensions;
//# sourceMappingURL=extensions.js.map