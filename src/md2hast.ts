import { all } from "mdast-util-to-hast";
import { defaultSchema } from "hast-util-sanitize";
import gfm from "remark-gfm";
import type { Handlers } from "mdast-util-to-hast";
import md2mdast from "remark-parse";
import mdast2hast from "remark-rehype";
import merge from "lodash/merge.js";
import type { Plugin, PluginTuple } from "unified";
import raw from "rehype-raw";
import sanitize from "rehype-sanitize";

import extensions from "./extensions.js";

const handlers: Handlers = {
  gridcontainer: (h, node) =>
    h(node, "gridcontainer", node.props, all(h, node)),
  grid: (h, node) => h(node, "grid", node.props, all(h, node)),
  banginterpolation: (h, node) => h(node, "banginterpolation", node.props),
  interpolation: (h, node) => h(node, "interpolation", node.props),
};

const flavouredSchema = merge({}, defaultSchema, {
  attributes: {
    grid: ["container", "card", "xs", "sm", "md", "lg", "xl"],
    banginterpolation: ["formula"],
    interpolation: ["formula"],
  },
});

flavouredSchema.tagNames = [
  ...(flavouredSchema.tagNames || []),
  "gridcontainer",
  "grid",
  "banginterpolation",
  "interpolation",
];

// FIXME: Typescript throws errors here when the type casting is not present, despite the matching types
const md2hast: Array<Plugin | PluginTuple> = [
  md2mdast as Plugin,
  gfm as Plugin,
  extensions,
  [mdast2hast as Plugin, { allowDangerousHtml: true, handlers }] as PluginTuple, // @option: allow raw html inside markdown
  raw as Plugin, // parse raw html into hast
  [sanitize, flavouredSchema] as PluginTuple,
];

export default md2hast;
