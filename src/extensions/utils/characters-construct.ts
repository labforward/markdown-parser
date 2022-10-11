import factoryCharacters from "./factory-characters.js";

function charactersConstruct(characters) {
  function tokenizeCharactersConstruct(effects, ok, nok) {
    return factoryCharacters(effects, ok, nok)(characters);
  }

  return {
    tokenize: tokenizeCharactersConstruct,
    partial: true,
  };
}

export default charactersConstruct;
