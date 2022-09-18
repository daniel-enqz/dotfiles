'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Settings = void 0;
const vscode = require("vscode");
const logger_1 = require("./logger");
class Settings {
    constructor() {
        if (!Settings.instance) {
            Settings.instance = this;
            this.logger = logger_1.Logger.getInstance();
            this.refreshSettings();
        }
    }
    static getInstance() {
        return Settings.instance;
    }
    refreshSettings() {
        let config = vscode.workspace.getConfiguration('trailing-spaces');
        this.logLevel = logger_1.LogLevel[this.getOrError(config, 'logLevel')];
        this.includeEmptyLines = this.getOrError(config, 'includeEmptyLines');
        this.highlightCurrentLine = this.getOrError(config, 'highlightCurrentLine');
        this.regexp = this.getOrError(config, 'regexp');
        this.liveMatching = this.getOrError(config, 'liveMatching');
        this.deleteModifiedLinesOnly = this.getOrError(config, 'deleteModifiedLinesOnly');
        this.languagesToIgnore = this.getMapFromStringArray(this.getOrError(config, 'syntaxIgnore'));
        this.schemesToIgnore = this.getMapFromStringArray(this.getOrError(config, 'schemeIgnore'));
        this.trimOnSave = this.getOrError(config, 'trimOnSave');
        this.showStatusBarMessage = this.getOrError(config, 'showStatusBarMessage');
        this.setTextEditorDecorationType(config);
        this.logger.setLogLevel(this.logLevel);
        this.logger.setPrefix('Trailing Spaces');
        this.logger.log('Configuration loaded');
    }
    resetToDefaults() {
        let config = vscode.workspace.getConfiguration('trailing-spaces');
        config.update('logLevel', undefined, true);
        config.update('includeEmptyLines', undefined, true);
        config.update('highlightCurrentLine', undefined, true);
        config.update('regexp', undefined, true);
        config.update('liveMatching', undefined, true);
        config.update('deleteModifiedLinesOnly', undefined, true);
        config.update('syntaxIgnore', undefined, true);
        config.update('schemeIgnore', undefined, true);
        config.update('trimOnSave', undefined, true);
        config.update('showStatusBarMessage', undefined, true);
        config.update('backgroundColor', undefined, true);
        config.update('borderColor', undefined, true);
        this.refreshSettings();
    }
    getMapFromStringArray(array) {
        let map = {};
        array.forEach((element) => {
            map[element] = true;
        });
        return map;
    }
    setTextEditorDecorationType(config) {
        let newBackgroundColor = this.getOrError(config, 'backgroundColor');
        let newBorderColor = this.getOrError(config, 'borderColor');
        if (newBackgroundColor !== this.backgroundColor || newBorderColor !== this.borderColor) {
            this.backgroundColor = newBackgroundColor;
            this.borderColor = newBorderColor;
            if (this.textEditorDecorationType) {
                // if an old decoration already exists, dispose it prior to creating a new one
                this.textEditorDecorationType.dispose();
            }
            this.textEditorDecorationType = vscode.window.createTextEditorDecorationType({
                borderRadius: "3px",
                borderWidth: "1px",
                borderStyle: "solid",
                backgroundColor: newBackgroundColor,
                borderColor: newBorderColor
            });
        }
    }
    getOrError(config, key) {
        let value = config.get(key);
        if (value === undefined) {
            throw new Error(`Did not expect undefined config: ${key}`);
        }
        else {
            return value;
        }
    }
}
exports.Settings = Settings;
Settings.instance = new Settings();
//# sourceMappingURL=settings.js.map