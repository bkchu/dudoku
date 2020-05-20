import { createSelector } from 'reselect';
import { InitialState } from '../../governor/initialState';

export const selectBoardSlice = (state: InitialState) => state.board;
export const selectBoard = createSelector(selectBoardSlice, (boardSlice => boardSlice.board));
export const selectActivePieceIndex = createSelector(selectBoardSlice, (boardSlice => boardSlice.activePieceIndex));
export const selectBoardValidationStatus = createSelector(selectBoardSlice, (boardSlice => boardSlice.validationStatus));
export const selectSolutionBoard = createSelector(selectBoardSlice, (boardSlice => boardSlice.solutionBoard));
export const selectHighlightedNumber = createSelector(selectBoardSlice, (boardSlice => boardSlice.highlightedNumber));
export const selectActivePiece = createSelector(selectBoard, selectActivePieceIndex, (board, index) => board[index]);
export const selectCurrentCursorIndex = createSelector(selectBoardSlice, (boardSlice => boardSlice.cursorIndex));
export const selectActivePaintNumber = createSelector(selectBoardSlice, (boardSlice => boardSlice.paintNumber))
export const selectDifficulty = createSelector(selectBoardSlice, (boardSlice => boardSlice.difficulty))