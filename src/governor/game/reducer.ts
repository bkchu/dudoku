import { GameInitialState, gameInitialState } from "./initialState";
import { AnyAction } from "redux";
import { GameActions } from "./actions";

export function gameReducer(state: GameInitialState = gameInitialState, action: AnyAction) {
  switch (action.type) {
    case GameActions.SET_LOADING_BOARD:
      return {
        ...state,
        isBoardLoading: action.payload
      }
    
    default:
      return state;
  }
}