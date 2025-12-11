import { unified } from 'unified';

import { md2hast, preprocessor } from './index.js';

const parse = (raw: string) => {
  const parser = unified().use(md2hast);

  return parser.runSync(parser.parse(preprocessor(raw)));
};

describe('Markdown', () => {
  it('supports basic markdown', () => {
    expect(
      parse(`# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
####### Not a Heading

Some *emphasis*, **importance**, and \`code\`.

---

\`\`\`javascript
console.log('!');
\`\`\`

* foo
* bar
* baz
  `),
    ).toMatchSnapshot();
  });
});
