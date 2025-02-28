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
    interpolationlink: function (state, node) {
        var properties = __assign(__assign({}, node.properties), { formulas: Array.isArray(node.properties.formulas)
                ? node.properties.formulas
                : node.properties.formulas.split(" ") });
        return element("interpolationlink", properties, state.all(node));
    },
};
var flavouredSchema = merge({}, defaultSchema, {
    attributes: {
        grid: [
            "container",
            "card",
            "alignItems",
            "justifyContent",
            "xs",
            "sm",
            "md",
            "lg",
            "xl",
        ],
        banginterpolation: ["formula"],
        interpolation: ["formula"],
        interpolationlink: ["label", "location", "formulas"],
    },
});
flavouredSchema.tagNames = __spreadArray(__spreadArray([], (flavouredSchema.tagNames || []), true), [
    "gridcontainer",
    "grid",
    "banginterpolation",
    "interpolation",
    "interpolationlink",
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