import type { Handle } from 'mdast-util-from-markdown';
import type { Construct } from 'micromark-util-types';

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
