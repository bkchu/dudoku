import { AnyAction } from "redux";
import { GameActions } from "./actions";
import { GameInitialState, gameInitialState } from "./initialState";

export function gameReducer(state: GameInitialState = gameInitialState, action: AnyAction) {
  switch (action.type) {
    case GameActions.SET_LOADING_BOARD:
      return {
        ...state,
        isBoardLoading: action.payload
      }

    case GameActions.START_TIMER:
      return {
        ...state,
        isTimerActive: true
      }

    case GameActions.STOP_TIMER:
      return {
        ...state,
        isTimerActive: false
      }

    case GameActions.SAVE_TIMER:
      return {
        ...state,
        timer: action.payload
      }

    default:
      return state;
  }
}