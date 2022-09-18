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
const settings_1 = require("../../trailing-spaces/settings");
const path = require("path");
const mocha_1 = require("mocha");
const fs = require("fs");
(0, mocha_1.describe)("Extension Tests", () => {
    let settings = settings_1.Settings.getInstance();
    async function loadTestFileIntoEditor(testFileName, done) {
        let testFileUri = vscode.Uri.file(path.join(__dirname, testFileName));
        return vscode.workspace.openTextDocument(testFileUri)
            .then((document) => vscode.window.showTextDocument(document), (reason) => done(reason));
    }
    (0, mocha_1.describe)("testForDeleteTrailingSpaces", () => {
        (0, mocha_1.it)("should delete all trailing spaces", (done) => {
            loadTestFileIntoEditor('./files/delete_all_trailing_spaces_sample.js', done)
                .then((testEditor) => {
                assertDeleteTrailingSpaces(testEditor, './files/delete_all_trailing_spaces_result.js', done);
            });
        });
        (0, mocha_1.it)("should not delete trailing spaces in empty lines", (done) => {
            settings.includeEmptyLines = false;
            loadTestFileIntoEditor('./files/delete_trailing_spaces_exclude_empty_line_sample.js', done)
                .then((testEditor) => {
                assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_exclude_empty_line_result.js', done);
            });
        });
        (0, mocha_1.it)("should delete but not highlight trailing spaces in the current line", (done) => {
            settings.highlightCurrentLine = false;
            loadTestFileIntoEditor('./files/delete_trailing_spaces_exclude_current_line_highlight_sample.js', done)
                .then((testEditor) => {
                testEditor.selections = [new vscode.Selection(new vscode.Position(1, 3), new vscode.Position(1, 3))];
                assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_exclude_current_line_highlight_result.js', done);
            });
        });
        (0, mocha_1.it)("should not delete trailing spaces in the current line if line is empty", (done) => {
            settings.includeEmptyLines = false;
            loadTestFileIntoEditor('./files/delete_trailing_spaces_exclude_empty_line_when_exclude_current_line_highlight_sample.js', done)
                .then((testEditor) => {
                testEditor.selections = [new vscode.Selection(new vscode.Position(11, 3), new vscode.Position(11, 3))];
                assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_exclude_empty_line_when_exclude_current_line_highlight_result.js', done);
            });
        });
        (0, mocha_1.it)("should not delete trailing spaces when language is set in syntaxIgnore", (done) => {
            loadTestFileIntoEditor('./files/should_not_delete_spaces_sample.js', done)
                .then((testEditor) => {
                settings.languagesToIgnore[testEditor.document.languageId] = true;
                assertDeleteTrailingSpaces(testEditor, './files/should_not_delete_spaces_result.js', done);
            });
        });
        (0, mocha_1.it)("should not delete trailing spaces when file scheme is set in schemeIgnore", (done) => {
            loadTestFileIntoEditor('./files/should_not_delete_spaces_sample.js', done)
                .then((testEditor) => {
                settings.schemesToIgnore[testEditor.document.uri.scheme] = true;
                assertDeleteTrailingSpaces(testEditor, './files/should_not_delete_spaces_result.js', done);
            });
        });
        (0, mocha_1.it)("should delete all trailing spaces including blank lines when regex is [\\s]+", (done) => {
            loadTestFileIntoEditor('./files/delete_all_trailing_spaces_including_blank_lines_sample.js', done)
                .then((testEditor) => {
                settings.regexp = "[\\s]+";
                assertDeleteTrailingSpaces(testEditor, './files/delete_all_trailing_spaces_including_blank_lines_result.js', done);
            });
        });
        (0, mocha_1.it)("should only delete trailing spaces in modified lines only", (done) => {
            loadTestFileIntoEditor('./files/delete_trailing_spaces_in_modified_lines_sample.js', done)
                .then((testEditor) => {
                settings.deleteModifiedLinesOnly = true;
                testEditor.edit((editBuilder) => {
                    editBuilder.insert(new vscode.Position(11, 2), "test");
                    editBuilder.delete(new vscode.Range(1, 0, 1, 3));
                }).then((flag) => {
                    assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_in_modified_lines_result.js', done);
                });
            });
        });
        (0, mocha_1.it)("should delete trailing spaces in all consecutive modified lines only", (done) => {
            loadTestFileIntoEditor('./files/delete_trailing_spaces_in_consecutive_modified_lines_sample.js', done)
                .then((testEditor) => {
                settings.deleteModifiedLinesOnly = true;
                testEditor.edit((editBuilder) => {
                    editBuilder.insert(new vscode.Position(11, 2), "test");
                    editBuilder.insert(new vscode.Position(12, 2), "test");
                    editBuilder.delete(new vscode.Range(1, 0, 1, 3));
                }).then((flag) => {
                    assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_in_consecutive_modified_lines_result.js', done);
                });
            });
        });
        (0, mocha_1.it)("should delete trailing spaces in newly inserted and modified lines only", (done) => {
            loadTestFileIntoEditor('./files/delete_trailing_spaces_in_new_and_modified_lines_sample.js', done)
                .then((testEditor) => {
                settings.deleteModifiedLinesOnly = true;
                testEditor.edit((editBuilder) => {
                    editBuilder.insert(new vscode.Position(11, 2), "test");
                    editBuilder.insert(new vscode.Position(12, 2), "test   \n");
                    editBuilder.delete(new vscode.Range(1, 0, 1, 3));
                }).then((flag) => {
                    assertDeleteTrailingSpaces(testEditor, './files/delete_trailing_spaces_in_new_and_modified_lines_result.js', done);
                });
            });
        });
    });
    (0, mocha_1.afterEach)((done) => {
        settings.resetToDefaults();
        vscode.commands.executeCommand("workbench.action.closeActiveEditor").then(() => done());
    });
});
let assertDeleteTrailingSpaces = (editor, expectedOutputFile, done) => {
    let outputFile = fs.readFileSync(path.join(__dirname, expectedOutputFile), "utf-8");
    vscode.commands.executeCommand("trailing-spaces.deleteTrailingSpaces").then(() => {
        try {
            assert.equal(editor.document.getText(), outputFile);
        }
        catch (err) {
            done(err);
            return;
        }
        done();
        return;
    });
};
//# sourceMappingURL=extension.test.js.map