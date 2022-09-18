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
exports.viewDoc = void 0;
const vscode = __importStar(require("vscode"));
const path = __importStar(require("path"));
const axios_1 = __importDefault(require("axios"));
const rails_1 = require("./symbols/rails");
const ruby_1 = require("./symbols/ruby");
const utils_1 = require("./utils");
// Track currently webview panel
// var currentPanel: vscode.WebviewPanel | undefined = undefined;
function injectBase(html, base) {
    const policy = `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src vscode-resource: http:; script-src vscode-resource: http: 'unsafe-inline' ; style-src vscode-resource: http: 'unsafe-inline';">`;
    const _base = path.dirname(base) + '/';
    // Remove any <base> elements inside <head>
    let _html = html.replace(/(<[^>/]*head[^>]*>)[\s\S]*?(<[^>/]*base[^>]*>)[\s\S]*?(<[^>]*head[^>]*>)/gim, '$1 $3');
    // Add <base> just before </head>
    _html = _html.replace(/<head>/gim, `<head><base href="${_base}">\n${policy}\n<style> body{margin:20px;}</style>`);
    return _html;
}
const CancelToken = axios_1.default.CancelToken;
const source = CancelToken.source();
function showSide(symbol, html, context) {
    // const columnToShowIn = vscode.window.activeTextEditor
    //   ? vscode.window.activeTextEditor.viewColumn
    //   : undefined;
    // if (currentPanel) {
    //   // If we already have a panel, show it in the target column
    //   currentPanel.webview.html = html;
    //   currentPanel.title = `Document ${symbol}`;
    //   currentPanel.reveal(columnToShowIn);
    // } else {
    const currentPanel = vscode.window.createWebviewPanel('Document', `Document ${symbol}`, vscode.ViewColumn.Two, {
        // Enable scripts in the webview
        enableScripts: true,
        retainContextWhenHidden: true,
    });
    currentPanel.webview.html = html;
    // Reset when the current panel is closed
    // currentPanel.onDidDispose(
    //   () => {
    //     currentPanel = undefined;
    //     source.cancel('request canceled as WebviewPanel Disposed.');
    //   },
    //   null,
    //   context.subscriptions
    // );
}
function doRequest(_url, symbol) {
    const request = axios_1.default({
        url: _url,
        timeout: 5e3,
        cancelToken: source.token,
    })
        .then((r) => {
        if (typeof r.data === 'string') {
            const html = injectBase(r.data, _url);
            showSide(symbol, html, this);
        }
        else {
            const html = 'No valid response content.';
            showSide(symbol, html, this);
        }
    })
        .catch((err) => {
        console.error(err);
        showSide(symbol, err.toString(), this);
    });
}
function viewDoc() {
    const document = vscode.window.activeTextEditor.document;
    const position = vscode.window.activeTextEditor.selection.active;
    const symbol = utils_1.getSymbol(document, position);
    if (typeof symbol === 'undefined') {
        showSide('word range not found', "Can't find word range from your active editor selection.", this);
        return;
    }
    let endpoint = '';
    const lowerSymbol = symbol.toLowerCase();
    const isRailsSymbol = rails_1.RAILS.prefix(lowerSymbol).prefix.length;
    const isRubySymbol = ruby_1.RUBY.prefix(lowerSymbol).prefix.length;
    console.log(`symbol:${lowerSymbol} isRailsSymbol:${isRailsSymbol},isRubySymbol:${isRubySymbol}`);
    if (symbol && (isRailsSymbol || isRubySymbol)) {
        endpoint = symbol.replace('::', '/');
    }
    else {
        showSide('symbol not found', `symbol:${symbol} neither ruby nor rails symbol`, this);
        return;
    }
    console.log(`symbol:${lowerSymbol},endpoint:${endpoint}`);
    if (endpoint === null) {
        return;
    }
    let url = '';
    if (isRailsSymbol > isRubySymbol) {
        url = `https://api.rubyonrails.org/classes/${endpoint}.html`;
    }
    else if (isRubySymbol) {
        url = `https://docs.rubydocs.org/ruby-${ruby_1.VERSION.replace(/\./g, '-')}/classes/${endpoint}.html`;
    }
    else {
        showSide(symbol, 'No matched symbol on extension side.', this);
        return;
    }
    console.log(`doc url:${url}`);
    // let info = vscode.window.showInformationMessage("Rails:Document-loading...")
    doRequest.call(this, url, symbol);
}
exports.viewDoc = viewDoc;
