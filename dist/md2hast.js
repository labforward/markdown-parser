import { defaultSchema } from 'hast-util-sanitize';
import merge from 'lodash/merge.js';
import raw from 'rehype-raw';
import sanitize from 'rehype-sanitize';
import gfm from 'remark-gfm';
import md2mdast from 'remark-parse';
import mdast2hast from 'remark-rehype';
import extensions from './extensions.js';
const element = (tagName, properties, children = []) => ({
    children,
    properties,
    tagName,
    type: 'element',
});
const handlers = {
    grid: (state, node) => element('grid', node.props, state.all(node)),
    gridcontainer: (state, node) => element('gridcontainer', node.props, state.all(node)),
    banginterpolation: (_state, node) => element('banginterpolation', node.props),
    interpolation: (_state, node) => element('interpolation', node.props),
};
const flavouredSchema = merge({}, defaultSchema, {
    attributes: {
        grid: [
            'container',
            'card',
            'alignItems',
            'justifyContent',
            'xs',
            'sm',
            'md',
            'lg',
            'xl',
        ],
        banginterpolation: ['formula'],
        interpolation: ['formula'],
    },
});
flavouredSchema.tagNames = [
    ...(flavouredSchema.tagNames || []),
    'gridcontainer',
    'grid',
    'banginterpolation',
    'interpolation',
];
const md2hast = [
    md2mdast,
    gfm,
    extensions,
    [mdast2hast, { allowDangerousHtml: true, handlers }],
    raw,
    [sanitize, flavouredSchema],
];
export default md2hast;
//# sourceMappingURL=md2hast.js.map