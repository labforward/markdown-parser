import { all } from "mdast-util-to-hast";
import { defaultSchema } from "hast-util-sanitize";
import gfm from "remark-gfm";
import md2mdast from "remark-parse";
import mdast2hast from "remark-rehype";
import merge from "lodash/merge.js";
import raw from "rehype-raw";
import sanitize from "rehype-sanitize";
import extensions from "./extensions.js";
var handlers = {
    gridcontainer: function (h, node) {
        return h(node, "gridcontainer", node.props, all(h, node));
    },
    grid: function (h, node) { return h(node, "grid", node.props, all(h, node)); },
    banginterpolation: function (h, node) { return h(node, "banginterpolation", node.props); },
    interpolation: function (h, node) { return h(node, "interpolation", node.props); },
};
var flavouredSchema = merge({}, defaultSchema, {
    tagNames: ["gridcontainer", "grid", "banginterpolation", "interpolation"],
    attributes: {
        grid: ["container", "card", "xs", "sm", "md", "lg", "xl"],
        banginterpolation: ["formula"],
        interpolation: ["formula"],
    },
});
// FIXME: Typescript throws errors here when the type casting is not present, despite the matching types
var md2hast = [
    md2mdast,
    gfm,
    extensions,
    [mdast2hast, { allowDangerousHtml: true, handlers: handlers }],
    raw,
    [sanitize, flavouredSchema],
];
export default md2hast;
//# sourceMappingURL=md2hast.js.map