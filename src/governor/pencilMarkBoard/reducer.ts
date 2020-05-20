import { AnyAction } from 'redux';
import { PencilMarkBoardActions } from './actions';
import { PencilMarkBoardInitialState, pencilMarkBoardInitialState } from './initialState';

export const pencilMarkBoardReducer = (state: PencilMarkBoardInitialState = pencilMarkBoardInitialState, action: AnyAction) => {
  switch (action.type) {
    case PencilMarkBoardActions.ENABLE_PENCIL_MODE:
      return { ...state, pencilMode: true }

    case PencilMarkBoardActions.DISABLE_PENCIL_MODE:
      return { ...state, pencilMode: false }

    case PencilMarkBoardActions.SET_BOARD:
      return { ...state, pencilMarkBoard: action.payload }

    case PencilMarkBoardActions.RESET_BOARD:
      return { ...state,
        pencilMarkBoard: pencilMarkBoardInitialState.pencilMarkBoard,
        pencilMode: false
      }
      
    default:
      return state;
  }
}
