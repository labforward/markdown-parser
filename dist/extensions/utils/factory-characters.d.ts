import type { Code, Effects, State } from "micromark-util-types";
declare function factoryCharacters(effects: Effects, ok: State, nok: State): (characters: (Code | ((arg0: Code) => boolean))[]) => (code: Code) => any | undefined;
export default factoryCharacters;
