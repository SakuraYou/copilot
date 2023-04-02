"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.createApp = void 0;
var coerce_1 = __importDefault(require("semver/functions/coerce"));
var lt_1 = __importDefault(require("semver/functions/lt"));
var chalk_1 = __importDefault(require("chalk"));
var path_1 = __importDefault(require("path"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var os_1 = __importDefault(require("os"));
var utils_1 = require("./utils");
function createApp(name, template) {
    var unsupportedNodeVersion = !lt_1["default"]('14.0.0', coerce_1["default"](process.version));
    if (unsupportedNodeVersion) {
        console.log(chalk_1["default"].yellow("You are using Node " + process.version + " so the project will be bootstrapped with an old unsupported version of tools.\n\n" +
            "Please update to Node 14 or higher for a better, fully supported experience.\n"));
    }
    var root = path_1["default"].resolve(name);
    var appName = path_1["default"].basename(root);
    fs_extra_1["default"].ensureDirSync(name);
    utils_1.isSafeToCreateProjectIn(root, name);
    console.log();
    console.log("Creating a new React app in " + chalk_1["default"].green(root) + ".");
    console.log();
    var packageJson = {
        name: appName,
        version: '1.0.0',
        private: true
    };
    fs_extra_1["default"].writeFileSync(path_1["default"].join(root, 'package.json'), JSON.stringify(packageJson, null, 2) + os_1["default"].EOL);
    var originalDirectory = process.cwd();
    process.chdir(root);
    run({
        root: root,
        name: appName,
        template: template,
        originalDirectory: originalDirectory
    });
}
exports.createApp = createApp;
function run(_a) {
    var root = _a.root, name = _a.name, template = _a.template, originalDirectory = _a.originalDirectory;
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_b) {
        return [2 /*return*/];
    }); });
}
