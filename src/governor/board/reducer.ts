import { AnyAction } from 'redux';
import { BoardActions } from './actions';
import { BoardInitialState, boardInitialState } from './initialState';

export const boardReducer = (state: BoardInitialState = boardInitialState, action: AnyAction) => {
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

    case BoardActions.SET_CURSOR_INDEX:
      return {
        ...state,
        cursorIndex: action.payload
      }

    case BoardActions.SET_ACTIVE_PAINT_NUMBER:
      return {
        ...state,
        paintNumber: action.payload
      }

    case BoardActions.SET_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload
      }

    case BoardActions.RESET_BOARD:
      return {
        ...state,
        activePieceIndex: null,
        validationStatus: null,
        solutionBoard: null,
        highlightedNumber: null,
        cursorIndex: null,
        paintNumber: null,
      }

    default:
      return state;
  }
}
