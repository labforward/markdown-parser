export const enter = {
  gridContainer: onEnterGridContainer,
};
export const exit = {
  gridContainer: onExitGridContainer,
};

function onEnterGridContainer(token) {
  this.enter({ type: "gridcontainer", children: [] }, token);
}

function onExitGridContainer(token) {
  this.exit(token);
}
