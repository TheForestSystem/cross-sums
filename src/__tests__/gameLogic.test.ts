import { isBoardSolved } from "../gameLogic";

describe("isBoardSolved", () => {
  it("should return false for an unsolved board", () => {
    const unsolvedBoard: (number | null)[][] = [
      [null, 17, 12, 2, 2, 2], // Row target sums
      [4, 4, 9, 1, 4, 2],
      [6, 6, 6, 9, 1, 4],
      [10, 4, 4, 9, 2, 4],
      [2, 9, 5, 1, 2, 2],
      [13, 9, 2, 2, 6, 9],
    ];
    expect(isBoardSolved(unsolvedBoard)).toBe(false);
  });

  it("should return true for a solved board", () => {
    const solvedBoard: (number | null)[][] = [
      [null, 17, 12, 2, 2, 2], // Column target sums
      [4, 4, null, null, null, null],
      [6, null, 6, null, null, null],
      [10, 4, 4, null, 2, null],
      [2, null, null, null, null, 2],
      [13, 9, 2, 2, null, null],
    ];

    expect(isBoardSolved(solvedBoard)).toBe(true);
  });
});
