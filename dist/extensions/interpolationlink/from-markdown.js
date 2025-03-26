var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
export var enter = {
    interpolationLink: onEnterInterpolationLink,
    interpolationLinkTarget: onEnterInterpolationLinkTarget,
};
export var exit = {
    interpolationLink: onExitInterpolationLink,
    interpolationLinkFormula: onExitInterpolationLinkFormula,
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
    var link = this.stack[this.stack.length - 1];
    var label = this.sliceSerialize(token);
    // @ts-ignore
    link.props.label = label;
}
function onExitInterpolationLinkFormula(token) {
    var link = this.stack[this.stack.length - 1];
    var formula = this.sliceSerialize(token);
    // @ts-ignore
    link.props.formula = __spreadArray(__spreadArray([], (link.props.formula || []), true), [formula], false);
}
function onEnterInterpolationLinkTarget(token) {
    var link = this.stack[this.stack.length - 1];
    var raw = this.sliceSerialize(token);
    // const matches = [...raw.matchAll(/{{(.*?)}}/g)];
    // @ts-ignore
    link.props.location = raw;
    // const matches = [];
    // const regex = /{{(.*?)}}/g;
    // let match;
    // // eslint-disable-next-line no-cond-assign
    // while ((match = regex.exec(raw)) !== null) {
    //   matches.push(match);
    // }
    // if (matches.length > 0) {
    //   // @ts-ignore
    //   link.props = {
    //     // @ts-ignore
    //     ...link.props,
    //     formulas: matches.map((m) => m[1]),
    //     location: raw,
    //   };
    // }
}
function onExitInterpolationLink(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map