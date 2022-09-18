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
exports.RailsHelper = void 0;
const vscode = __importStar(require("vscode"));
const path_1 = require("path");
const constants_1 = require("./constants");
const inflection = __importStar(require("inflection2"));
const utils_1 = require("./utils");
class RailsHelper {
    constructor(document, relativeFileName, line) {
        this.patterns = [
            path_1.join(constants_1.REL_CONTROLLERS, 'PTN', '*'),
            path_1.join(constants_1.REL_CONTROLLERS, 'PTN*'),
            path_1.join(constants_1.REL_MODELS, 'SINGULARIZE', '*'),
            path_1.join(constants_1.REL_MODELS, 'SINGULARIZE*'),
            path_1.join(constants_1.REL_MODELS, 'BASENAME_SINGULARIZE', '*'),
            path_1.join(constants_1.REL_MODELS, 'BASENAME_SINGULARIZE*'),
            path_1.join(constants_1.REL_VIEWS, 'PTN', '*'),
            path_1.join(constants_1.REL_VIEWS, 'PTN*'),
            path_1.join(constants_1.REL_LAYOUTS, 'PTN', '*'),
            path_1.join(constants_1.REL_LAYOUTS, 'PTN*'),
            path_1.join(constants_1.REL_HELPERS, 'PTN', '*'),
            path_1.join(constants_1.REL_HELPERS, 'PTN*'),
            path_1.join(constants_1.REL_JAVASCRIPTS, 'PTN', '*'),
            path_1.join(constants_1.REL_JAVASCRIPTS, 'PTN*'),
            path_1.join(constants_1.REL_STYLESHEETS, 'PTN', '*'),
            path_1.join(constants_1.REL_STYLESHEETS, 'PTN*'),
        ];
        this.document = document;
        this.relativeFileName = relativeFileName;
        this.fileName = path_1.basename(relativeFileName);
        const filePath = path_1.dirname(relativeFileName);
        this.line = line;
        this.initPatten(filePath);
    }
    searchPaths() {
        const res = [];
        this.patterns.forEach((e) => {
            let p = e.replace('PTN', this.filePatten.toString());
            p = p.replace('BASENAME_SINGULARIZE', inflection.singularize(path_1.basename(this.filePatten.toString())));
            p = p.replace('SINGULARIZE', inflection.singularize(this.filePatten.toString()));
            res.push(p);
        });
        return res;
    }
    initPatten(filePath) {
        this.filePatten = null;
        this.targetFile = null;
        const fileType = utils_1.dectFileType(filePath), prefix = filePath.substring(constants_1.FileTypeRelPath.get(fileType).length + 1);
        switch (fileType) {
            case constants_1.FileType.Controller:
                this.filePatten = path_1.join(prefix, this.fileName.replace(/_controller\.rb$/, ''));
                if (this.line && /^def\s+/.test(this.line)) {
                    this.filePatten = path_1.join(this.filePatten, this.line.replace(/^def\s+/, ''));
                }
                break;
            case constants_1.FileType.Model:
                const filePatten = path_1.join(prefix, this.fileName.replace(/\.rb$/, ''));
                this.filePatten = inflection.pluralize(filePatten.toString());
                break;
            case constants_1.FileType.Layout:
                this.filePatten = path_1.join(prefix, this.fileName.replace(/\..*?\..*?$/, ''));
                break;
            case constants_1.FileType.View:
                this.filePatten = prefix;
                break;
            case constants_1.FileType.Helper:
                this.filePatten =
                    prefix === '' && this.fileName === 'application_helper.rb'
                        ? ''
                        : path_1.join(prefix, this.fileName.replace(/_helper\.rb$/, ''));
                break;
            case constants_1.FileType.Javascript:
                this.filePatten = path_1.join(prefix, this.fileName.replace(/\.js$/, '').replace(/\..*?\..*?$/, ''));
                break;
            case constants_1.FileType.StyleSheet:
                this.filePatten = path_1.join(prefix, this.fileName.replace(/\.css$/, '').replace(/\..*?\..*?$/, ''));
                break;
            case constants_1.FileType.Rspec:
                this.targetFile = path_1.join('app', prefix, this.fileName.replace('_spec.rb', '.rb'));
                break;
            case constants_1.FileType.Test:
                this.filePatten = path_1.join('app', prefix, this.fileName.replace('_test.rb', '.rb'));
                break;
        }
    }
    generateList(arr) {
        const ap = arr.map(async (cur) => {
            const res = await utils_1.findFiles(this.document, cur.toString(), null);
            return res
                .map((i) => {
                return vscode.workspace.asRelativePath(i);
            })
                .filter((v) => this.relativeFileName !== v);
        });
        return Promise.all(ap).then((lists) => {
            return utils_1.flatten(lists);
        });
    }
    showQuickPick(items) {
        const p = vscode.window.showQuickPick(items, {
            placeHolder: 'Select File',
            matchOnDetail: true,
        });
        p.then((value) => {
            if (!value)
                return;
            const rootPath = vscode.workspace.getWorkspaceFolder(this.document.uri)
                .uri.path;
            const fn = vscode.Uri.parse('file://' + path_1.join(rootPath, value));
            vscode.workspace.openTextDocument(fn).then((doc) => {
                return vscode.window.showTextDocument(doc);
            });
        });
    }
    showFileList() {
        if (this.filePatten != null) {
            const paths = this.searchPaths().slice();
            this.generateList(paths).then((v) => {
                this.showQuickPick(v);
            });
        }
        else if (this.targetFile != null) {
            this.generateList([this.targetFile]).then((v) => {
                this.showQuickPick(v);
            });
        }
    }
}
exports.RailsHelper = RailsHelper;
