# Laboperator Markdown Parser

This repo contains the code for the extended markdown parser based on [remark](https://github.com/remarkjs/remark), [rehype](https://github.com/rehypejs/rehype) and [micromark](https://github.com/micromark/micromark/tree/main) in [unified.js](https://unifiedjs.com/) ecosystem.

Main features:

- HAST output from a raw string
- Extends [GFM](https://github.github.com/gfm/)
- Allows for raw HTML within markdown (sanitized)
- Custom extensions like grid, grid containers and variable interpolation

## Testing

The code is checked for correctness of the parser (by comparison to a snapshot) as well as for compatibility of built code with pure Node.js (some of the dependencies are ESM-pure and don't work with CommonJS)

## Further extending the parser

Start with [this section](https://github.com/micromark/micromark/tree/main#extending-markdown) of the micromark repo. Every plugin should contain both the `syntax.ts` file, which tells the crawler how to recognize the syntax of the extension, as well as the `from-markdown.ts` file which contains instructions on how to pass the extracted info to the AST. Both need to be exported and added to the `src/extensions.ts` file.

The test snapshot will need to be updated with a working example to ensure the correctness of the parser extension
