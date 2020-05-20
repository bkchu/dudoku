import { createSelector } from 'reselect';
import { InitialState } from '../../governor/initialState';

export const selectGameSlice = (state: InitialState) => state.game;
export const selectGameIsBoardLoading = createSelector(selectGameSlice, (gameSlice => gameSlice.isBoardLoading));
