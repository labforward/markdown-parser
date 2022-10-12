import { unified } from "unified";

import { md2hast, preprocessor } from "./index.js";

const parse = (raw: string) => {
  const parser = unified().use(md2hast);

  return parser.runSync(parser.parse(preprocessor(raw)));
};

describe("Markdown extensions", () => {
  describe("for grid", () => {
    it("add support for parsing custom grid syntax", () => {
      expect(
        parse(`Before grid

% this is normal text

%col container xs={2}
  %col
    left
  %col
    **middle**
%col
  right

%col
  2nd row

After grid
  `)
      ).toMatchSnapshot();
    });

    it("is able to parse grid without any leading or trailing characters", () => {
      expect(
        parse(`%col
  left
%col
  right
%col`)
      ).toMatchSnapshot();
    });

    it("is able to parse partially defined grid", () => {
      expect(
        parse(`%col
%col`)
      ).toMatchSnapshot();

      expect(
        parse(
          `###### Syntax examples:
%col
  \`\`\`yml
  code block
  \`\`\`
%col`
        )
      ).toMatchSnapshot();
    });

    it("is able to parse deeply nested grid", () => {
      expect(
        parse(`
%col
  %col
    %col
      content
`)
      ).toMatchSnapshot();
    });

    it("preserve spaces inside code block", () => {
      expect(
        parse(`%col
  \`\`\`yml
  - label: print
    key: print-button
    color: secondary
    variant: contained
  \`\`\`
  `)
      ).toMatchSnapshot();

      expect(
        parse(`%col container
  %col
    \`\`\`yml
    changeReason:
      message: Please enter a reason.
      validation: ^\\w.+\\s.+
      options:
        - Reason option A
        - Reason option B
    \`\`\`

  %col
    !{{stringField}}`)
      ).toMatchSnapshot();
    });
  });

  describe("for interpolation", () => {
    it("add support for interpolation syntax", () => {
      expect(
        parse(`Interpolation can stand alone like the following

{{function}}

be parameterized

{{function|argument}}

and appear {{inline|with=argument}} like this
`)
      ).toMatchSnapshot();
    });

    it("add support for bang! interpolation syntax", () => {
      expect(
        parse(`Bang! Interpolation can stand alone like the following

!{{function}}

be parameterized

!{{function|arg-one|arg-two}}

and appear !{{inline|with=argument}} like this
`)
      ).toMatchSnapshot();
    });

    it("works inside explicit markdown table", () => {
      expect(
        parse(`
| {{function|argument}} | {{function|argument|argument}} |
| --------------------- | ------------------------------ |
| {{function|argument}} | {{function|argument}}          |
`)
      ).toMatchSnapshot();
    });
  });

  describe("backward compatibility", () => {
    it("support self closing html tag", () => {
      expect(
        parse(`<img src="foo.jpg" />
<br />
%col
  left
%col
  right
<br/>
<br/>
%col
  left
%col
  right
  <br />`)
      ).toMatchSnapshot();
    });
  });
});
