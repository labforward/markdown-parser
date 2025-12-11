const disableLazyGrid = (raw) => {
    const stack = [];
    const initialLines = [];
    let afterBlank = false;
    return raw
        .split(/(?:\r\n|\n|\r)/)
        .reduce((lines, next) => {
        if (next.match(/^\s*$/)) {
            afterBlank = true;
            lines.push(next);
        }
        else {
            const col = next.match(/^(\s*)%col(?:\s|$)/);
            const inside = next.match(`^\\s{${stack[stack.length - 1] || 0},}`);
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
                    lines.push('');
                lines.push(next);
            }
            afterBlank = false;
        }
        return lines;
    }, initialLines)
        .join('\n');
};
const preprocessor = (raw) => disableLazyGrid(raw)
    .replace(/<([a-z0-9]*)([^/]*)\/>/g, '<$1$2></$1>')
    .replace(/(\|\s*{{)((?:[a-zA-Z0-9=\-_]+)(?:\|[a-zA-Z0-9=\-_]+)+)(?=}}\s*\|)/g, (_, prefix, formula) => `${prefix}${formula.split('|').join('\\|')}`);
export default preprocessor;
//# sourceMappingURL=preprocessor.js.map