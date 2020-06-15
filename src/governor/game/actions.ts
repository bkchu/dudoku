import { Action } from "redux";

export enum GameActions {
  SET_LOADING_BOARD = 'GAME/SET_LOADING_BOARD',
  START_TIMER = 'GAME/START_TIMER',
  STOP_TIMER = 'GAME/STOP_TIMER',
  SAVE_TIMER = 'GAME/SAVE_TIMER',
}

export interface GameSetLoadingBoardAction extends Action {
  type: GameActions.SET_LOADING_BOARD
  payload: boolean
}

export interface GameStartTimerAction extends Action {
  type: GameActions.START_TIMER
}

export interface GameStopTimerAction extends Action {
  type: GameActions.STOP_TIMER
}

export interface GameSaveTimerAction extends Action {
  type: GameActions.SAVE_TIMER,
  payload: number
}

export function createGameSetLoadingBoardAction(isLoading: boolean): GameSetLoadingBoardAction {
  return {
    type: GameActions.SET_LOADING_BOARD,
    payload: isLoading
  }
}

export function createGameStartTimerAction(): GameStartTimerAction {
  return {
    type: GameActions.START_TIMER
  }
}

export function createGameStopTimerAction(): GameStopTimerAction {
  return {
    type: GameActions.STOP_TIMER
  }
}

export function createGameSaveTimerAction(time: number): GameSaveTimerAction {
  return {
    type: GameActions.SAVE_TIMER,
    payload: time
  }
}