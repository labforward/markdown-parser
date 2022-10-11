export const enter = {
  grid: onEnterGrid,
  gridProps: onEnterGridProps,
};
export const exit = {
  grid: onExitGrid,
};

function onEnterGrid(token) {
  this.enter({ type: "grid", children: [] }, token);
}

function onEnterGridProps(token) {
  const grid = this.stack[this.stack.length - 1];
  const raw = this.sliceSerialize(token);

  // parse grid props from plain string to props object
  // e.g. from "container card md={6}" to { container: 'container', card: 'card', md: 6 }
  const props = raw
    .trim()
    .split(/\s+/)
    .reduce((prev, next) => {
      let [key, value] = next.split("=");

      if (!value) {
        value = key;
      } else if (value.startsWith("{") && value.endsWith("}")) {
        value = value.slice(1, -1);
      }

      return { ...prev, [key]: value };
    }, {});

  grid.props = props;
}

function onExitGrid(token) {
  this.exit(token);
}
