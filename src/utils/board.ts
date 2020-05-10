import { Board, Piece } from "../models/client/board";
import { ServerBoard } from "../models/server/board";

export function transformServerToClientSudokuBoard(serverBoard: ServerBoard): Board {
  return serverBoard.reduce((acc, row) => [...acc, ...row], []).map((num, index) => ({
    number: num,
    isActionable: num === 0,
    index
  } as Piece))
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