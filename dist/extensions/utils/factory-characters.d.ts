import type { Code, Effects, State } from 'micromark-util-types';
declare function factoryCharacters(effects: Effects, ok: State, nok: State): (characters: Array<Code | number | ((arg0: Code) => boolean)>) => (code: Code) => any | undefined;
export default factoryCharacters;
