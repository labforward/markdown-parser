import * as grid from './extensions/grid.js';
import * as gridcontainer from './extensions/gridcontainer.js';
import * as interpolation from './extensions/interpolation.js';
function extensions() {
    const data = this.data();
    const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    [grid, gridcontainer, interpolation].forEach((extension) => {
        micromarkExtensions.push(extension.syntax);
        fromMarkdownExtensions.push(extension.fromMarkdown);
    });
}
export default extensions;
//# sourceMappingURL=extensions.js.map