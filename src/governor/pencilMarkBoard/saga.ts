import { all, put, select, takeLeading } from "redux-saga/effects";
import { createPencilMarkBoardDisablePencilModeAction, createPencilMarkBoardEnablePencilModeAction, PencilMarkBoardActions } from "./actions";
import { selectIsPencilMode } from "./selectors";

export function* pencilMarkBoard(): Generator {
  yield all([
    takeLeading(PencilMarkBoardActions.TOGGLE_PENCIL_MODE, togglePencilMode)
  ])
}

export function* togglePencilMode(): Generator {
  const isPencilMode = (yield select(selectIsPencilMode)) as boolean;

  if (isPencilMode) {
    yield put(createPencilMarkBoardDisablePencilModeAction())
  } else {
    yield put(createPencilMarkBoardEnablePencilModeAction())
  }
}