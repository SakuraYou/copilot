"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.isSafeToCreateProjectIn = exports.getPackageJson = void 0;
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
function getPackageJson() {
    return require(path_1["default"].resolve(__dirname, '../package.json'));
}
exports.getPackageJson = getPackageJson;
function isSafeToCreateProjectIn(root, name) {
    var validFiles = [
        '.DS_Store',
        '.git',
        '.gitattributes',
        '.gitignore',
        '.gitlab-ci.yml',
        '.hg',
        '.hgcheck',
        '.hgignore',
        '.idea',
        '.npmignore',
        '.travis.yml',
        'docs',
        'LICENSE',
        'README.md',
        'mkdocs.yml',
        'Thumbs.db',
    ];
    var errorLogFilePatterns = [
        'npm-debug.log',
        'yarn-error.log',
        'yarn-debug.log',
        'pnpm-error.log'
    ];
    var isErrorLog = function (file) {
        return errorLogFilePatterns.some(function (pattern) { return file.startWith(pattern); });
    };
    // check files 
    var conflicts = fs_extra_1["default"].readdirSync(root).filter(function (file) { return !validFiles.includes(file); }).filter(function (file) { return !isErrorLog(file); });
    if (conflicts.length > 0) {
        console.log("The directory " + chalk_1["default"].green(name) + " contains files that could conflict:");
        console.log();
        for (var _i = 0, conflicts_1 = conflicts; _i < conflicts_1.length; _i++) {
            var file = conflicts_1[_i];
            try {
                var stats = fs_extra_1["default"].lstatSync(fs_extra_1["default"].json(root, file));
                if (stats.isDirectory()) {
                    console.log(" " + chalk_1["default"].blue(file + "/"));
                }
                else {
                    console.log("  " + file);
                }
            }
            catch (error) {
                console.log("  " + file);
            }
        }
        console.log();
        console.log('Either try using a new directory name, or remove the files listed above.');
        return false;
    }
    fs_extra_1["default"].readdirSync(root).forEach(function (file) {
        if (isErrorLog(file)) {
            fs_extra_1["default"].removeSync(path_1["default"].join(root, file));
        }
    });
    return true;
}
exports.isSafeToCreateProjectIn = isSafeToCreateProjectIn;
