import factoryCharacters from './factory-characters.js';
function charactersConstruct(characters) {
    function tokenizeCharactersConstruct(effects, ok, nok) {
        return factoryCharacters(effects, ok, nok)(characters);
    }
    return {
        partial: true,
        tokenize: tokenizeCharactersConstruct,
    };
}
export default charactersConstruct;
//# sourceMappingURL=characters-construct.js.map