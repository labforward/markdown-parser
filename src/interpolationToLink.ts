// eslint-disable-next-line import/no-extraneous-dependencies
import { visit } from "unist-util-visit";
import type { Node, Element } from "hast";

type Field = {
  value: string;
};

const interpolationToLink = (
  options: { fields: Record<string, Field> } = { fields: {} },
) => {
  return (tree: Node) => {
    visit(tree, "element", (node: Element) => {
      if (
        node.tagName === "a" &&
        node.properties?.href &&
        typeof node.properties.href === "string"
      ) {
        // Decode potential URL-encoded curly braces
        // e.g [site](http://site.com/%7B%7Bfield%7B%7B)
        // replace and becomes [site](http://site.com/{{field}})
        const href = node.properties.href
          .replace(/%7B%7B/gi, "{{")
          .replace(/%7D%7D/gi, "}}");

        // // Only apply regex if the pattern exists
        const interpolationRegex = /{{\s*(\w+)\s*}}/;

        if (interpolationRegex.test(href)) {
          const match = interpolationRegex.exec(href);

          if (match) {
            // we get the key from the string e.g. {{field}}
            const key = match[1];

            if (options?.fields[key] === undefined) return;
            // get the value based from the fields object using the key
            const replacement = options?.fields[key]?.value;
            const resolvedHref = href.replace(interpolationRegex, replacement);

            // eslint-disable-next-line no-param-reassign
            node.properties.href = resolvedHref;
          }
        }
      }
    });
  };
};

export default interpolationToLink;
