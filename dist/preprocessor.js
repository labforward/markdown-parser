// disallow lazy lines in grid definition
//
//   ref: https://github.com/syntax-tree/mdast-util-from-markdown/issues/22
//
var disableLazyGrid = function (raw) {
    var stack = [];
    var initialLines = [];
    var afterBlank = false;
    return raw
        .split(/(?:\r\n|\n|\r)/)
        .reduce(function (lines, next) {
        if (next.match(/^\s*$/)) {
            afterBlank = true;
            lines.push(next);
        }
        else {
            var col = next.match(/^(\s*)%col(?:\s|$)/);
            var inside = next.match("^\\s{".concat(stack[stack.length - 1] || 0, ",}"));
            if (col) {
                while ((stack[stack.length - 1] || 0) >= col[1].length + 1) {
                    stack.pop();
                }
                stack.push(col[1].length + 1);
                lines.push(next);
            }
            else if (inside) {
                lines.push(next);
            }
            else {
                stack.pop();
                if (!afterBlank)
                    lines.push("");
                lines.push(next);
            }
            afterBlank = false;
        }
        return lines;
    }, initialLines)
        .join("\n");
};
var preprocessor = function (raw) {
    return disableLazyGrid(raw)
        // self-closing html like <br/> somehow makes every lines which follows afterward
        // be considered part of the html
        .replace(/<([a-z0-9]*)([^/]*)\/>/g, "<$1$2></$1>")
        // escape hatch to support {{interpolation|argument}} in table
        // by escaping it to {{interpolation\|argument}}
        .replace(/(\|\s*{{)((?:[a-zA-Z0-9=\-_]+)(?:\|[a-zA-Z0-9=\-_]+)+)(?=}}\s*\|)/g, function (_, prefix, formula) { return "".concat(prefix).concat(formula.split("|").join("\\|")); });
};
export default preprocessor;
//# sourceMappingURL=preprocessor.js.map