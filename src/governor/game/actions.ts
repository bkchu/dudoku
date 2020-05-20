import { Action } from "redux";

export enum GameActions {
  SET_LOADING_BOARD = 'GAME/SET_LOADING_BOARD'
}

export interface GameSetLoadingBoardAction extends Action {
  type: GameActions.SET_LOADING_BOARD
  payload: boolean
}


export function createGameSetLoadingBoardAction(isLoading: boolean): GameSetLoadingBoardAction {
  return {
    type: GameActions.SET_LOADING_BOARD,
    payload: isLoading
  }
}
