import { InitialState } from "./initialState";

export const selectBoard = (state: InitialState) => state.board;
export const selectActivePiece = (state: InitialState) => state.activePieceIndex;
export const selectBoardValidationStatus = (state: InitialState) => state.validationStatus;