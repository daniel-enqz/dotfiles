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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = exports.format = void 0;
const vscode = __importStar(require("vscode"));
const jsbeautify = __importStar(require("js-beautify"));
function format(document, range) {
    if (range === null) {
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        range = new vscode.Range(start, end);
    }
    const result = [];
    const content = document.getText(range);
    const formatted = beatify(content, document.languageId);
    const isFormatted = !!formatted && formatted !== content;
    if (isFormatted) {
        result.push(new vscode.TextEdit(range, formatted));
    }
    return result;
}
exports.format = format;
function beatify(documentContent, languageId) {
    let beatiFunc = null;
    switch (languageId) {
        case 'scss.erb':
            languageId = 'css';
            beatiFunc = jsbeautify.css;
        case 'css.erb':
            beatiFunc = jsbeautify.css;
            break;
        // case 'json':
        //     languageId = 'javascript';
        case 'js.erb':
            languageId = 'javascript';
            beatiFunc = jsbeautify.js;
            break;
        case 'html.erb':
            beatiFunc = jsbeautify.html;
            break;
        default:
            showMesage('Sorry, this language is not supported. Only support Javascript, CSS and HTML.');
            break;
    }
    if (!beatiFunc)
        return;
    let tabSize = null;
    const beutifyOptions = {};
    const prefix = languageId.split('.')[0];
    const config = vscode.workspace.getConfiguration('');
    try {
        tabSize = config[`[${prefix}`][`erb]`]['editor.tabSize'];
    }
    catch (e) {
        tabSize = vscode.workspace.getConfiguration('editor').get('tabSize');
    }
    if (tabSize != null) {
        beutifyOptions.indent_size = tabSize;
    }
    return beatiFunc(documentContent, beutifyOptions);
}
class Formatter {
    beautify() {
        // Create as needed
        const window = vscode.window;
        let range;
        // Get the current text editor
        const activeEditor = window.activeTextEditor;
        if (!activeEditor) {
            return;
        }
        const document = activeEditor.document;
        if (range === null) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
        }
        // var result: vscode.TextEdit[] = [];
        const content = document.getText(range);
        const formatted = beatify(content, document.languageId);
        const isFormatted = !!formatted && formatted !== content;
        if (isFormatted) {
            return activeEditor.edit((editor) => {
                const start = new vscode.Position(0, 0);
                const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
                range = new vscode.Range(start, end);
                return editor.replace(range, formatted);
            });
        }
    }
    registerBeautify(range) {
        // Create as needed
        const window = vscode.window;
        // Get the current text editor
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
        const document = editor.document;
        return format(document, range);
    }
    onSave(e) {
        const { document } = e;
        const docType = ['css.erb', 'scss.erb', 'html.erb'];
        if (docType.indexOf(document.languageId) === -1) {
            return;
        }
        let onSave = false;
        const prefix = document.languageId.split('.')[0];
        const conf = vscode.workspace.getConfiguration('rails.editor');
        let confPrefixFormatOnSave;
        try {
            confPrefixFormatOnSave =
                conf[`[${prefix}`][`erb]`]['editor.formatOnSave'];
        }
        catch (e) { }
        if (confPrefixFormatOnSave === false) {
            return;
        }
        const confFormatOnSave = conf.get('formatOnSave');
        if (confFormatOnSave === false) {
            return;
        }
        const config = vscode.workspace.getConfiguration('', e.document);
        try {
            onSave = config[`[${prefix}`][`erb]`]['editor.formatOnSave'];
        }
        catch (e) {
            onSave = vscode.workspace.getConfiguration('editor').get('formatOnSave');
        }
        if (!onSave) {
            return;
        }
        const start = new vscode.Position(0, 0);
        const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
        let range = new vscode.Range(start, end);
        // var result: vscode.TextEdit[] = [];
        const content = document.getText(range);
        const formatted = beatify(content, document.languageId);
        const isFormatted = !!formatted && formatted !== content;
        if (isFormatted) {
            const start = new vscode.Position(0, 0);
            const end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);
            range = new vscode.Range(start, end);
            const edit = vscode.TextEdit.replace(range, formatted);
            e.waitUntil(Promise.resolve([edit]));
        }
    }
}
exports.Formatter = Formatter;
function showMesage(msg) {
    vscode.window.showInformationMessage(msg);
}
