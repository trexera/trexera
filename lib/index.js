const getFileSource = require("./getFileSource");
const getMetadata = require("./getMetadata");
const createTestModule = require("./createTestModule");

module.exports = function (filePath) {
    getFileSource(filePath).then((data) => {
        const metadata = getMetadata(data);
        createTestModule(metadata, filePath);
    });
};
