function buildRegexString(arr, group = false) {
    let string = arr
        .map((item) => {
            if (Array.isArray(item)) {
                return buildRegexString(item, true);
            } else {
                return item.source;
            }
        })
        .join("");

    if (group) {
        string = `(${string})`;
    }

    return string;
}

module.exports = {
    buildRegexString,
};
