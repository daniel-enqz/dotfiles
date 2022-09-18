"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RailsHover = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const utils_1 = require("./utils");
const constants_1 = require("./constants");
const inflection = __importStar(require("inflection2"));
const fs_1 = __importDefault(require("fs"));
const skeemaParser_1 = __importDefault(require("./skeemaParser"));
const markdown_table_1 = require("./markdown-table");
const util_1 = require("util");
const path_exists_1 = __importDefault(require("path-exists"));
const files = {};
function readFile(path, options = {}, fn) {
    let _fn = fn;
    if (2 === arguments.length) {
        // @ts-ignore
        _fn = options;
        options = {};
    }
    if (!files[path])
        files[path] = {};
    const file = files[path];
    fs_1.default.stat(path, (err, stats) => {
        if (err)
            return _fn(err);
        else if (file.mtime >= stats.mtime) {
            return _fn(null, file.content);
        }
        fs_1.default.readFile(path, options, (err, buf) => {
            if (err)
                return _fn(err);
            const parser = new skeemaParser_1.default(buf.toString());
            const tables = parser.parse();
            files[path] = {
                mtime: stats.mtime,
                content: tables,
            };
            _fn(null, tables);
        });
    });
}
const _readFile = util_1.promisify(readFile);
class RailsHover {
    provideHover(document, position, token) {
        const symbol = utils_1.getSymbol(document, position);
        if (!symbol) {
            return undefined;
        }
        const demodulized = inflection.demodulize(symbol);
        if (constants_1.PATTERNS.CAPITALIZED.test(demodulized)) {
            const tableName = inflection.tableize(symbol);
            const root = vscode.workspace.getWorkspaceFolder(document.uri).uri.fsPath;
            const schemaPath = path.join(root, 'db', 'schema.rb');
            if (!files[schemaPath] && !path_exists_1.default.sync(schemaPath)) {
                return undefined;
            }
            return _readFile(schemaPath, {}).then((tables) => {
                if (typeof tables !== 'undefined') {
                    if (tableName in tables) {
                        const table = tables[tableName];
                        const tablemd = [['Field', 'Type']];
                        Object.entries(table).forEach(([key, val]) => {
                            tablemd.push([
                                `<span style="color:#008000;">${key}</span>`,
                                `<span style="color:#cc0000;">${val.toString()}</span>`,
                            ]);
                        });
                        const md = markdown_table_1.markdownTable(tablemd);
                        const mds = new vscode.MarkdownString(md);
                        mds.isTrusted = true;
                        return new vscode.Hover(mds);
                    }
                }
            });
        }
    }
}
exports.RailsHover = RailsHover;
