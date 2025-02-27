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
        // props: {
        //   hotpink: true,
        //   formuala: this.sliceSerialize(token),
        //   href: "foo",
        // },
    }, token);
}
function onEnterInterpolationLinkDestination(token) {
    var link = this.stack[this.stack.length - 1];
    var raw = this.sliceSerialize(token);
    var match = raw.match(/{{(.*?)}}/);
    if (match) {
        link.properties = {
            href: raw.replace(match[0], ""),
            formula: match[1],
        };
    }
    else {
        link.properties = { href: raw };
    }
}
function onExitInterpolationLink(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map