'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModifiedLineNumbers = void 0;
const jsdiff = require("diff");
/**
 * Gets numbers of all the lines which have changed between the two strings.
 *
 * @export
 * @param {string} oldFile A string representing the old version of the file
 * @param {string} newFile A string representing the new version of the file
 * @returns {Set<number>} A set containing all line numbers which have been modified
 */
function getModifiedLineNumbers(oldFile, newFile) {
    let diffs = jsdiff.diffLines(oldFile, newFile);
    let lineNumber = 0;
    let editedLines = new Set();
    diffs.forEach(diff => {
        if (diff.added) {
            if (diff.count) {
                for (let i = 0; i < diff.count; i++) {
                    editedLines.add(lineNumber + i);
                }
            }
            else {
                editedLines.add(lineNumber);
            }
        }
        if (!diff.removed && diff.count) {
            lineNumber += diff.count;
        }
    });
    return editedLines;
}
exports.getModifiedLineNumbers = getModifiedLineNumbers;
//# sourceMappingURL=utils.js.map