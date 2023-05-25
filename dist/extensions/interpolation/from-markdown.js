export var enter = {
    bangInterpolation: onEnterBangInterpolation,
    interpolation: onEnterInterpolation,
};
export var exit = {
    bangInterpolation: onExit,
    interpolation: onExit,
};
function onEnterBangInterpolation(token) {
    this.enter({
        children: [],
        props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
        // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
        type: "banginterpolation",
    }, token);
}
function onEnterInterpolation(token) {
    this.enter({
        children: [],
        props: { formula: this.sliceSerialize(token).replace(/\\\|/g, "|") },
        // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
        type: "interpolation",
    }, token);
}
function onExit(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map