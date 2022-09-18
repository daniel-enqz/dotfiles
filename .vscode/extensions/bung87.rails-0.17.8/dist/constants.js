"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VIEWS_PATTERNS = exports.PATTERNS = exports.FileTypeRelPath = exports.FileType = exports.REL_MODELS_CONCERNS = exports.REL_CONTROLLERS_CONCERNS = exports.REL_TEST = exports.REL_SPEC = exports.REL_STYLESHEETS = exports.REL_JAVASCRIPTS = exports.REL_HELPERS = exports.REL_LAYOUTS = exports.REL_VIEWS = exports.REL_MODELS = exports.REL_CONTROLLERS = void 0;
const path_1 = require("path");
exports.REL_CONTROLLERS = path_1.join('app', 'controllers');
exports.REL_MODELS = path_1.join('app', 'models');
exports.REL_VIEWS = path_1.join('app', 'views');
exports.REL_LAYOUTS = path_1.join('app', 'views', 'layouts');
exports.REL_HELPERS = path_1.join('app', 'helpers');
exports.REL_JAVASCRIPTS = path_1.join('app', 'assets', 'javascripts');
exports.REL_STYLESHEETS = path_1.join('app', 'assets', 'stylesheets');
exports.REL_SPEC = 'spec';
exports.REL_TEST = 'test';
exports.REL_CONTROLLERS_CONCERNS = path_1.join('app', 'controllers', 'concerns');
exports.REL_MODELS_CONCERNS = path_1.join('app', 'models', 'concerns');
var FileType;
(function (FileType) {
    FileType[FileType["Controller"] = 0] = "Controller";
    FileType[FileType["ControllerConcerns"] = 1] = "ControllerConcerns";
    FileType[FileType["Model"] = 2] = "Model";
    FileType[FileType["ModelConcerns"] = 3] = "ModelConcerns";
    FileType[FileType["Layout"] = 4] = "Layout";
    FileType[FileType["View"] = 5] = "View";
    FileType[FileType["Helper"] = 6] = "Helper";
    FileType[FileType["Javascript"] = 7] = "Javascript";
    FileType[FileType["StyleSheet"] = 8] = "StyleSheet";
    FileType[FileType["Rspec"] = 9] = "Rspec";
    FileType[FileType["Test"] = 10] = "Test";
    FileType[FileType["Unkown"] = 11] = "Unkown";
})(FileType = exports.FileType || (exports.FileType = {}));
exports.FileTypeRelPath = new Map([
    [FileType.Controller, exports.REL_CONTROLLERS],
    [FileType.ControllerConcerns, exports.REL_CONTROLLERS_CONCERNS],
    [FileType.Model, exports.REL_MODELS],
    [FileType.ModelConcerns, exports.REL_MODELS_CONCERNS],
    [FileType.Layout, exports.REL_LAYOUTS],
    [FileType.View, exports.REL_VIEWS],
    [FileType.Helper, exports.REL_HELPERS],
    [FileType.Javascript, exports.REL_JAVASCRIPTS],
    [FileType.StyleSheet, exports.REL_STYLESHEETS],
    [FileType.Rspec, exports.REL_SPEC],
    [FileType.Test, exports.REL_TEST],
]);
exports.PATTERNS = {
    CLASS_INHERIT_DECLARATION: /^class\s+[^<]+<\s+/,
    FUNCTION_DECLARATON: /^def\s+/,
    INCLUDE_DECLARATION: /^include\s+/,
    CAPITALIZED: /^[A-Z](?=[a-z])/,
    PARAMS_DECLARATION: /_params$/,
    LAYOUT_DECLARATION: /^layout\s+/,
    LAYOUT_MATCH: /^layout\s+(['":]?([A-Za-z\/0-9_]+)['"]?)/,
    RENDER_DECLARATION: /render[\(\s]/,
    RENDER_TO_STRING_DECLARATION: /render_to_string[\(\s]/,
    RENDER_MATCH: /([A-Za-z\/0-9_-]+(\.[A-Za-z0-9]+)*)/g,
    MODEL_RELATIONS: /^has_one|^has_many|^has_and_belongs_to_many|^belongs_to/,
    CONTROLLER_FILTERS: /^(skip_|prepend_)?(before|after|around)_(action|filter)/,
    HELPER_METHODS: /^helper_method/,
    CLASS_STATIC_METHOD_CALL: /(([A-Z][A-Za-z]+)\.[^\)]*)/,
};
exports.VIEWS_PATTERNS = {
    RENDER_PATTERN: /render/,
    RENDER_FUNC_PATTERN: /(escape_javascript|j)?[\s\(]render([\s\(]:([a-z]+)\s*=>\s*)?(["'])([^\4]+)\4/,
    RENDER_FUNC_PATTERN2: /(escape_javascript|j)?[\s\(]render([\s\(]([a-z]+):\s*)?(["'])([^\4]+)\4/,
};
