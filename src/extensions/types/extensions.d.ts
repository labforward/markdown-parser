import type { Construct } from "micromark-util-types";
import type { Handle } from "mdast-util-from-markdown";

export type FromMarkdown = {
  enter: Record<string, Handle>;
  exit: Record<string, Handle>;
};

export type Syntax =
  | {
      text: Record<number, Construct>;
    }
  | {
      document: Record<number, Construct>;
    };
