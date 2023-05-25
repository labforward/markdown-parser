import type { Code, Effects, State } from "micromark-util-types";
declare function charactersConstruct(characters: Array<Code | number | ((arg0: Code) => boolean)>): {
    partial: boolean;
    tokenize: (effects: Effects, ok: State, nok: State) => (code: Code) => void | any;
};
export default charactersConstruct;
