import { InitialState } from "../../governor/initialState";
import { createSelector } from "reselect";

export const selectPencilMarkBoardSlice = (state: InitialState) => state.pencilMarkBoard;
export const selectPencilMarkBoard = createSelector(selectPencilMarkBoardSlice, pencilMarkBoardSlice => pencilMarkBoardSlice.pencilMarkBoard)
export const selectIsPencilMode = createSelector(selectPencilMarkBoardSlice, pencilMarkBoardSlice => pencilMarkBoardSlice.pencilMode)