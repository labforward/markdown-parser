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
    interpolationlink: onEnterInterpolationLink,
    interpolationlinkDestination: onEnterInterpolationLinkDestination,
};
export var exit = {
    interpolationlink: onExitInterpolationLink,
    interpolationlinkLabel: onExitInterpolationLinkLabel,
};
function onEnterInterpolationLink(token) {
    this.enter({
        type: "interpolationlink",
        children: [],
        properties: {},
    }, token);
}
function onExitInterpolationLinkLabel(token) {
    var label = this.sliceSerialize(token);
    var link = this.stack[this.stack.length - 1];
    link.properties.label = label;
}
function onEnterInterpolationLinkDestination(token) {
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
        link.properties = __assign(__assign({}, link.properties), { formulas: matches.map(function (m) { return m[1]; }), location: raw });
    }
}
function onExitInterpolationLink(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map