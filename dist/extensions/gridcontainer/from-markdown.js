export var enter = {
    gridContainer: onEnterGridContainer,
};
export var exit = {
    gridContainer: onExitGridContainer,
};
function onEnterGridContainer(token) {
    // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
    this.enter({ type: "gridcontainer", children: [] }, token);
}
function onExitGridContainer(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map