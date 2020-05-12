import { Board } from "../models/client/board";
import { ServerBoardValidationStatus } from "../models/server/board";

export interface InitialState {
  board: Board
  activePieceIndex: number
  validationStatus: ServerBoardValidationStatus
  solutionBoard: Board
  highlightedNumber: number
}

export const initialState: InitialState = {
  board: null,
  activePieceIndex: null,
  validationStatus: null,
  solutionBoard: null,
  highlightedNumber: null
};

