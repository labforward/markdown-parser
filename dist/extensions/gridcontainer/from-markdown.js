export const enter = {
    gridContainer: onEnterGridContainer,
};
export const exit = {
    gridContainer: onExitGridContainer,
};
function onEnterGridContainer(token) {
    this.enter({ children: [], type: 'gridcontainer' }, token);
}
function onExitGridContainer(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map