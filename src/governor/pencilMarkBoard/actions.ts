import { Action } from "redux"

export enum PencilMarkBoardActions {
  TOGGLE_PENCIL_MODE = "PENCIL/TOGGLE_PENCIL_MODE",
  ENABLE_PENCIL_MODE = "PENCIL/ENABLE_PENCIL_MODE",
  DISABLE_PENCIL_MODE = "PENCIL/DISABLE_PENCIL_MODE"
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
