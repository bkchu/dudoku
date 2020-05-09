import { Action } from "redux";
import { Board } from "../models/client/board";

export enum BoardActions {
  FETCH_BOARD = 'BOARD/FETCH_BOARD',
  SET_BOARD = 'BOARD/SET_BOARD'
}

export interface BoardFetchAction extends Action {
  type: BoardActions.FETCH_BOARD
}

export interface BoardSetAction extends Action {
  type: BoardActions.SET_BOARD,
  payload: Board;
}

export function createBoardFetchAction(): BoardFetchAction {
  return {
    type: BoardActions.FETCH_BOARD
  }
}

export function createBoardSetAction(board: Board): BoardSetAction {
  return {
    type: BoardActions.SET_BOARD,
    payload: board
  }
}