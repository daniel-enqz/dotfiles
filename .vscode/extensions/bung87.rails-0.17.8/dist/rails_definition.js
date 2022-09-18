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
exports.RailsDefinitionProvider = exports.definitionLocation = exports.definitionResolver = exports.modelDefinitionLocation = exports.findFunctionOrClassByClassName = exports.findFunctionOrClassByClassNameInFile = exports.getFunctionOrClassInfoInFile = exports.getParentControllerFilePathByDocument = exports.getSymbolPath = exports.controllerDefinitionLocation = exports.findViews = exports.findLocationByWord = exports.getLibOrModelFilePath = exports.getModelFilePath = exports.getLibFilePath = exports.findClassInDocumentCallback = exports.getConcernsFilePath = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const utils_1 = require("./utils");
const rails_helper_1 = require("./rails_helper");
const constants_1 = require("./constants");
const rails_1 = require("./symbols/rails");
const ruby_1 = require("./symbols/ruby");
const inflection = __importStar(require("inflection2"));
const readline = __importStar(require("readline"));
const util_1 = require("util");
const missingFilelMsg = 'Missing file: ';
const couldNotOpenMsg = 'Could Not Open file: ';
const SYMBOL_END = '[^\\w]';
function getConcernsFilePath(lineStartToWord, fileT) {
    console.log(`getConcernsFilePath`, arguments);
    const concern = lineStartToWord.replace(constants_1.PATTERNS.INCLUDE_DECLARATION, ''), seq = concern.split('::').map(utils_1.wordsToPath);
    if (seq[0] === 'concerns')
        delete seq[0];
    const sub = seq.slice(0, -1).join(path.sep), name = seq[seq.length - 1], fileType = constants_1.FileTypeRelPath.get(fileT), filePath = path.join(fileType, sub, name + '.rb');
    return filePath;
}
exports.getConcernsFilePath = getConcernsFilePath;
function findClassInDocumentCallback(name, document) {
    const line = document
        .getText()
        .split('\n')
        .findIndex((line) => new RegExp('^class\\s+(((::)?[A-Za-z]+)*(::)?' + name + ')' + SYMBOL_END).test(line.trim())), definitionInformation = {
        file: document.uri.fsPath,
        line: Math.max(line, 0),
        column: 0,
    };
    console.log('findClassInDocumentCallback name', name);
    console.log('findClassInDocumentCallback document', document);
    return Promise.resolve(definitionInformation);
}
exports.findClassInDocumentCallback = findClassInDocumentCallback;
async function getLibFilePath(document, demodulized, name, sub) {
    const root = vscode.workspace.getWorkspaceFolder(document.uri).uri.fsPath;
    const filePathInLib = name ? path.join('lib', sub, name + '.rb') : '', libPath = sub ? path.join(root, 'lib', sub + '.rb') : '', funcOrClass = demodulized.indexOf('.') !== -1 ? demodulized.split('.')[1] : demodulized, regPrefix = constants_1.PATTERNS.CAPITALIZED.test(funcOrClass)
        ? 'class\\s+'
        : 'def\\s+', reg = new RegExp(regPrefix + funcOrClass + SYMBOL_END);
    console.log(`name:${name} demodulized:${demodulized} funcOrClass:${funcOrClass}`);
    let findInLibUris = [];
    let findInLib = null;
    try {
        findInLibUris = await utils_1.findFiles(document, filePathInLib, null, 1);
        // tslint:disable-next-line: no-empty
    }
    catch (e) { }
    if (filePathInLib) {
        if (findInLibUris.length > 0) {
            try {
                findInLib = await vscode.workspace
                    .openTextDocument(findInLibUris[0])
                    .then(findClassInDocumentCallback.bind(null, demodulized), () => {
                    return Promise.reject(couldNotOpenMsg + filePathInLib);
                });
            }
            catch (e) {
                return Promise.reject(couldNotOpenMsg + filePathInLib);
            }
        }
        else {
            if (libPath) {
                try {
                    findInLib = await findFunctionOrClassByClassNameInFile(libPath, reg);
                    // tslint:disable-next-line: no-empty
                }
                catch (e) { }
            }
        }
    }
    if (findInLib) {
        return findInLib;
    }
    else {
        return Promise.reject();
    }
}
exports.getLibFilePath = getLibFilePath;
async function getModelFilePath(document, demodulized, name, sub) {
    const filePathInModels = path.join(constants_1.REL_MODELS, '**', sub, name + '.rb');
    let uris;
    try {
        uris = await utils_1.findFiles(document, filePathInModels, null, 1);
    }
    catch (e) { }
    if (!uris.length) {
        return Promise.reject();
    }
    return vscode.workspace
        .openTextDocument(uris[0])
        .then(findClassInDocumentCallback.bind(null, demodulized), () => {
        return Promise.reject(couldNotOpenMsg + filePathInModels);
    });
}
exports.getModelFilePath = getModelFilePath;
async function getLibOrModelFilePath(document, lineStartToWord, word) {
    console.log(`getLibOrModelFilePath`, arguments);
    const symbol = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord)[1];
    console.log(`symbol:${symbol}`);
    const [name, sub] = utils_1.getSubPathBySymbol(symbol), demodulized = inflection.demodulize(symbol);
    let result = null;
    try {
        result = await getLibFilePath(document, demodulized, name, sub);
    }
    catch (e) { }
    if (result) {
        return result;
    }
    try {
        result = await getModelFilePath(document, demodulized, name, sub);
    }
    catch (e) { }
    if (result) {
        return result;
    }
    if (!result) {
        return Promise.reject();
    }
}
exports.getLibOrModelFilePath = getLibOrModelFilePath;
async function findLocationByWord(document, position, word, lineStartToWord) {
    console.log(`findLocationByWord`, arguments);
    if (constants_1.PATTERNS.CAPITALIZED.test(word)) {
        return getLibOrModelFilePath(document, lineStartToWord, word);
    }
    else {
        const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = inflection.camelize(fileNameWithoutSuffix);
        return findFunctionOrClassByClassName(document, position, word, controllerName);
    }
}
exports.findLocationByWord = findLocationByWord;
/**
 * get view glob
 * @returns glob path or null
 */
