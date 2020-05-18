import { PencilMarkBoard } from "models/client/pencilMarkBoard"
import { Action } from "redux"

export enum PencilMarkBoardActions {
  TOGGLE_PENCIL_MODE = "PENCIL/TOGGLE_PENCIL_MODE",
  ENABLE_PENCIL_MODE = "PENCIL/ENABLE_PENCIL_MODE",
  DISABLE_PENCIL_MODE = "PENCIL/DISABLE_PENCIL_MODE",
  SET_BOARD = "PENCIL/SET_BOARD",
  SET_PENCIL_MARKING = 'PENCIL/SET_PENCIL_MARKING',
  CLEAR_PENCIL_MARKS = 'PENCIL/CLEAR_PENCIL_MARKS',
  CLEAR_MATCHING_MARKS = 'PENCIL/CLEAR_MATCHING_MARKS'
}

export interface PencilMarkBoardTogglePencilModeAction extends Action {
  type: PencilMarkBoardActions.TOGGLE_PENCIL_MODE
}
export interface PencilMarkBoardEnablePencilModeAction extends Action {
  type: PencilMarkBoardActions.ENABLE_PENCIL_MODE
}
export interface PencilMarkBoardDisablePencilModeAction extends Action {
  type: PencilMarkBoardActions.DISABLE_PENCIL_MODE
}

export interface PencilMarkBoardSetBoardAction extends Action {
  type: PencilMarkBoardActions.SET_BOARD,
  payload: PencilMarkBoard
}

export interface PencilMarkBoardSetPencilMarkingAction extends Action {
  type: PencilMarkBoardActions.SET_PENCIL_MARKING,
  payload: number
}

export interface PencilMarkBoardClearPencilMarksAction extends Action {
  type: PencilMarkBoardActions.CLEAR_PENCIL_MARKS,
  payload: number
}

export interface PencilMarkBoardClearMatchingMarksAction extends Action {
  type: PencilMarkBoardActions.CLEAR_MATCHING_MARKS,
  payload: number
}

export function createPencilMarkBoardTogglePencilModeAction(): PencilMarkBoardTogglePencilModeAction {
  return {
    type: PencilMarkBoardActions.TOGGLE_PENCIL_MODE
  }
}

export function createPencilMarkBoardEnablePencilModeAction(): PencilMarkBoardEnablePencilModeAction {
  return {
    type: PencilMarkBoardActions.ENABLE_PENCIL_MODE,
  }
}

export function createPencilMarkBoardDisablePencilModeAction(): PencilMarkBoardDisablePencilModeAction {
  return {
    type: PencilMarkBoardActions.DISABLE_PENCIL_MODE,
  }
}

export function createPencilMarkBoardSetBoardAction(board: PencilMarkBoard): PencilMarkBoardSetBoardAction {
  return {
    type: PencilMarkBoardActions.SET_BOARD,
    payload: board
  }
}

export function createPencilMarkingSetAction(number: number): PencilMarkBoardSetPencilMarkingAction {
  return {
    type: PencilMarkBoardActions.SET_PENCIL_MARKING,
    payload: number
  }
}

export function createPencilMarkBoardClearPencilMarksAction(index: number): PencilMarkBoardClearPencilMarksAction {
  return {
    type: PencilMarkBoardActions.CLEAR_PENCIL_MARKS,
    payload: index
  }
}


export function createPencilMarkBoardClearMatchingMarksAction(index: number): PencilMarkBoardClearMatchingMarksAction {
  return {
    type: PencilMarkBoardActions.CLEAR_MATCHING_MARKS,
    payload: index
  }
}