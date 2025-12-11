export const enter = {
    grid: onEnterGrid,
    gridProps: onEnterGridProps,
};
export const exit = {
    grid: onExitGrid,
};
function onEnterGrid(token) {
    this.enter({ children: [], type: 'grid' }, token);
}
function onEnterGridProps(token) {
    const grid = this.stack[this.stack.length - 1];
    const raw = this.sliceSerialize(token);
    const props = raw
        .trim()
        .split(/\s+/)
        .reduce((prev, next) => {
        let [key, value] = next.split('=');
        if (!value) {
            value = key;
        }
        else if (value.startsWith('{') && value.endsWith('}')) {
            value = value.slice(1, -1);
        }
        return { ...prev, [key]: value };
    }, {});
    grid.props = props;
}
function onExitGrid(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map