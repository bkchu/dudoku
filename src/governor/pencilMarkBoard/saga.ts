import { all, put, select, takeEvery } from "redux-saga/effects"
import {
  createBoardSetActivePieceAction,
  createBoardSetHighlightedNumber,
  createBoardSetPaintNumberAction,
  selectActivePaintNumber,
  selectActivePiece,
  selectActivePieceIndex,
  selectBoard,
} from "../../governor/board"
import { Board, Piece } from "../../models/client/board"
import { PencilMarkBoard } from "../../models/client/pencilMarkBoard"
import { getResultingMarks } from "../../utils/pencilMarkings"
import {
  createPencilMarkBoardClearPencilMarksAction,
  createPencilMarkBoardDisablePencilModeAction,
  createPencilMarkBoardEnablePencilModeAction,
  createPencilMarkBoardSetBoardAction,
  PencilMarkBoardActions,
  PencilMarkBoardClearMatchingMarksAction,
  PencilMarkBoardClearPencilMarksAction,
  PencilMarkBoardSetPencilMarkingAction,
} from "./actions"
import { selectIsPencilMode, selectPencilMarkBoard } from "./selectors"

export function* pencilMarkBoard(): Generator {
  yield all([
    takeEvery(PencilMarkBoardActions.TOGGLE_PENCIL_MODE, togglePencilMode),
    takeEvery(PencilMarkBoardActions.SET_PENCIL_MARKING, setPencilMarkAtActiveIndex),
    takeEvery(PencilMarkBoardActions.CLEAR_PENCIL_MARKS, clearPencilMarksAtActiveIndex),
    takeEvery(PencilMarkBoardActions.CLEAR_MATCHING_MARKS, clearMatchingPencilMarks),
  ])
}

export function* togglePencilMode(): Generator {
  const isPencilMode = (yield select(selectIsPencilMode)) as boolean

  if (isPencilMode) {
    yield put(createPencilMarkBoardDisablePencilModeAction())
  } else {
    yield put(createPencilMarkBoardEnablePencilModeAction())
  }
}

export function* setPencilMarkAtActiveIndex(
  action: PencilMarkBoardSetPencilMarkingAction
): Generator {
  const desiredMark = action.payload
  const activePiece = (yield select(selectActivePiece)) as Piece
  const activePieceIndex = (yield select(selectActivePieceIndex)) as number
  const currentPencilMarkBoard = [...((yield select(selectPencilMarkBoard)) as PencilMarkBoard)]
  const activePaintNumber = (yield select(selectActivePaintNumber)) as number
  let markingsAtIndex = currentPencilMarkBoard[activePieceIndex]

  if (desiredMark !== 0) {
    // if there is already a number in a piece, remove it
    if (activePiece.number !== 0) {
      yield put(createBoardSetPaintNumberAction(0))
    }
    markingsAtIndex = getResultingMarks(markingsAtIndex, desiredMark)
    currentPencilMarkBoard[activePieceIndex] = markingsAtIndex
    yield put(createPencilMarkBoardSetBoardAction(currentPencilMarkBoard))
  }

  if (desiredMark === 0) {
    yield put(createPencilMarkBoardClearPencilMarksAction(activePieceIndex))
  }

  if (activePaintNumber != null) {
    yield put(createBoardSetActivePieceAction(null))
    if (activePaintNumber !== 0) {
      yield put(createBoardSetHighlightedNumber(activePaintNumber))
    }
  }
}

export function* clearPencilMarksAtActiveIndex(
  action: PencilMarkBoardClearPencilMarksAction
): Generator {
  const currentPencilMarkBoard = [...((yield select(selectPencilMarkBoard)) as PencilMarkBoard)]

  currentPencilMarkBoard[action.payload] = []
  yield put(createPencilMarkBoardSetBoardAction(currentPencilMarkBoard))
}

export function* clearMatchingPencilMarks(
  action: PencilMarkBoardClearMatchingMarksAction
): Generator {
  const index = action.payload
  const rows = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15, 16, 17],
    [18, 19, 20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, 31, 32, 33, 34, 35],
    [36, 37, 38, 39, 40, 41, 42, 43, 44],
    [45, 46, 47, 48, 49, 50, 51, 52, 53],
    [54, 55, 56, 57, 58, 59, 60, 61, 62],
    [63, 64, 65, 66, 67, 68, 69, 70, 71],
    [72, 73, 74, 75, 76, 77, 78, 79, 80],
  ]

  const subgrids = [
    [0, 1, 2, 9, 10, 11, 18, 19, 20],
    [3, 4, 5, 12, 13, 14, 21, 22, 23],
    [6, 7, 8, 15, 16, 17, 24, 25, 26],
    [27, 28, 29, 36, 37, 38, 45, 46, 47],
    [30, 31, 32, 39, 40, 41, 48, 49, 50],
    [33, 34, 35, 42, 43, 44, 51, 52, 53],
    [54, 55, 56, 63, 64, 65, 72, 73, 74],
    [57, 58, 59, 66, 67, 68, 75, 76, 77],
    [60, 61, 62, 69, 70, 71, 78, 79, 80],
  ]

  const columns = [
    [0, 9, 18, 27, 36, 45, 54, 63, 72],
    [1, 10, 19, 28, 37, 46, 55, 64, 73],
    [2, 11, 20, 29, 38, 47, 56, 65, 74],
    [3, 12, 21, 30, 39, 48, 57, 66, 75],
    [4, 13, 22, 31, 40, 49, 58, 67, 76],
    [5, 14, 23, 32, 41, 50, 59, 68, 77],
    [6, 15, 24, 33, 42, 51, 60, 69, 78],
    [7, 16, 25, 34, 43, 52, 61, 70, 79],
    [8, 17, 26, 35, 44, 53, 62, 71, 80],
  ]

  const currentBoard = (yield select(selectBoard)) as Board
  const currentPencilMarkBoard = (yield select(selectPencilMarkBoard)) as PencilMarkBoard

  const rowIndexesToCheck = rows.find(row => row.includes(index))
  const subgridIndexesToCheck = subgrids.find(subgrid => subgrid.includes(index))
  const columnIndexesToCheck = columns.find(column => column.includes(index))

  const allIndexesToCheck = [
    ...new Set([...rowIndexesToCheck, ...subgridIndexesToCheck, ...columnIndexesToCheck]),
  ].filter(num => num !== index)
  const newCurrentPencilMarkBoard = currentPencilMarkBoard.map((piece, i) => {
    if (allIndexesToCheck?.includes(i)) {
      if (piece?.includes(currentBoard[action.payload]?.number)) {
        return piece.filter(num => num !== currentBoard[action.payload].number)
      }
    }
    return piece
  })
  yield put(createPencilMarkBoardSetBoardAction(newCurrentPencilMarkBoard))
}
