import { Action } from "redux";
import { Board } from "../models/client/board";
import { ServerBoardValidationStatus } from "../models/server/board";

export enum BoardActions {
  FETCH_BOARD = 'BOARD/FETCH_BOARD',
  SET_BOARD = 'BOARD/SET_BOARD',
  TOGGLE_ACTIVE_PIECE = 'BOARD/TOGGLE_ACTIVE_PIECE',
  SET_PAINT_NUMBER = 'BOARD/SET_PAINT_NUMBER',
  SET_VALIDATION_STATUS = 'BOARD/SET_VALIDATION_STATUS',
  CHECK_BOARD = 'BOARD/CHECK_BOARD',
  SET_SOLUTION_BOARD = 'BOARD/SET_SOLUTION_BOARD'
}

export interface BoardFetchAction extends Action {
  type: BoardActions.FETCH_BOARD
}

export interface BoardSetAction extends Action {
  type: BoardActions.SET_BOARD
  payload: Board
}

export interface BoardToggleActivePieceAction extends Action {
  type: BoardActions.TOGGLE_ACTIVE_PIECE
  payload: number
}

export interface BoardSetPaintNumberAction extends Action {
  type: BoardActions.SET_PAINT_NUMBER
  payload: number
}

export interface BoardSetValidationStatusAction extends Action {
  type: BoardActions.SET_VALIDATION_STATUS
  payload: ServerBoardValidationStatus
}

export interface BoardCheckBoardAction extends Action {
  type: BoardActions.CHECK_BOARD
}

export interface BoardSetSolutionBoardAction extends Action {
  type: BoardActions.SET_SOLUTION_BOARD
  payload: Board
}

export function createBoardFetchAction(): BoardFetchAction {
  return {
    type: BoardActions.FETCH_BOARD,
  }
}

export function createBoardSetAction(board: Board): BoardSetAction {
  return {
    type: BoardActions.SET_BOARD,
    payload: board
  }
}

export function createBoardToggleActivePieceAction(index: number): BoardToggleActivePieceAction {
  return {
    type: BoardActions.TOGGLE_ACTIVE_PIECE,
    payload: index
  }
}

export function createBoardSetPaintNumberAction(number: number): BoardSetPaintNumberAction {
  return {
    type: BoardActions.SET_PAINT_NUMBER,
    payload: number
  }
}

export function createBoardSetValidationStatusAction(status: ServerBoardValidationStatus): BoardSetValidationStatusAction {
  return {
    type: BoardActions.SET_VALIDATION_STATUS,
    payload: status
  }
}

export function createBoardCheckBoardAction(): BoardCheckBoardAction {
  return {
    type: BoardActions.CHECK_BOARD
  }
}

export function createBoardSetSolutionBoardAction(board: Board): BoardSetSolutionBoardAction {
  return {
    type: BoardActions.SET_SOLUTION_BOARD,
    payload: board
  }
} 