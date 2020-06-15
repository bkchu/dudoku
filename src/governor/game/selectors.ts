import { InitialState } from 'governor/initialState';
import { createSelector } from 'reselect';

export const selectGameSlice = (state: InitialState) => state.game;
export const selectGameIsBoardLoading = createSelector(selectGameSlice, (gameSlice => gameSlice.isBoardLoading))
export const selectGameIsTimerActive = createSelector(selectGameSlice, (gameSlice => gameSlice.isTimerActive))
export const selectGameTimer = createSelector(selectGameSlice, (gameSlice => gameSlice.timer))
