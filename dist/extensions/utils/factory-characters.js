function factoryCharacters(effects, ok, nok) {
    return charactersWalker;
    function charactersWalker(characters) {
        return onCharacterCode;
        function onCharacterCode(code) {
            var expected = characters[0], nextCharacters = characters.slice(1);
            if (typeof expected === "function" ? !expected(code) : code !== expected)
                return nok(code);
            effects.consume(code);
            if (nextCharacters.length)
                return charactersWalker(nextCharacters);
            return ok(code);
        }
    }
}
export default factoryCharacters;
//# sourceMappingURL=factory-characters.js.map