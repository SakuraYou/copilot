#!/usr/bin/env node
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var chalk_1 = __importDefault(require("chalk"));
var commander_1 = require("commander");
var semver_1 = __importDefault(require("semver"));
var utils_1 = require("./utils");
var check_1 = require("./check");
var create_app_1 = require("./create-app");
var packageJson = (0, utils_1.getPackageJson)();
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var program, projectName, options, latest, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    program = new commander_1.Command();
                    projectName = 'my-app';
                    program
                        .name('create-copilot-app')
                        .description('CLI to create a copilot app')
                        .version((0, utils_1.getPackageJson)().version);
                    program.usage("".concat(chalk_1["default"].green('<project-directory>'), " [options]"));
                    program.command('create-copilot-app <project>')
                        .description('Create a react project')
                        .action(function (name) {
                        projectName = name;
                    });
                    program.option('--template <template type>', 'specify a template for the created project');
                    program.parse(process.argv);
                    options = program.opts();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, (0, check_1.checkForLatestVersion)()];
                case 2:
                    latest = _a.sent();
                    if (latest && semver_1["default"].lt(packageJson.version, latest)) {
                        console.log();
                        console.log(chalk_1["default"].yellow("You are running `create-copilot-app` ".concat(packageJson.version, ", which is behind the latest release (").concat(latest, ").\n\n")));
                    }
                    else {
                        (0, create_app_1.createApp)(projectName, options.template);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('error =====', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
init();
