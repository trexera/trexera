const blocks = {
    slashes: /\/\//,
    optionalSpace: /\s*/,
    questionMark: /\?/,
    parenthesesOpen: /\(/,
    parenthesesClose: /\)/,
    arguments: /[\w\s,]*/,
    arrow: /=>/,
    returnValue: /[\w\s,'"]+/,
    newline: /\n/,
};

const order = [
    blocks.slashes,
    blocks.optionalSpace,
    blocks.questionMark,
    blocks.optionalSpace,
    blocks.parenthesesOpen,
    blocks.arguments,
    blocks.parenthesesClose,
    blocks.optionalSpace,
    blocks.arrow,
    blocks.optionalSpace,
    blocks.returnValue,
    blocks.newline,
];

const regex = RegExp(order.map((r) => r.source).join(""), "g");

module.exports = {
    blocks,
    regex,
};
