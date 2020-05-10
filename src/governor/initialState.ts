import { Board } from "../models/client/board";
import { ServerBoardValidationStatus } from "../models/server/board";

export interface InitialState {
  board: Board,
  activePieceIndex: number,
  validationStatus: ServerBoardValidationStatus
}

export const initialState: InitialState = {
  board: null,
  activePieceIndex: null,
  validationStatus: null,
};

