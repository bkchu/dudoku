import { Action } from "redux";

export enum BoardActions {
  FETCH_BOARD = 'BOARD/FETCH_BOARD',
  SET_BOARD = 'BOARD/SET_BOARD'
}

export interface BoardFetchAction extends Action {
  type: BoardActions.FETCH_BOARD
}

export interface BoardSetAction extends Action {
  type: BoardActions.SET_BOARD,
  payload: string;
}

export function createBoardFetchAction(): BoardFetchAction {
  return {
    type: BoardActions.FETCH_BOARD
  }
}

export function createBoardSetAction(board: string): BoardSetAction {
  return {
    type: BoardActions.SET_BOARD,
    payload: board
  }
}