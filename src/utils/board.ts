import { ServerBoard } from "../models/server/board";
import { Board } from "../models/client/board";

export function transformServerToClientSudokuBoard(serverBoard: ServerBoard): Board {
  return serverBoard.reduce((acc, row) => [...acc, ...row], [])
}