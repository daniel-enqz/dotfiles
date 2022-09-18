"use strict";
//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'assert' provides assertion methods from node
const assert = require("assert");
// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
const vscode = require("vscode");
const settings_1 = require("../src/trailing-spaces/settings");
const path = require("path");
const fs = require("fs");
describe("Extension Tests", () => {
    let testFileUri = vscode.Uri.file(path.join(__dirname, "files/sample.js"));
    let testDocument;
    let testEditor;
    let settings = settings_1.Settings.getInstance();
    before((done) => {
        vscode.workspace.openTextDocument(testFileUri).then((document) => {
            testDocument = document;
            vscode.window.showTextDocument(testDocument).then((editor) => {
                testEditor = editor;
                done();
            });
        });
    });
    describe("testForDeleteTrailingSpaces", () => {
        it("should delete all trailing spaces", (done) => {
            vscode.workspace.getConfiguration;
            assertDeleteTrailingSpaces(testEditor, './files/delete_all_trailing_spaces.js', done);
        });
        it("should not delete trailing spaces in empty lines", (done) => {
            settings.includeEmptyLines = false;
            assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_exclude_empty_line.js', done);
        });
        it("should delete but not highlight trailing spaces in the current line", (done) => {
            settings.highlightCurrentLine = false;
            testEditor.selections = [new vscode.Selection(new vscode.Position(1, 3), new vscode.Position(1, 3))];
            assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_exclude_current_line_highlight.js', done);
        });
        it("should not delete trailing spaces in the current line if line is empty", (done) => {
            settings.includeEmptyLines = false;
            testEditor.selections = [new vscode.Selection(new vscode.Position(11, 3), new vscode.Position(11, 3))];
            assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_exclude_empty_line_when_exclude_current_line_highlight.js', done);
        });
        it("should not delete trailing spaces when language is set in syntaxIgnore", (done) => {
            settings.languagesToIgnore[testEditor.document.languageId] = true;
            assertDeleteTrailingSpaces(testEditor, './files/should_not_delete_spaces.js', done);
        });
        it("should not delete trailing spaces when file scheme is set in schemeIgnore", (done) => {
            settings.schemesToIgnore[testEditor.document.uri.scheme] = true;
            assertDeleteTrailingSpaces(testEditor, './files/should_not_delete_spaces.js', done);
        });
        it("should delete all trailing spaces including blank lines when regex is [\\s]+", (done) => {
            settings.regexp = "[\\s]+";
            assertDeleteTrailingSpaces(testEditor, './files/delete_all_trailing_spaces_including_blank_lines.js', done);
        });
        it("should only delete trailing spaces in modified lines only", (done) => {
            settings.deleteModifiedLinesOnly = true;
            testEditor.edit((editBuilder) => {
                editBuilder.insert(new vscode.Position(11, 2), "test");
                editBuilder.delete(new vscode.Range(1, 0, 1, 3));
            }).then((flag) => {
                assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_in_modified_lines.js', done);
            });
        });
    });
    afterEach((done) => {
        console.log("Reverting changes");
        settings.resetToDefaults();
        vscode.commands.executeCommand("workbench.action.files.revert").then(() => done());
    });
});
let assertDeleteTrailingSpaces = (editor, expectedOutputFile, done) => {
    let outputFile = fs.readFileSync(path.join(__dirname, expectedOutputFile), "utf-8");
    vscode.commands.executeCommand("trailing-spaces.deleteTrailingSpaces").then(() => {
        assert.equal(editor.document.getText(), outputFile);
        done();
    });
};
//# sourceMappingURL=extension.test.js.map