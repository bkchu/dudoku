import { Board, Piece } from "../../models/client/board";
import { ServerBoardValidationStatus } from "../../models/server/board";

const board: Board = Array(81).fill({ number: 0 } as Piece);

export interface BoardInitialState {
  board: Board
  activePieceIndex: number
  validationStatus: ServerBoardValidationStatus
  solutionBoard: Board
  highlightedNumber: number
  cursorIndex: number
  paintNumber: number
}

export const boardInitialState: BoardInitialState = {
  board,
  activePieceIndex: null,
  validationStatus: null,
  solutionBoard: null,
  highlightedNumber: null,
  cursorIndex: null,
  paintNumber: null
};

