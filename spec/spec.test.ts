import { unified } from "unified";

const parse = async (raw) => {
  const md2hast = (await import("../src/md2hast.js")).default;
  const preprocessor = (await import("../src/preprocessor.js")).default;
  const parser = unified().use(md2hast);

  return parser.runSync(parser.parse(preprocessor(raw)));
};

describe("Markdown extensions", () => {
  describe("for grid", () => {
    it("add support for parsing custom grid syntax", async () => {
      expect(
        await parse(`Before grid

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

    it("is able to parse grid without any leading or trailing characters", async () => {
      expect(
        await parse(`%col
  left
%col
  right
%col`)
      ).toMatchSnapshot();
    });

    it("is able to parse partially defined grid", async () => {
      expect(
        await parse(`%col
%col`)
      ).toMatchSnapshot();

      expect(
        await parse(
          `###### Syntax examples:
%col
  \`\`\`yml
  code block
  \`\`\`
%col`
        )
      ).toMatchSnapshot();
    });

    it("is able to parse deeply nested grid", async () => {
      expect(
        await parse(`
%col
  %col
    %col
      content
`)
      ).toMatchSnapshot();
    });

    it("preserve spaces inside code block", async () => {
      expect(
        await parse(`%col
  \`\`\`yml
  - label: print
    key: print-button
    color: secondary
    variant: contained
  \`\`\`
  `)
      ).toMatchSnapshot();

      expect(
        await parse(`%col container
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
    it("add support for interpolation syntax", async () => {
      expect(
        await parse(`Interpolation can stand alone like the following

{{function}}

be parameterized

{{function|argument}}

and appear {{inline|with=argument}} like this
`)
      ).toMatchSnapshot();
    });

    it("add support for bang! interpolation syntax", async () => {
      expect(
        await parse(`Bang! Interpolation can stand alone like the following

!{{function}}

be parameterized

!{{function|arg-one|arg-two}}

and appear !{{inline|with=argument}} like this
`)
      ).toMatchSnapshot();
    });

    it("works inside explicit markdown table", async () => {
      expect(
        await parse(`
| {{function|argument}} | {{function|argument|argument}} |
| --------------------- | ------------------------------ |
| {{function|argument}} | {{function|argument}}          |
`)
      ).toMatchSnapshot();
    });
  });

  describe("backward compatibility", () => {
    it("support self closing html tag", async () => {
      expect(
        await parse(`<img src="foo.jpg" />
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
