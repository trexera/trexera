const { regex, functionDeclaration, testDefinition } = require("./regex/");

function getMetadata(data) {
    const metadata = [];
    const blocks = data.match(regex);

    console.log(blocks);

    blocks.forEach((item) => {
        const functionDeclarationString = item.match(
            functionDeclaration.regex
        )[0];
        const testDefinitionStrings = item.match(testDefinition.regex);

        const functionName = functionDeclarationString
            .match(functionDeclaration.blocks.functionNameDefinition)[0]
            .match(functionDeclaration.blocks.functionName)[0];

        const parametersString = functionDeclarationString
            .match(functionDeclaration.blocks.parametersDefinition)[0]
            .match(functionDeclaration.blocks.parameters)[0]
            .replace(RegExp(functionDeclaration.blocks.space, "g"), "");

        // TODO Replace regexes after here

        const parameters = parametersString.split(",").map((p) => {
            const parameter = p.replace(/=[a-zA-Z0-9'"\s]*/g, "").split(":");
            return {
                name: parameter[0],
                type: parameter[1],
            };
        });

        const tests = testDefinitionStrings.map((testString) => {
            const args = testString
                .match(/\([\w\s,]*\)/g)[0]
                .replace(/[\s\(\)]/g, "")
                .split(",")
                .map((arg, argIndex) => {
                    if (parameters[argIndex].type === "number") {
                        return Number(arg);
                    } else {
                        return arg;
                    }
                });

            const returnValue = testString
                .replace(/[\r\n]/g, "")
                .match(/=>\s*([\w\s,'"]+)/)[1];

            return {
                arguments: args,
                returnValue,
            };
        });

        if (functionName !== "function") {
            metadata.push({
                name: functionName,
                parameters,
                tests,
            });
        }
    });

    return metadata;
}

module.exports = getMetadata;
