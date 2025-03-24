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
    interpolationLink: onEnterInterpolationLink,
    interpolationLinkTarget: onEnterInterpolationLinkTarget,
};
export var exit = {
    interpolationLink: onExitInterpolationLink,
    interpolationLinkLabel: onExitInterpolationLinkLabel,
};
function onEnterInterpolationLink(token) {
    this.enter({
        // @ts-ignore
        type: "interpolationlink",
        children: [],
        props: {},
    }, token);
}
function onExitInterpolationLinkLabel(token) {
    var label = this.sliceSerialize(token);
    var link = this.stack[this.stack.length - 1];
    // @ts-ignore
    link.props.label = label;
}
function onEnterInterpolationLinkTarget(token) {
    var link = this.stack[this.stack.length - 1];
    var raw = this.sliceSerialize(token);
    // const matches = [...raw.matchAll(/{{(.*?)}}/g)];
    var matches = [];
    var regex = /{{(.*?)}}/g;
    var match;
    // eslint-disable-next-line no-cond-assign
    while ((match = regex.exec(raw)) !== null) {
        matches.push(match);
    }
    if (matches.length > 0) {
        // @ts-ignore
        link.props = __assign(__assign({}, link.props), { formulas: matches.map(function (m) { return m[1]; }), location: raw });
    }
}
function onExitInterpolationLink(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map