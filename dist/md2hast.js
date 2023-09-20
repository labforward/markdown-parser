var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { defaultSchema } from "hast-util-sanitize";
import merge from "lodash/merge.js";
import raw from "rehype-raw";
import sanitize from "rehype-sanitize";
import gfm from "remark-gfm";
import md2mdast from "remark-parse";
import mdast2hast from "remark-rehype";
import extensions from "./extensions.js";
var element = function (tagName, properties, children) {
    if (children === void 0) { children = []; }
    return ({
        children: children,
        properties: properties,
        tagName: tagName,
        type: "element",
    });
};
var handlers = {
    grid: function (state, node) { return element("grid", node.props, state.all(node)); },
    gridcontainer: function (state, node) {
        return element("gridcontainer", node.props, state.all(node));
    },
    banginterpolation: function (_state, node) { return element("banginterpolation", node.props); },
    interpolation: function (_state, node) { return element("interpolation", node.props); },
};
var flavouredSchema = merge({}, defaultSchema, {
    attributes: {
        grid: ["container", "card", "xs", "sm", "md", "lg", "xl"],
        banginterpolation: ["formula"],
        interpolation: ["formula"],
    },
});
flavouredSchema.tagNames = __spreadArray(__spreadArray([], (flavouredSchema.tagNames || []), true), [
    "gridcontainer",
    "grid",
    "banginterpolation",
    "interpolation",
], false);
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