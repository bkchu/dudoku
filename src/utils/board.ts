import { Board, Piece } from "../models/client/board";
import { ServerBoard } from "../models/server/board";

export function transformServerToClientSudokuBoard(serverBoard: ServerBoard): Board {
  return serverBoard.reduce((acc, row) => [...acc, ...row], []).map((num, index) => ({
    number: num,
    isActionable: num === 0,
    index,
    isWrong: false,
    isActive: false,
    isHighlighted: false
  }))
}

export function transformClientToServerSudokuBoard(clientBoard: Board): ServerBoard {
  return chunkArray(clientBoard.map(({ number }) => number), 9);
}

function chunkArray<T>(array: T[], size: number): T[][] {
  if (array.length <= size) {
    return [array]
  }
  return [array.slice(0, size), ...chunkArray(array.slice(size), size)]
}

/**
 * Counts the remaining spots for a given number.
 * Let's say a user has six 1's on the board, then this function would return 3.
 * countRemainingNumbers(board, 1) // 3
 * @param board
 * @param number 
 */
export const countRemainingNumbers = (board: Board, number: number): number => {
  return board.reduce((acc: number, curr: Piece) => curr.number === number ? acc - 1 : acc, 9);
}