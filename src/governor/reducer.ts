import { initialState, InitialState } from './initialState';
import { BoardActions } from './actions';
import { AnyAction } from 'redux';

export const reducer = (state: InitialState = initialState, action: AnyAction) => {
  switch (action.type) {
    case BoardActions.SET_BOARD:
      return { ...state, board: action.payload }

    case BoardActions.SET_ACTIVE_PIECE:
      return {
        ...state,
        activePieceIndex: action.payload
      }

    case BoardActions.SET_VALIDATION_STATUS:
      return {
        ...state,
        validationStatus: action.payload
      }
    
    case BoardActions.SET_SOLUTION_BOARD:
      return {
        ...state,
        solutionBoard: action.payload
      }

    case BoardActions.SET_HIGHLIGHTED_NUMBER:
      return {
        ...state,
        highlightedNumber: action.payload
      }

    default:
      return state;
  }
}
