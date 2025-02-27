export var enter = {
    interpolationLink: onEnterInterpolationLink,
    interpolationLinkDestination: onEnterInterpolationLinkDestination,
};
export var exit = {
    interpolationLink: onExitInterpolationLink,
};
function onEnterInterpolationLink(token) {
    this.enter({
        children: [],
        properties: {},
        props: {
            hotpink: true,
            serialized: this.sliceSerialize(token),
        },
        // @ts-ignore TypeScript has an issue with extending existing types from mdast-util-from-markdown, even though it's permissible within the library
        type: "interpolationLink",
    }, token);
}
function onEnterInterpolationLinkDestination(token) {
    var link = this.stack[this.stack.length - 1];
    var raw = this.sliceSerialize(token);
    var match = raw.match(/{{(.*?)}}/);
    if (match) {
        // @ts-ignore
        link.properties = {
            formula: match[1],
            href: raw.replace(match[0], ""),
        };
    }
    else {
        // @ts-ignore
        link.properties = { href: raw };
    }
}
function onExitInterpolationLink(token) {
    this.exit(token);
}
//# sourceMappingURL=from-markdown.js.map