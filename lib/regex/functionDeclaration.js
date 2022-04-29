const { buildRegexString } = require("./utils");

const blocks = {
    export: /export/,
    default: /(\s+default)?/,
    function: /(\s+function)/,
    optional: {
        source: "?",
    },
    space: /\s/,
    optionalSpace: /\s*/,
    oneOrMoreSpace: /\s+/,
    functionName: /[\w]+/,
    parenthesesOpen: /\(/,
    parenthesesClose: /\)/,
    parameters: /[\w,:=\s]+/,
    curlyParenthesesOpen: /{/,
};

blocks["functionNameDefinition"] = RegExp(
    buildRegexString([
        [[blocks.oneOrMoreSpace, blocks.functionName], blocks.optional],
        [blocks.optionalSpace, blocks.parenthesesOpen],
    ]),
    "g"
);
blocks["parametersDefinition"] = RegExp(
    buildRegexString([
        blocks.parenthesesOpen,
        blocks.parameters,
        blocks.parenthesesClose,
    ]),
    "g"
);

const order = [
    blocks.export,
    blocks.default,
    blocks.function,
    [[blocks.oneOrMoreSpace, blocks.functionName], blocks.optional],
    blocks.optionalSpace,
    blocks.parenthesesOpen,
    blocks.parameters,
    blocks.optional,
    blocks.parenthesesClose,
    blocks.optionalSpace,
    blocks.curlyParenthesesOpen,
];

const regex = RegExp(buildRegexString(order), "g");

module.exports = {
    blocks,
    regex,
};
