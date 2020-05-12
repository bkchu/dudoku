import { InitialState } from "./initialState";
import { createSelector } from 'reselect';

export const selectBoard = (state: InitialState) => state.board;
export const selectActivePieceIndex = (state: InitialState) => state.activePieceIndex;
export const selectBoardValidationStatus = (state: InitialState) => state.validationStatus;
export const selectSolutionBoard = (state: InitialState) => state.solutionBoard;
export const selectHighlightedNumber = (state: InitialState) => state.highlightedNumber;
export const selectActivePiece = createSelector(selectBoard, selectActivePieceIndex, (board, index) => board[index]);