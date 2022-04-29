function createTestModuleContent(metadata, filePathForRead, filePathForImport) {
    const functionNames = metadata.map(({ name }) => name);
    const functionNamesString = functionNames.join(", ");

    let content = [];
    content.push(
        `const {${functionNamesString}} = require("${filePathForImport}")`
    );

    content = content.concat(
        metadata.map((functionMetadata) =>
            generateTests(functionMetadata, filePathForRead)
        )
    );

    return content.join("\n");
}

function generateTests({ name, tests }, filePathForRead) {
    const content = [];
    const module = require(filePathForRead);

    tests.forEach((test) => {
        const args = test.arguments;
        const argsString = args.join(", ");
        const expectedResult = module[name].apply(null, args);
        content.push(`
test("${name}", () => {
    expect(${name}(${argsString})).toBe(${expectedResult});
});`);
    });

    return content.join("\n");
}

module.exports = createTestModuleContent;
