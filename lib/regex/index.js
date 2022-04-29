const testDefinition = require("./testDefinition");
const functionDeclaration = require("./functionDeclaration");

const regex = RegExp(
    `(${testDefinition.regex.source})+(${functionDeclaration.regex.source})`,
    "g"
);

module.exports = {
    regex,
    testDefinition,
    functionDeclaration,
};
