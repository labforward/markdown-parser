import type { Code, Effects, State } from "micromark-util-types";
declare const _default: {
    text: {
        [x: number]: {
            name: string;
            tokenize: typeof tokenizeInterpolation;
        };
    };
};
export default _default;
declare function tokenizeInterpolation(effects: Effects, ok: State, nok: State): (code: Code) => void | any;
