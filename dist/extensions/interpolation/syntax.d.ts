import type { Code, Effects, State, TokenizeContext } from "micromark-util-types";
declare const _default: {
    text: {
        33: {
            name: string;
            tokenize: typeof tokenizeInterpolation;
        };
        123: {
            name: string;
            tokenize: typeof tokenizeInterpolation;
        };
    };
};
export default _default;
declare function tokenizeInterpolation(this: TokenizeContext, effects: Effects, ok: State, nok: State): (code: Code) => /*elided*/ any | undefined;
