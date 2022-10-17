var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var enter = {
    grid: onEnterGrid,
    gridProps: onEnterGridProps,
};
export var exit = {
    grid: onExitGrid,
};
function onEnterGrid(token) {
    // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
    this.enter({ type: "grid", children: [] }, token);
}
function onEnterGridProps(token) {
    var grid = this.stack[this.stack.length - 1];
    var raw = this.sliceSerialize(token);
    // parse grid props from plain string to props object
    // e.g. from "container card md={6}" to { container: 'container', card: 'card', md: 6 }
    var props = raw
        .trim()
        .split(/\s+/)
        .reduce(function (prev, next) {
        var _a;
        var _b = next.split("="), key = _b[0], value = _b[1];
        if (!value) {
            value = key;
        }
        else if (value.startsWith("{") && value.endsWith("}")) {
            value = value.slice(1, -1);
        }
        return __assign(__assign({}, prev), (_a = {}, _a[key] = value, _a));
    }, {});
    // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
    grid.props = props;
}
function onExitGrid(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map