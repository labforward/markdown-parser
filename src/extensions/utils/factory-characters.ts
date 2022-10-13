import type { Code, Effects, State } from "micromark-util-types";

function factoryCharacters(effects: Effects, ok: State, nok: State) {
  return charactersWalker;

  function charactersWalker(characters: Array<Function | Code>) {
    return onCharacterCode;

    function onCharacterCode(code: Code) {
      const [expected, ...nextCharacters] = characters;

      if (typeof expected === "function" ? !expected(code) : code !== expected)
        return nok(code);

      effects.consume(code);

      if (nextCharacters.length) return charactersWalker(nextCharacters);

      return ok(code);
    }
  }
}

export default factoryCharacters;
