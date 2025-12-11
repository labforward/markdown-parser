export const enter = {
    bangInterpolation: onEnterBangInterpolation,
    interpolation: onEnterInterpolation,
};
export const exit = {
    bangInterpolation: onExit,
    interpolation: onExit,
};
function onEnterBangInterpolation(token) {
    this.enter({
        children: [],
        props: { formula: this.sliceSerialize(token).replace(/\\\|/g, '|') },
        type: 'banginterpolation',
    }, token);
}
function onEnterInterpolation(token) {
    this.enter({
        children: [],
        props: { formula: this.sliceSerialize(token).replace(/\\\|/g, '|') },
        type: 'interpolation',
    }, token);
}
function onExit(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map