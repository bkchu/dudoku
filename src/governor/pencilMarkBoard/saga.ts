import { all, put, select, takeEvery } from "redux-saga/effects";
import { createBoardSetPaintNumberAction, selectActivePiece, selectActivePieceIndex } from "../../governor/board";
import { Piece } from "../../models/client/board";
import { PencilMarkBoard } from "../../models/client/pencilMarkBoard";
import { getResultingMarks } from "../../utils/pencilMarkings";
import { createPencilMarkBoardDisablePencilModeAction, createPencilMarkBoardEnablePencilModeAction, createPencilMarkBoardSetBoardAction, PencilMarkBoardActions, PencilMarkBoardSetPencilMarkingAction } from "./actions";
import { selectIsPencilMode, selectPencilMarkBoard } from "./selectors";

export function* pencilMarkBoard(): Generator {
  yield all([
    takeEvery(PencilMarkBoardActions.TOGGLE_PENCIL_MODE, togglePencilMode),
    takeEvery(PencilMarkBoardActions.SET_PENCIL_MARKING, setPencilMarkAtActiveIndex),
    takeEvery(PencilMarkBoardActions.CLEAR_PENCIL_MARKS, clearPencilMarksAtActiveIndex)
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

export function* setPencilMarkAtActiveIndex(action: PencilMarkBoardSetPencilMarkingAction): Generator {
  const desiredMark = action.payload;
  const activePiece = (yield select(selectActivePiece)) as Piece;
  const activePieceIndex = (yield select(selectActivePieceIndex)) as number;
  const currentPencilMarkBoard = [...(yield select(selectPencilMarkBoard)) as PencilMarkBoard]
  let markingsAtIndex = currentPencilMarkBoard[activePieceIndex];

  if (desiredMark !== 0) {
    // if there is already a number in a piece, remove it
    if (activePiece.number !== 0) {
      yield put(createBoardSetPaintNumberAction(0));
    }
    markingsAtIndex = getResultingMarks(markingsAtIndex, desiredMark);
    currentPencilMarkBoard[activePieceIndex] = markingsAtIndex;
    yield put(createPencilMarkBoardSetBoardAction(currentPencilMarkBoard));

  }
}

export function* clearPencilMarksAtActiveIndex(): Generator {
  const activePieceIndex = (yield select(selectActivePieceIndex)) as number;
  const currentPencilMarkBoard = [...(yield select(selectPencilMarkBoard)) as PencilMarkBoard]

  currentPencilMarkBoard[activePieceIndex] = [];
  yield put(createPencilMarkBoardSetBoardAction(currentPencilMarkBoard));
}