import type { Code, Effects, State } from "micromark-util-types";

import factoryCharacters from "./factory-characters.js";

function charactersConstruct(characters: Array<Function | Code>) {
  function tokenizeCharactersConstruct(
    effects: Effects,
    ok: State,
    nok: State
  ) {
    return factoryCharacters(effects, ok, nok)(characters);
  }

  return {
    tokenize: tokenizeCharactersConstruct,
    partial: true,
  };
}

export default charactersConstruct;
