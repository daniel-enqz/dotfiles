'use strict';
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
exports.RailsCompletionItemProvider = exports.modelQueryInterface = exports.TriggerCharacter = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const utils_1 = require("./utils");
const rails_definition_1 = require("./rails_definition");
const micromatch_1 = __importDefault(require("micromatch"));
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const constants_1 = require("./constants");
const rails_helper_1 = require("./rails_helper");
const QUERY_METHODS = [
    'find_by',
    'first',
    'last',
    'take',
    'find',
    'find_each',
    'find_in_batches',
    'create_with',
    'distinct',
    'eager_load',
    'extending',
    'from',
    'group',
    'having',
    'includes',
    'joins',
    'left_outer_joins',
    'limit',
    'lock',
    'none',
    'offset',
    'order',
    'preload',
    'readonly',
    'references',
    'reorder',
    'reverse_order',
    'select',
    'where',
    'all',
];
var TriggerCharacter;
(function (TriggerCharacter) {
    TriggerCharacter[TriggerCharacter["dot"] = 0] = "dot";
    TriggerCharacter[TriggerCharacter["quote"] = 1] = "quote";
    TriggerCharacter[TriggerCharacter["colon"] = 2] = "colon";
})(TriggerCharacter = exports.TriggerCharacter || (exports.TriggerCharacter = {}));
function modelQueryInterface() {
    const suggestions = [];
    QUERY_METHODS.forEach((value) => {
        const item = new vscode.CompletionItem(value);
        item.insertText = value;
        item.kind = vscode.CompletionItemKind.Method;
        suggestions.push(item);
    });
    return suggestions;
}
exports.modelQueryInterface = modelQueryInterface;
async function getCols(fileAbsPath, position, triggerCharacter, prefix) {
    const fileStream = fs.createReadStream(fileAbsPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    const cols = [];
    for await (const lineText of rl) {
        if (/^#\s+([a-z0-9_]+)/.test(lineText)) {
            const col = /^#\s+([a-z0-9_]+)/.exec(lineText)[1];
            const name = prefix ? prefix + col : col;
            const item = new vscode.CompletionItem(name);
            item.insertText = name;
            item.kind = vscode.CompletionItemKind.Field;
            // @todo? move cusor next to quote eg. Client.where('locked' => true) :id=>
            cols.push(item);
        }
    }
    return cols;
}
async function getMethods(fileAbsPath) {
    const methods = [];
    let markAsStart = false, markAsEnd = false;
    const fileStream = fs.createReadStream(fileAbsPath);
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    for await (const lineText of rl) {
        if (/^class\s+<<\s+self/.test(lineText)) {
            markAsStart = true;
            markAsEnd = false;
        }
        if (/^private$/.test(lineText)) {
            markAsEnd = true;
        }
        if (markAsEnd)
            continue;
        if (markAsStart && constants_1.PATTERNS.FUNCTION_DECLARATON.test(lineText)) {
            const func = lineText.replace(constants_1.PATTERNS.FUNCTION_DECLARATON, '');
            const item = new vscode.CompletionItem(func);
            item.insertText = func;
            item.kind = vscode.CompletionItemKind.Method;
            methods.push(item);
        }
    }
    return methods;
}
class RailsCompletionItemProvider {
    // private pkgsList = new Map<string, string>();
    provideCompletionItems(document, position, token) {
        return this.provideCompletionItemsInternal(document, position, token, vscode.workspace.getConfiguration('rails', document.uri));
    }
    provideCompletionItemsInternal(document, position, token, config) {
        return new Promise(async (resolve, reject) => {
            const suggestions = [];
            const filename = document.fileName;
            const lineText = document.lineAt(position.line).text;
            const lineTillCurrentPosition = lineText.substr(0, position.character);
            console.log(`lineTillCurrentPosition:${lineTillCurrentPosition}`);
            const character = lineTillCurrentPosition[lineTillCurrentPosition.length - 1];
            // let autocompleteUnimportedPackages = config['autocompleteUnimportedPackages'] === true && !lineText.match(/^(\s)*(import|package)(\s)+/);
            if (lineText.match(/^\s*\/\//)) {
                return resolve([]);
            }
            let triggerCharacter;
            switch (character) {
                case '.':
                    triggerCharacter = TriggerCharacter.dot;
                    break;
                case '"':
                case "'":
                    triggerCharacter = TriggerCharacter.quote;
                    break;
                case ':':
                    triggerCharacter = TriggerCharacter.colon;
            }
            console.log(`triggerCharacter:${triggerCharacter}`);
            // let inString = isPositionInString(document, position);
            // if (!inString && lineTillCurrentPosition.endsWith('\"')) {
            //     return resolve([]);
            // }
            // get current word
            let position2 = new vscode.Position(position.line, position.character - 1);
            if (triggerCharacter === TriggerCharacter.dot &&
                constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.test(lineTillCurrentPosition)) {
                const [, id, model] = constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.exec(lineTillCurrentPosition);
                position2 = new vscode.Position(position.line, lineText.indexOf(id));
            }
            const wordAtPosition = document.getWordRangeAtPosition(position2);
            if (!wordAtPosition) {
                return resolve(null);
            }
            const word = document.getText(wordAtPosition);
            let currentWord = '';
            if (wordAtPosition &&
                wordAtPosition.start.character < position.character) {
                currentWord = word.substr(0, position.character - wordAtPosition.start.character);
            }
            if (currentWord.match(/^\d+$/)) {
                return resolve([]);
            }
            console.log(wordAtPosition, currentWord, character);
            if (triggerCharacter === TriggerCharacter.dot) {
                let info, fileType;
                try {
                    info = await rails_definition_1.definitionLocation(document, position2);
                    fileType = utils_1.dectFileType(info.file);
                }
                catch (e) {
                    console.error(e);
                    reject(e);
                }
                switch (fileType) {
                    case constants_1.FileType.Model: // model static methods
                        suggestions.push(...modelQueryInterface());
                        const methods = await getMethods(info.file);
                        suggestions.push(...methods);
                        const cols = await getCols(info.file, position, triggerCharacter, 'find_by_');
                        suggestions.push(...cols);
                        break;
                }
            }
            else if (triggerCharacter === TriggerCharacter.colon ||
                triggerCharacter === TriggerCharacter.quote) {
                if (constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.test(lineTillCurrentPosition)) {
                    const [, id, model] = constants_1.PATTERNS.CLASS_STATIC_METHOD_CALL.exec(lineTillCurrentPosition);
                    const position2 = new vscode.Position(position.line, lineText.indexOf(id));
                    let info, fileType;
                    try {
                        info = await rails_definition_1.definitionLocation(document, position2);
                        fileType = utils_1.dectFileType(info.file);
                    }
                    catch (e) {
                        console.error(e);
                        reject(e);
                    }
                    switch (fileType) {
                        case constants_1.FileType.Model: // model field suggestion
                            const cols = await getCols(info.file, position, triggerCharacter);
                            suggestions.push(...cols);
                            break;
                    }
                }
                else if (constants_1.PATTERNS.RENDER_DECLARATION.test(lineTillCurrentPosition.trim()) ||
                    constants_1.PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineTillCurrentPosition.trim()) ||
                    constants_1.PATTERNS.LAYOUT_DECLARATION.test(lineTillCurrentPosition.trim())) {
                    const matches = lineTillCurrentPosition.match(/([a-z]+)/g), id = matches.pop();
                    console.log('render type:' + id);
                    switch (id) {
                        case 'partial': // @todo if it is not controller related partial
                            {
                                const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new rails_helper_1.RailsHelper(document, relativeFileName, null);
                                const paths = rh.searchPaths().filter((v) => {
                                    return (v.startsWith(constants_1.REL_LAYOUTS) === false &&
                                        v.startsWith(constants_1.REL_VIEWS) === true);
                                });
                                console.log(`paths:${paths}`);
                                const items = await rh.generateList(paths).then((list) => {
                                    const partials = list
                                        .map((v) => path.parse(v).name.split('.')[0])
                                        .filter((v) => {
                                        return v.startsWith('_');
                                    });
                                    console.log(`partials:${partials}`);
                                    const items = partials.map((v) => {
                                        const name = v.substring(1);
                                        const item = new vscode.CompletionItem(name);
                                        item.insertText =
                                            triggerCharacter === TriggerCharacter.colon
                                                ? " '" + name + "'"
                                                : name;
                                        item.kind = vscode.CompletionItemKind.File;
                                        return item;
                                    });
                                    return items;
                                });
                                suggestions.push(...items);
                            }
                            break;
                        case 'template': // @todo if it is base application controller or helper suggest all views
                            {
                                const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new rails_helper_1.RailsHelper(document, relativeFileName, null);
                                const paths = rh.searchPaths().filter((v) => {
                                    return (v.startsWith(constants_1.REL_LAYOUTS) === false &&
                                        v.startsWith(constants_1.REL_VIEWS) === true);
                                });
                                const items = await rh.generateList(paths).then((list) => {
                                    const templates = list
                                        .map((v) => path.basename(v.substring(constants_1.REL_VIEWS.length + 1).split('.')[0]))
                                        .filter((v) => path.basename(v).startsWith('_') === false);
                                    const items = templates.map((v) => {
                                        const name = v;
                                        const item = new vscode.CompletionItem(name);
                                        item.insertText =
                                            triggerCharacter === TriggerCharacter.colon
                                                ? " '" + name + "'"
                                                : name;
                                        item.kind = vscode.CompletionItemKind.File;
                                        return item;
                                    });
                                    return items;
                                });
                                suggestions.push(...items);
                                if (TriggerCharacter.quote === triggerCharacter) {
                                    const views = await utils_1.findFiles(document, path.join(constants_1.REL_VIEWS, '**'), constants_1.REL_LAYOUTS).then((res) => {
                                        return res
                                            .filter((v) => {
                                            const p = vscode.workspace.asRelativePath(v);
                                            return (paths.some((v2) => {
                                                return !micromatch_1.default(p, v2);
                                            }) || path.basename(p).startsWith('_'));
                                        })
                                            .map((i) => {
                                            const name = vscode.workspace
                                                .asRelativePath(i)
                                                .substring(constants_1.REL_VIEWS.length + 1)
                                                .split('.')[0], item = new vscode.CompletionItem(name);
                                            item.insertText =
                                                triggerCharacter === TriggerCharacter.colon
                                                    ? " '" + name + "'"
                                                    : name;
                                            item.kind = vscode.CompletionItemKind.File;
                                            return item;
                                        });
                                    });
                                    suggestions.push(...views);
                                }
                            }
                            break;
                        case 'layout':
                            {
                                const views = await utils_1.findFiles(document, path.join(constants_1.REL_LAYOUTS, '**'), null).then((res) => {
                                    return res.map((i) => {
                                        const name = vscode.workspace
                                            .asRelativePath(i)
                                            .substring(constants_1.REL_LAYOUTS.length + 1)
                                            .split('.')[0], item = new vscode.CompletionItem(name);
                                        item.insertText =
                                            triggerCharacter === TriggerCharacter.colon
                                                ? " '" + name + "'"
                                                : name;
                                        item.kind = vscode.CompletionItemKind.File;
                                        return item;
                                    });
                                });
                                suggestions.push(...views);
                            }
                            break;
                    }
                }
            }
            resolve(suggestions);
        });
    }
}
exports.RailsCompletionItemProvider = RailsCompletionItemProvider;