function findViews(document, position, word, lineStartToWord) {
    console.log(`findViews`, arguments);
    let filePath;
    const lineText = document.lineAt(position.line).text.trim(), match1 = lineStartToWord.match(constants_1.PATTERNS.RENDER_MATCH), match1id = match1[match1.length - 1], match2 = lineText.match(constants_1.PATTERNS.RENDER_MATCH), idIndex = match2.findIndex((v) => v.includes(match1id)), id = match2[idIndex], preWord = match2[idIndex - 1];
    console.log(match1, match2, id, preWord);
    if (preWord === 'render' &&
        ['template', 'partial', 'layout', 'json', 'html'].indexOf(id) !== -1) {
        return null;
    }
    const viewPath = path.parse(id).dir + path.sep + '*' + path.parse(id).name + '.*', sub = id.indexOf('/') !== -1
        ? ''
        : vscode.workspace
            .asRelativePath(document.fileName)
            .substring(constants_1.REL_CONTROLLERS.length + 1)
            .replace('_controller.rb', '');
    if (preWord === 'layout') {
        filePath = path.join(constants_1.REL_LAYOUTS, viewPath);
    }
    else {
        filePath = path.join(constants_1.REL_VIEWS, sub, viewPath);
    }
    console.log(preWord, filePath, match1id, id);
    return filePath;
}
exports.findViews = findViews;
function controllerDefinitionLocation(document, position, word, lineStartToWord) {
    console.log(`controllerDefinitionLocation`, JSON.stringify(position), word, lineStartToWord);
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    };
    // if (PATTERNS.CLASS_INHERIT_DECLARATION.test(lineStartToWord)) {
    //   // exclude = REL_CONTROLLERS
    //   // if (parentController === "ActionController::Base") {
    //   // 	//@todo provide rails online doc link
    //   // 	return Promise.reject(missingToolMsg + 'godef');
    //   // }
    //   let filePath = getParentControllerFilePathByDocument(
    //     document,
    //     lineStartToWord
    //   );
    //   definitionInformation.file = filePath;
    // } else
    if (constants_1.PATTERNS.FUNCTION_DECLARATON.test(lineStartToWord) &&
        !constants_1.PATTERNS.PARAMS_DECLARATION.test(word)) {
        const sameModuleControllerSub = path.dirname(vscode.workspace
            .asRelativePath(document.fileName)
            .substring(constants_1.REL_CONTROLLERS.length + 1)), filePath = path.join(constants_1.REL_VIEWS, sameModuleControllerSub, path.basename(document.fileName).replace(/_controller\.rb$/, ''), word + '.*'), upperText = document.getText(new vscode.Range(new vscode.Position(0, 0), position)), isPrivateMethod = /\s*private/.test(upperText);
        if (isPrivateMethod) {
            return Promise.resolve(null);
        }
        definitionInformation.file = filePath;
    }
    else if (constants_1.PATTERNS.INCLUDE_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = getConcernsFilePath(lineStartToWord, constants_1.FileType.ControllerConcerns);
        // } else if (PATTERNS.CAPITALIZED.test(word)) {
        //   //lib or model combination
        //   return getLibOrModelFilePath(lineStartToWord, word);
    }
    else if (constants_1.PATTERNS.PARAMS_DECLARATION.test(word)) {
        const filePath = document.fileName, line = document
            .getText()
            .split('\n')
            .findIndex((line) => new RegExp('^def\\s+' + word + SYMBOL_END).test(line.trim()));
        definitionInformation.file = filePath;
        definitionInformation.line = line;
    }
    else if (constants_1.PATTERNS.LAYOUT_DECLARATION.test(lineStartToWord)) {
        const layoutPath = constants_1.PATTERNS.LAYOUT_MATCH.exec(lineStartToWord)[2];
        definitionInformation.file = path.join(constants_1.REL_LAYOUTS, layoutPath + '.*');
    }
    else if (constants_1.PATTERNS.RENDER_DECLARATION.test(lineStartToWord) ||
        constants_1.PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = findViews(document, position, word, lineStartToWord);
    }
    else if (constants_1.PATTERNS.CONTROLLER_FILTERS.test(lineStartToWord)) {
        const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = inflection.camelize(fileNameWithoutSuffix);
        return findFunctionOrClassByClassName(document, position, word, controllerName);
    }
    else if (constants_1.PATTERNS.HELPER_METHODS.test(lineStartToWord)) {
        // @todo find in app/helpers
        const fileNameWithoutSuffix = path.parse(document.fileName).name, controllerName = inflection.camelize(fileNameWithoutSuffix);
        return findFunctionOrClassByClassName(document, position, word, controllerName);
    }
    else {
        return findLocationByWord(document, position, word, lineStartToWord);
    }
    const promise = new Promise(definitionResolver(document, definitionInformation));
    return promise;
}
exports.controllerDefinitionLocation = controllerDefinitionLocation;
/**
 *
 * @param relpath
 * @param line
 * @param fileType
 * @return relative file path
 */
