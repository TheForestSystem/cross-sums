export function isBoardSolved(board: (number | null)[][]): boolean {
  const rowCount = board.length;
  const colCount = board[0].length;

  // Validate rows
  for (let row = 1; row < rowCount; row++) {
    const targetSum = board[row][0];
    if (targetSum === null) continue;

    const actualSum = board[row]
      .slice(1)
      .reduce((sum: number, cell) => sum + (cell ?? 0), 0);

    if (actualSum !== targetSum) {
      return false;
    }
  }

  // Validate columns
  for (let col = 1; col < colCount; col++) {
    const targetSum = board[0][col];
    if (targetSum === null) continue;

    let actualSum = 0;
    for (let row = 1; row < rowCount; row++) {
      actualSum += board[row][col] ?? 0;
    }

    if (actualSum !== targetSum) {
      return false;
    }
  }

  return true;
}
