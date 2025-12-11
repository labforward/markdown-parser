import type { Code, Effects, State } from 'micromark-util-types';

import factoryCharacters from './factory-characters.js';

function charactersConstruct(
  characters: Array<Code | number | ((arg0: Code) => boolean)>,
) {
  function tokenizeCharactersConstruct(
    effects: Effects,
    ok: State,
    nok: State,
  ) {
    return factoryCharacters(effects, ok, nok)(characters);
  }

  return {
    partial: true,
    tokenize: tokenizeCharactersConstruct,
  };
}

export default charactersConstruct;
