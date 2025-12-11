function factoryCharacters(effects, ok, nok) {
    return charactersWalker;
    function charactersWalker(characters) {
        return onCharacterCode;
        function onCharacterCode(code) {
            const [expected, ...nextCharacters] = characters;
            if (typeof expected === 'function' ? !expected(code) : code !== expected)
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