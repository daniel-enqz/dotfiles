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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewDefinitionProvider = exports.definitionLocation = exports.definitionResolver = exports.findViews = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const constants_1 = require("./constants");
const rails_1 = require("./symbols/rails");
const utils_1 = require("./utils");
const missingFilelMsg = 'Missing file: ';
// const couldNotOpenMsg = 'Could Not Open file: ';
// const SYMBOL_END = '[^\\w]';
const NO_DEFINITION = 'No definition found!';
/**
 * narrow view finding path
 * @param _path parts after app/views
 * @param fileType
 * @param viewType
 * @returns promised view glob path
 */
function findViews(document, position, _path, fileType = '', viewType = 'partial' // partial or template
) {
    console.log(`findViews`, arguments);
    let filePath;
    const isSameDirPartial = /^[a-zA-Z0-9_-]+$/.test(_path), isViewsRelativePath = _path.indexOf('/') !== -1, ext = path.parse(_path).ext, _underscore = viewType.endsWith('partial') ? '_' : '', // viewType could be "json.partial"
    definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    };
    if (isSameDirPartial) {
        const fileName = vscode.workspace.asRelativePath(document.fileName), dir = path.dirname(fileName);
        filePath = path.join(dir, `${_underscore}${_path}${fileType}.*`);
        definitionInformation.file = filePath;
    }
    else if (ext) {
        filePath = path.join(constants_1.REL_VIEWS, _path);
        definitionInformation.file = filePath;
    }
    else if (isViewsRelativePath) {
        filePath = path.join(constants_1.REL_VIEWS, path.dirname(_path), `${_underscore}${path.basename(_path)}${fileType}.*`);
        definitionInformation.file = filePath;
    }
    else {
        return Promise.reject('not a view');
    }
    console.log(viewType, filePath, isViewsRelativePath, isSameDirPartial);
    const promise = new Promise(definitionResolver(document, definitionInformation));
    return promise;
}
exports.findViews = findViews;
/**
 *
 * @returns Promise callback resolved glob path(exact path)
 */
function definitionResolver(document, definitionInformation, exclude = null, maxNum = null) {
    console.log(`definitionResolver`, arguments);
    return (resolve, reject) => {
        utils_1.findFiles(document, vscode.workspace.asRelativePath(definitionInformation.file)).then((uris) => {
            if (!uris.length) {
                reject(missingFilelMsg + definitionInformation.file);
            }
            else if (uris.length === 1) {
                definitionInformation.file = uris[0].fsPath;
                resolve(definitionInformation);
            }
            else {
                reject(NO_DEFINITION);
            }
        }, () => {
            reject(missingFilelMsg + definitionInformation.file);
        });
    };
}
exports.definitionResolver = definitionResolver;
/**
 * interaction with provideDefinition
 * @returns Thenable<RailsDefinitionInformation>
 */
function definitionLocation(document, position, goConfig, token) {
    console.log(`definitionLocation`, arguments);
    const wordRange = document.getWordRangeAtPosition(position, /([A-Za-z\/0-9_-]+)(\.[A-Za-z0-9]+)*/);
    if (!wordRange) {
        return Promise.resolve(null);
    }
    const lineText = document.lineAt(position.line).text.trim();
    const lineStartToWord = document
        .getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end))
        .trim();
    const lineStartToWordStart = document
        .getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.start))
        .trim();
    const matched = lineStartToWordStart.match(constants_1.PATTERNS.RENDER_MATCH), preWord = matched && matched[matched.length - 1], viewType = preWord && !preWord.includes('render') ? preWord : 'partial';
    console.log(`viewType:${viewType}`);
    const word = document.getText(wordRange);
    console.log(word);
    // if (lineText.startsWith("/") || word.match(/^\d+.?\d+$/)) {
    //   return Promise.resolve(null);
    // }
    if (!goConfig) {
        goConfig = vscode.workspace.getConfiguration('rails');
    }
    const symbol = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord)[1];
    if (rails_1.RAILS.prefix(symbol.toLowerCase()).isProper) {
        return Promise.reject('Rails symbols');
    }
    const renderMatched = lineText.match(constants_1.VIEWS_PATTERNS.RENDER_PATTERN);
    if (renderMatched) {
        console.log(renderMatched);
        return findViews(document, position, word, '', viewType);
    }
    else {
        return findViews(document, position, word, '', viewType);
    }
}
exports.definitionLocation = definitionLocation;
class ViewDefinitionProvider {
    constructor(goConfig) {
        this.goConfig = null;
        this.goConfig = goConfig;
    }
    provideDefinition(document, position, token) {
        return definitionLocation(document, position, this.goConfig, token).then((definitionInfo) => {
            if (definitionInfo === null || definitionInfo.file === null) {
                return null;
            }
            const definitionResource = vscode.Uri.file(definitionInfo.file);
            const pos = new vscode.Position(definitionInfo.line, definitionInfo.column || 0 // required here otherwise rais "Invalid arguments."
            );
            return new vscode.Location(definitionResource, pos);
        }, (err) => {
            if (err) {
                // Prompt for missing tool is located here so that the
                // prompts dont show up on hover or signature help
                if (typeof err === 'string' && err.startsWith(missingFilelMsg)) {
                    // promptForMissingTool(err.substr(missingToolMsg.length));
                }
                else {
                    return Promise.reject(NO_DEFINITION);
                }
            }
            return Promise.reject(NO_DEFINITION);
        });
    }
}
exports.ViewDefinitionProvider = ViewDefinitionProvider;
