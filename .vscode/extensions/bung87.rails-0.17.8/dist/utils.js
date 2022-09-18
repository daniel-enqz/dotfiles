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
exports.getSubPathBySymbol = exports.getSymbol = exports.findFiles = exports.toPosixPath = exports.flatten = exports.isPositionInString = exports.wordsToPath = exports.dectFileType = exports.gitignores = exports.LocalBundle = void 0;
const constants_1 = require("./constants");
const vscode_1 = require("vscode");
const path_1 = __importDefault(require("path"));
const inflection = __importStar(require("inflection2"));
exports.LocalBundle = 'vendor/bundle/**';
exports.gitignores = {};
function dectFileType(filePath) {
    for (const [key, value] of constants_1.FileTypeRelPath) {
        if (filePath.indexOf(value) >= 0) {
            return key;
        }
    }
    return constants_1.FileType.Unkown;
}
exports.dectFileType = dectFileType;
function wordsToPath(s) {
    return inflection.underscore(s.replace(/[A-Z]{2,}(?![a-z])/, (s) => {
        return inflection.titleize(s);
    }));
}
exports.wordsToPath = wordsToPath;
function isPositionInString(document, position) {
    const lineText = document.lineAt(position.line).text;
    const lineTillCurrentPosition = lineText.substr(0, position.character);
    // Count the number of double quotes in the line till current position. Ignore escaped double quotes
    let doubleQuotesCnt = (lineTillCurrentPosition.match(/\"/g) || []).length;
    const escapedDoubleQuotesCnt = (lineTillCurrentPosition.match(/\\\"/g) || [])
        .length;
    doubleQuotesCnt -= escapedDoubleQuotesCnt;
    return doubleQuotesCnt % 2 === 1;
}
exports.isPositionInString = isPositionInString;
function flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
        return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten);
    }, []);
}
exports.flatten = flatten;
function toPosixPath(s) {
    return s.split(path_1.default.sep).join(path_1.default.posix.sep);
}
exports.toPosixPath = toPosixPath;
/**
 * findFiles in root of document and repect gitignore
 */
function findFiles(document, include, exclude, maxResults, token) {
    const ws = vscode_1.workspace.getWorkspaceFolder(document.uri);
    const name = ws.name;
    const _include = new vscode_1.RelativePattern(ws, toPosixPath(include));
    const _exclude = exports.gitignores[name] && exclude ? exports.gitignores[name].concat(exclude) : exclude;
    return vscode_1.workspace.findFiles(_include, _exclude + `,${exports.LocalBundle}`, maxResults, token);
}
exports.findFiles = findFiles;
/**
 * ...Word -> A::B::Word
 */
function getSymbol(document, position) {
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange) {
        return void 0;
    }
    const word = document.getText(wordRange);
    if (!word) {
        return void 0;
    }
    const lineStartToWord = document
        .getText(new vscode_1.Range(new vscode_1.Position(position.line, 0), wordRange.end))
        .trim();
    const r = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord);
    if (r.length >= 2) {
        return r[1];
    }
}
exports.getSymbol = getSymbol;
/**
 *
 * @param symbol A::B::Word
 * @returns lowercase name and sub path
 */
function getSubPathBySymbol(symbol) {
    const seq = symbol
        .split('::')
        .map(wordsToPath)
        .filter((v) => v !== ''), sub = seq.slice(0, -1).join(path_1.default.sep), name = seq[seq.length - 1];
    return [name, sub];
}
exports.getSubPathBySymbol = getSubPathBySymbol;
