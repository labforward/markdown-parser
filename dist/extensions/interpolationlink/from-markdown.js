export var enter = {
    interpolationlink: onEnterInterpolationLink,
    interpolationlinkDestination: onEnterInterpolationLinkDestination,
};
export var exit = {
    interpolationlink: onExitInterpolationLink,
};
function onEnterInterpolationLink(token) {
    this.enter({
        type: "interpolationlink",
        children: [],
        properties: {},
    }, token);
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
    console.log("HOTPINK onEnter", {
        matches: matches,
        raw: raw,
        token: token,
        stack: this.stack,
        link: link,
    });
    if (matches.length > 0) {
        link.properties = {
            formulas: matches.map(function (m) { return m[1]; }),
            location: raw.slice(1, -1),
        };
    }
}
function onExitInterpolationLink(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map