import { initialState, InitialState } from './initialState';
import { BoardActions } from './actions';
import { AnyAction } from 'redux';

export const reducer = (state: InitialState = initialState, action: AnyAction) => {
  switch (action.type) {
    case BoardActions.SET_BOARD:
      return { ...state, board: action.payload }

    case BoardActions.TOGGLE_ACTIVE_PIECE:
      return {
        ...state,
        activePieceIndex: action.payload === state.activePieceIndex ? null : action.payload,
      }

    case BoardActions.SET_VALIDATION_STATUS:
      return {
        ...state,
        validationStatus: action.payload
      }

    default:
      return state;
  }
}
