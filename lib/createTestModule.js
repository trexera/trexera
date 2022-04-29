const fs = require("fs");
const path = require("path");
const config = require("./config.json");

const createTestModuleContent = require("./createTestModuleContent");

function createTestModule(metadata, filePath) {
    // filePath: C:\path\to\folder\myModule.js
    const currentPath = path.parse(filePath); // object
    const fileName = currentPath.name; // myModule
    const testFileName = fileName + ".test.js"; // myModule.test.js
    const testFilePath = path.join(
        currentPath.dir,
        config.testFolderName,
        testFileName
    ); // C:\path\to\folder\tests\myModule.test.js
    const testDirectory = path.join(currentPath.dir, config.testFolderName); // C:\path\to\folder\tests

    const filePathForRead = path.join(currentPath.dir, currentPath.name); // C:\path\to\folder\myModule
    const filePathForImport = path
        .relative(testDirectory, filePathForRead)
        .replace("\\", "/"); // ../myModule

    const content = createTestModuleContent(
        metadata,
        filePathForRead,
        filePathForImport
    );

    if (!fs.existsSync(testDirectory)) {
        fs.mkdirSync(testDirectory, { recursive: true });
    }

    fs.writeFileSync(testFilePath, content, { flag: "w" });
    console.log("🦖 " + testFileName + " created successfully!");
}

module.exports = createTestModule;