function getSymbolPath(relpath, line, fileType) {
    console.log(`getSymbolPath`, arguments);
    let filePath = '';
    const [currentClassRaw, parentClassRaw] = line.split('<'), currentClass = currentClassRaw.trim(), parentClass = parentClassRaw.trim(), relPath = constants_1.FileTypeRelPath.get(fileType);
    if (currentClass.includes('::') && !parentClass.includes('::')) {
        return path.join(relPath, utils_1.wordsToPath(parentClass) + '.rb');
    }
    const parent = parentClass.trim(), sameModuleSub = path.dirname(relpath.substring(relPath.length + 1)), seq = parent
        .split('::')
        .map(utils_1.wordsToPath)
        .filter((v) => v !== ''), sub = !parent.includes('::')
        ? sameModuleSub
        : seq.slice(0, -1).join(path.sep), name = seq[seq.length - 1];
    filePath = path.join(relPath, sub, name + '.rb');
    console.log(`getSymbolPath return`, filePath);
    return filePath;
}
exports.getSymbolPath = getSymbolPath;
/**
 *
 * @param entryDocument
 * @param line
 * @return parent controller relative path
 */
async function getParentControllerFilePathByDocument(entryDocument, line) {
    console.log(`getParentControllerFilePathByDocument`, arguments);
    const relPath = vscode.workspace.asRelativePath(entryDocument.fileName), filePath = getSymbolPath(relPath, line, constants_1.FileType.Controller);
    console.log(`getParentControllerFilePathByDocument returns`, filePath);
    return Promise.resolve(utils_1.findFiles(entryDocument, filePath, null, 1).then((uris) => {
        if (uris.length !== 0) {
            return filePath;
        }
        else {
            return '';
        }
    }, (e) => e));
}
exports.getParentControllerFilePathByDocument = getParentControllerFilePathByDocument;
async function getFunctionOrClassInfoInFile(fileAbsPath, reg) {
    console.log(`getFunctionOrClassInfoInFile`, fileAbsPath, reg.toString());
    const definitionInformation = {
        file: null,
        line: -1,
        column: 0,
    };
    const exists = util_1.promisify(fs.exists);
    const existed = await exists(path.normalize(fileAbsPath));
    if (!existed) {
        return Promise.reject();
    }
    const fileStream = fs.createReadStream(path.normalize(fileAbsPath));
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
    });
    let lineNumber = 0, classDeclaration, lineIndex = -1;
    for await (const lineText of rl) {
        if (constants_1.PATTERNS.CLASS_INHERIT_DECLARATION.test(lineText)) {
            classDeclaration = lineText;
        }
        if (reg.test(lineText)) {
            lineIndex = lineNumber;
            definitionInformation.file = fileAbsPath;
            definitionInformation.line = lineIndex;
            definitionInformation.column = lineText.length;
            break;
        }
        lineNumber++;
    }
    console.log(`getFunctionOrClassInfoInFile return`, JSON.stringify(definitionInformation), classDeclaration);
    if (!definitionInformation.file) {
        return Promise.reject();
    }
    return [definitionInformation, classDeclaration];
}
exports.getFunctionOrClassInfoInFile = getFunctionOrClassInfoInFile;
async function findFunctionOrClassByClassNameInFile(fileAbsPath, reg) {
    const root = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(fileAbsPath))
        .uri.fsPath;
    console.log(`findFunctionOrClassByClassNameInFile`, fileAbsPath, reg.toString());
    // @todo find in included moduels
    let definitionInformation, classDeclaration;
    try {
        [
            definitionInformation,
            classDeclaration,
        ] = await getFunctionOrClassInfoInFile(fileAbsPath, reg);
    }
    catch (e) {
        return Promise.reject();
    }
    let lineIndex = definitionInformation.line;
    while (-1 === lineIndex) {
        const [, symbol] = classDeclaration.split('<');
        console.log('findFunctionOrClassByClassNameInFile symbol', symbol);
        const parentController = symbol.trim();
        const filePath = getSymbolPath(vscode.workspace.asRelativePath(fileAbsPath), parentController, constants_1.FileType.Controller);
        const fileAbsPath2 = path.join(root, filePath);
        try {
            [
                definitionInformation,
                classDeclaration,
            ] = await getFunctionOrClassInfoInFile(fileAbsPath2, reg);
        }
        catch (e) {
            return Promise.reject();
        }
        lineIndex = definitionInformation.line;
    }
    if (-1 !== lineIndex) {
        console.log('findFunctionOrClassByClassNameInFile return', JSON.stringify(definitionInformation));
        return definitionInformation;
    }
    else {
        return Promise.reject();
    }
}
exports.findFunctionOrClassByClassNameInFile = findFunctionOrClassByClassNameInFile;
async function findFunctionOrClassByClassName(entryDocument, position, funcOrClass, clasName) {
    console.log(`findFunctionOrClassByClassName`, arguments);
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    }, lines = entryDocument.getText().split('\n'), regPrefix = constants_1.PATTERNS.CAPITALIZED.test(funcOrClass)
        ? 'class\\s+'
        : 'def\\s+', reg = new RegExp(regPrefix + funcOrClass + '(?![A-Za-z0-9_])'), lineIndex = lines.findIndex((line) => reg.test(line.trim()));
    if (-1 !== lineIndex) {
        // same file
        definitionInformation.file = entryDocument.uri.fsPath;
        definitionInformation.line = lineIndex;
        definitionInformation.column = lines[lineIndex].length;
        return Promise.resolve(definitionInformation);
    }
    else {
        const beforeRange = new vscode.Range(new vscode.Position(0, 0), position), beforeText = entryDocument.getText(beforeRange), beforeLines = beforeText.split('\n');
        const line = beforeLines.find((line) => new RegExp('^class\\s+.*' + clasName + SYMBOL_END).test(line.trim()));
        if (!line) {
            return Promise.reject('');
        }
        const filePath = await getParentControllerFilePathByDocument(entryDocument, line);
        console.log('filePath', filePath);
        if (!filePath) {
            return Promise.reject();
        }
        const root = vscode.workspace.getWorkspaceFolder(entryDocument.uri).uri
            .path;
        const fileAbsPath = vscode.Uri.file(path.join(root, filePath)).path;
        return findFunctionOrClassByClassNameInFile(fileAbsPath, reg);
    }
}
exports.findFunctionOrClassByClassName = findFunctionOrClassByClassName;
function modelDefinitionLocation(document, position, word, lineStartToWord) {
    console.log(`modelDefinitionLocation`, JSON.stringify(position), word, lineStartToWord);
    const definitionInformation = {
        file: null,
        line: 0,
        column: 0,
    };
    const reg = new RegExp('(^has_one|^has_many|^has_and_belongs_to_many|^belongs_to)\\s+:' + word);
    if (reg.test(lineStartToWord)) {
        const name = inflection.singularize(word);
        definitionInformation.file = path.join(constants_1.REL_MODELS, '**', name + '.rb');
    }
    else if (constants_1.PATTERNS.INCLUDE_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = getConcernsFilePath(lineStartToWord, constants_1.FileType.ModelConcerns);
    }
    else if (constants_1.PATTERNS.CAPITALIZED.test(word)) {
        return getLibOrModelFilePath(document, lineStartToWord, word);
    }
    else if (constants_1.PATTERNS.RENDER_DECLARATION.test(lineStartToWord) ||
        constants_1.PATTERNS.RENDER_TO_STRING_DECLARATION.test(lineStartToWord)) {
        definitionInformation.file = findViews(document, position, word, lineStartToWord);
    }
    else {
        return findLocationByWord(document, position, word, lineStartToWord);
    }
    const promise = new Promise(definitionResolver(document, definitionInformation));
    return promise;
}
exports.modelDefinitionLocation = modelDefinitionLocation;
const FileTypeHandlers = new Map([
    [constants_1.FileType.Controller, controllerDefinitionLocation],
    [constants_1.FileType.Helper, controllerDefinitionLocation],
    [constants_1.FileType.Model, modelDefinitionLocation],
]);
function definitionResolver(document, definitionInformation, exclude = null, maxNum = null) {
    return (resolve, reject) => {
        const findPath = path.isAbsolute(definitionInformation.file)
            ? vscode.workspace.asRelativePath(definitionInformation.file)
            : definitionInformation.file;
        utils_1.findFiles(document, findPath).then((uris) => {
            if (!uris.length) {
                reject(missingFilelMsg + definitionInformation.file);
            }
            else if (uris.length === 1) {
                definitionInformation.file = uris[0].fsPath;
                resolve(definitionInformation);
            }
            else {
                const relativeFileName = vscode.workspace.asRelativePath(document.fileName), rh = new rails_helper_1.RailsHelper(document, relativeFileName, null);
                rh.showQuickPick(uris.map((uri) => vscode.workspace.asRelativePath(uri)));
                resolve(null);
            }
        }, () => {
            reject(missingFilelMsg + definitionInformation.file);
        });
    };
}
exports.definitionResolver = definitionResolver;
function definitionLocation(document, position, goConfig, token) {
    console.log('definitionLocation', arguments);
    // let context: vscode.ExtensionContext = this;
    if (position.line < 0) {
        return Promise.resolve(null);
    }
    const wordRange = document.getWordRangeAtPosition(position);
    if (!wordRange) {
        return Promise.resolve(null);
    }
    const lineText = document.lineAt(position.line).text.trim();
    const lineStartToWord = document
        .getText(new vscode.Range(new vscode.Position(position.line, 0), wordRange.end))
        .trim();
    const word = document.getText(wordRange);
    //   context.logger.debug(word);
    if (lineText.startsWith('//') || word.match(/^\d+.?\d+$/)) {
        return Promise.resolve(null);
    }
    if (!goConfig) {
        goConfig = vscode.workspace.getConfiguration('rails');
    }
    const symbol = new RegExp('(((::)?[A-Za-z]+)*(::)?' + word + ')').exec(lineStartToWord)[1];
    if (rails_1.RAILS.prefix(symbol.toLowerCase()).isProper ||
        ruby_1.RUBY.prefix(symbol.toLowerCase()).isProper) {
        console.log('rails symbols:' + symbol);
        return Promise.resolve(null);
    }
    const fileType = utils_1.dectFileType(document.fileName);
    if (constants_1.FileType.Unkown === fileType) {
        return Promise.resolve(null);
    }
    // let exclude;
    const handle = FileTypeHandlers.get(fileType);
    if (!handle) {
        return Promise.resolve(null);
    }
    return handle(document, position, word, lineStartToWord);
}
exports.definitionLocation = definitionLocation;
class RailsDefinitionProvider {
    //   private context: vscode.ExtensionContext;
    constructor(
    // context: vscode.ExtensionContext,
    goConfig) {
        this.goConfig = null;
        this.goConfig = goConfig;
        // this.context = context;
    }
    provideDefinition(document, position, token) {
        return definitionLocation(document, position, this.goConfig, token).then((definitionInfo) => {
            if (definitionInfo === null || definitionInfo.file === null)
                return null;
            if (definitionInfo.line < 0) {
                return null;
            }
            const definitionResource = vscode.Uri.file(definitionInfo.file);
            const pos = new vscode.Position(definitionInfo.line, definitionInfo.column || 0 // required here otherwise raise "Invalid arguments"
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
                    return Promise.reject(err);
                }
            }
            return Promise.resolve(null);
        });
    }
}
exports.RailsDefinitionProvider = RailsDefinitionProvider;
