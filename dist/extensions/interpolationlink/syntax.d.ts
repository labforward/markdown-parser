import type { Code, Effects, State, TokenizeContext } from "micromark-util-types";
declare const _default: {
    text: {
        [x: number]: {
            name: string;
            tokenize: typeof tokenizeInterpolationLink;
        };
    };
};
export default _default;
declare function tokenizeInterpolationLink(this: TokenizeContext, effects: Effects, ok: State, nok: State): (code: Code) => void | State;
