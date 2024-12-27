"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBoardSolved = isBoardSolved;
function isBoardSolved(board) {
    var _a;
    const rowCount = board.length;
    const colCount = board[0].length;
    // Validate rows
    for (let row = 1; row < rowCount; row++) {
        const targetSum = board[row][0];
        if (targetSum === null)
            continue;
        const actualSum = board[row]
            .slice(1)
            .reduce((sum, cell) => sum + (cell !== null && cell !== void 0 ? cell : 0), 0);
        if (actualSum !== targetSum) {
            return false;
        }
    }
    // Validate columns
    for (let col = 1; col < colCount; col++) {
        const targetSum = board[0][col];
        if (targetSum === null)
            continue;
        let actualSum = 0;
        for (let row = 1; row < rowCount; row++) {
            actualSum += (_a = board[row][col]) !== null && _a !== void 0 ? _a : 0;
        }
        if (actualSum !== targetSum) {
            return false;
        }
    }
    return true;
}
