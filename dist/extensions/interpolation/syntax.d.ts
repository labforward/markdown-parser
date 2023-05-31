import type { Code, Effects, State } from "micromark-util-types";
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
declare function tokenizeInterpolation(effects: Effects, ok: State, nok: State): (code: Code) => void | any;
