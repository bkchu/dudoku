import { navigate } from "gatsby"
import {
  all,
  call,
  put,
  select,
  SelectEffect,
  takeEvery,
  takeLatest,
  takeLeading,
} from "redux-saga/effects"
import {
  createGameSaveTimerAction,
  createGameSetLoadingBoardAction,
  createGameStartTimerAction,
  createGameStopTimerAction,
} from "../../governor/game/actions"
import { Direction } from "../../governor/models/board"
import {
  createPencilMarkBoardResetBoardAction,
  createPencilMarkingSetAction,
  selectIsPencilMode,
} from "../../governor/pencilMarkBoard"
import { Board, Difficulty, Piece } from "../../models/client/board"
import {
  ServerBoardResponse,
  ServerBoardSolverResponse,
  ServerBoardValidationResponse,
  ServerBoardValidationStatus,
} from "../../models/server/board"
import { makeRequest } from "../../utils/api"
import {
  transformClientToServerSudokuBoard,
  transformServerToClientSudokuBoard,
} from "../../utils/board"
import {
  BoardActions,
  BoardMoveInDirectionAction,
  BoardSelectPieceAction,
  BoardSetUserPressedAction,
  createBoardResetBoardAction,
  createBoardSelectPieceAction,
  createBoardSetAction,
  createBoardSetActivePaintNumber,
  createBoardSetActivePieceAction,
  createBoardSetCursorIndexAction,
  createBoardSetHighlightedNumber,
  createBoardSetPaintNumberAction,
  createBoardSetSolutionBoardAction,
  createBoardSetValidationStatusAction,
  BoardSetPaintNumberAction,
} from "./actions"
import {
  selectActivePaintNumber,
  selectActivePieceIndex,
  selectBoard,
  selectCurrentCursorIndex,
  selectDifficulty,
  selectSolutionBoard,
} from "./selectors"

export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga),
    takeLatest(BoardActions.SET_PAINT_NUMBER, setPaintNumber),
    takeLatest(BoardActions.CHECK_BOARD, checkBoard),
    takeEvery(BoardActions.SELECT_PIECE, handlePieceSelection),
    takeLatest(BoardActions.MOVE_IN_DIRECTION, moveActivePieceInDirection),
    takeEvery(BoardActions.SET_USER_PRESSED, setUserPressed),
    takeLatest(BoardActions.LOAD_BOARD_AND_NAVIGATE, loadBoardAndNavigate),
  ])
}

export function* fetchBoardSaga(): Generator {
  const difficulty = (yield select(selectDifficulty)) as Difficulty
  // gets a new board
  const response = (yield call(makeRequest, "get-sudoku-board", null, {
    difficulty,
  })) as ServerBoardResponse

  // gets the solved board using the new board
  const solutionBoard = (yield call(makeRequest, "check-board", {
    board: response.board,
  })) as ServerBoardSolverResponse

  yield put(createBoardSetAction(transformServerToClientSudokuBoard(response.board)))
  yield put(
    createBoardSetSolutionBoardAction(transformServerToClientSudokuBoard(solutionBoard.solution))
  )
}

export function* setPaintNumber(action: BoardSetPaintNumberAction): Generator {
  yield call(updateMatchingPieces, piece => piece.isHighlighted, {
    isHighlighted: false,
  })
  yield call(updateMatchingPieces, piece => piece.number === action.payload, {
    isHighlighted: true,
  })
  // const desiredNumber = action.payload
  // const activePieceIndex = (yield select(selectActivePieceIndex)) as number
  // const activePiece = (yield select(selectActivePiece)) as Piece
  // const currentBoard = [...((yield select(selectBoard)) as Board)]
  // const currentPencilMarkBoard = [...((yield select(selectPencilMarkBoard)) as PencilMarkBoard)]
  // const activePaintNumber = (yield select(selectActivePaintNumber)) as number
  // currentBoard[activePieceIndex] = {
  //   ...activePiece,
  //   number: currentBoard[activePieceIndex].number === desiredNumber ? 0 : desiredNumber,
  //   isWrong: false,
  // }
  // // check if there are pencil markings in that piece first and remove them
  // if (currentPencilMarkBoard[activePieceIndex]?.length > 0) {
  //   yield put(createPencilMarkBoardClearPencilMarksAction(activePieceIndex))
  // }
  // if (activePaintNumber != null) {
  //   yield put(createBoardSetActivePieceAction(null))
  //   if (activePaintNumber !== 0) {
  //     yield put(createBoardSetHighlightedNumber(activePaintNumber))
  //   }
  //   yield put(createPencilMarkBoardClearMatchingMarksAction(activePieceIndex))
  // }
  // if (desiredNumber !== 0) {
  //   yield put(createBoardSetHighlightedNumber(desiredNumber))
  // } else {
  //   yield put(createBoardSetHighlightedNumber(null))
  // }
  // yield put(createBoardSetAction(currentBoard))
  // if (desiredNumber !== 0) {
  //   yield put(createPencilMarkBoardClearMatchingMarksAction(activePieceIndex))
  // }
  // if (currentBoard.every(piece => piece.number !== 0)) {
  //   yield* validateBoard(currentBoard)
  // }
}

export function* handlePieceSelection(action: BoardSelectPieceAction): Generator {
  // getting the properties of the piece that was clicked on
  const {
    number,
    index,
    isActionable,
    // isWrong,
    isHighlighted,
    isActive,
  } = ((yield call(getPiece, action.payload)) as Piece) || {}
  const activePaintNumber = (yield select(selectActivePaintNumber)) as number

  // const isPencilMarkings =
  // ((yield select(selectPencilMarkBoard)) as PencilMarkBoard)?.[index]?.length !== 0

  /**
   * SETTING THE CURSOR TO THE SPOT THE USER SELECTED
   */
  yield call(setCursor, index)

  /**
   * WHEN SELECTING AN EMPTY PIECE
   */
  if (activePaintNumber == null) {
    if (number === 0) {
      // inactivate and unhighlight any currently active or highlighted pieces
      yield call(updateMatchingPieces, piece => piece.isActive || piece.isHighlighted, {
        isActive: false,
        isHighlighted: false,
      })

      // toggle the active state of the selected piece
      yield call(updatePieceState, index, { isActive: !isActive })

      yield call(determineActivePiece, index)
    }

    /**
     * WHEN SELECTING A FILLED PIECE
     */
    if (number !== 0) {
      // unhighlight all highlighted pieces
      yield call(updateMatchingPieces, piece => piece.isHighlighted, {
        isHighlighted: false,
      })

      // highlight or unhighlight all of the pieces that contains the same number as the piece that was clicked
      yield call(updateMatchingPieces, piece => piece.number === number, {
        isHighlighted: !isHighlighted,
      })

      // set all active pieces to not active
      yield call(updateMatchingPieces, piece => piece.isActive, {
        isActive: false,
      })

      // if the piece that was clicked on is actionable
      if (isActionable) {
        // set / unset its active state
        yield call(updatePieceState, index, {
          isActive: !isActive,
        })

        yield call(updateMatchingPieces, piece => piece.number === number, {
          isHighlighted: !isActive,
        })

        yield call(determineActivePiece, index)
      }
    }
  }

  if (activePaintNumber != null && isActionable) {
    yield call(resetPieceState, index)
    if (number === 0) {
      yield call(updatePieceState, index, {
        number: activePaintNumber,
        isHighlighted: true,
      })
      yield call(updateMatchingPieces, piece => piece.number === activePaintNumber, {
        isHighlighted: true,
      })
    }
    if (number === activePaintNumber) {
      yield call(updatePieceState, index, {
        number: 0,
      })
      yield call(updateMatchingPieces, piece => piece.number === activePaintNumber, {
        isHighlighted: false,
      })
    }
    // yield call(updateMatchingPieces, piece => piece.number === activePaintNumber, {
    //   isHighlighted: !isHighlighted
    // })
  }
}

export function* validateBoard(board: Board): Generator {
  const response = (yield call(makeRequest, "validate-board", {
    board: transformClientToServerSudokuBoard(board),
  })) as ServerBoardValidationResponse

  yield put(createBoardSetValidationStatusAction(response.status))

  if (response.status === ServerBoardValidationStatus.SOLVED) {
    yield put(createGameStopTimerAction())
  }
}

export function* checkBoard(): Generator {
  const solvedBoard = (yield select(selectSolutionBoard)) as Board

  // set any active pieces and highlighted pieces to inactive and unhighlighted
  yield call(updateMatchingPieces, piece => piece.isActive || piece.isHighlighted, {
    isActive: false,
    isHighlighted: false,
  })

  if (solvedBoard != null) {
    yield call(
      updateMatchingPieces,
      ({ number, index }) => number != 0 && number != solvedBoard[index].number,
      {
        isWrong: true,
      }
    )
  }

  yield put(createBoardSetActivePieceAction(null))
}

export function* moveActivePieceInDirection(action: BoardMoveInDirectionAction): Generator {
  const activePaintNumber = (yield select(selectActivePaintNumber)) as number
  const currentBoard = (yield select(selectBoard)) as Board
  const currentCursorIndex = (yield select(selectCurrentCursorIndex)) as number

  if (activePaintNumber === null) {
    let newIndex = currentCursorIndex
    if (currentCursorIndex != null && currentCursorIndex > -1) {
      switch (action.payload) {
        case Direction.UP:
          newIndex -= 9
          if (newIndex < 0) {
            newIndex = 81 + newIndex
          }
          break

        case Direction.DOWN:
          newIndex += 9
          if (newIndex > 80) {
            newIndex = newIndex % 9
          }
          break

        case Direction.LEFT:
          newIndex -= 1
          if (newIndex < 0) {
            newIndex = 80
          }
          break

        case Direction.RIGHT:
          newIndex += 1
          if (newIndex > 80) {
            newIndex = 0
          }
          break

        default:
          return
      }
    } else {
      newIndex = 0
    }

    yield put(createBoardSetCursorIndexAction(newIndex))

    const isHighlighted = currentBoard[newIndex]?.isHighlighted
    const number = currentBoard[newIndex]?.number

    if (!isHighlighted && number !== 0) {
      yield put(createBoardSetHighlightedNumber(number))
    } else if (!isHighlighted && number === 0) {
      yield put(createBoardSetHighlightedNumber(null))
    }

    yield put(createBoardSelectPieceAction(newIndex))
  }
}

export function* setUserPressed(action: BoardSetUserPressedAction) {
  const activePieceIndex = (yield select(selectActivePieceIndex)) as number
  const isPencilMode = (yield select(selectIsPencilMode)) as boolean
  const activePaintNumber = (yield select(selectActivePaintNumber)) as number

  // there is an active piece selected by the user
  if (activePieceIndex != null) {
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 0].includes(action.payload)) {
      isPencilMode
        ? yield put(createPencilMarkingSetAction(action.payload))
        : yield put(createBoardSetPaintNumberAction(action.payload))
    }
  } else {
    // there no active piece, so turning on paint mode
    if (activePaintNumber === action.payload) {
      yield put(createBoardSetActivePaintNumber(null))
    } else {
      yield put(createBoardSetActivePaintNumber(action.payload))
    }
    if (action.payload !== 0) {
      yield put(createBoardSetHighlightedNumber(action.payload))
    }
  }
}

export function* loadBoardAndNavigate() {
  yield put(createGameSetLoadingBoardAction(true))
  yield put(createPencilMarkBoardResetBoardAction())
  yield put(createBoardResetBoardAction())
  yield call(fetchBoardSaga)
  yield call(navigateTo, "/play")
  yield put(createGameSetLoadingBoardAction(false))

  // start timer from 0
  yield call(startAndResetTimer)
}

export function* startAndResetTimer() {
  yield put(createGameSaveTimerAction(0))
  yield put(createGameStartTimerAction())
}

/**
 * Navigates to a given path
 * @param path the path to navigate to
 */
export function* navigateTo(path: string) {
  navigate(path)
}

/**
 * Returns the piece given the index in the board
 * @param index the index of the desired piece
 */
export function* getPiece(index: number): Generator<SelectEffect, Piece, any> {
  const board = yield select(selectBoard)
  return board[index]
}

/**
 * Updates the piece at the given index with new properties
 * @param index the index of the piece to update
 * @param options an object representing new properties of the piece
 */
export function* updatePieceState(index: number, options: Partial<Piece>) {
  const currentBoard = (yield select(selectBoard)) as Board
  const updatedBoard = currentBoard.map(piece => {
    if (piece.index === index) {
      return { ...piece, ...options }
    } else {
      return piece
    }
  })

  yield call(updateBoard, updatedBoard)
}

/**
 * resets the state of the piece at the given index
 * @param index the index of the piece
 */
export function* resetPieceState(index: number) {
  yield call(updatePieceState, index, {
    isActive: false,
    isHighlighted: false,
    isWrong: false,
  })
}

/**
 * Updates the board with the given newBoard
 * @param newBoard the new board to display in the UI
 */
export function* updateBoard(newBoard: Board) {
  yield put(createBoardSetAction(newBoard))
}

/**
 * Takes only the pieces determined by the filter function and updates their properties based on the options passed in.
 * @param options the options to update pieces that pass the filter function
 * @param filterFunction the function to determine which pieces to update
 */
export function* updateMatchingPieces(
  filterFunction: (piece: Piece) => {},
  options: Partial<Piece>
) {
  const currentBoard = (yield select(selectBoard)) as Board
  const updatedBoard = currentBoard.map(piece => {
    if (filterFunction(piece)) {
      return { ...piece, ...options }
    } else {
      return piece
    }
  })

  yield call(updateBoard, updatedBoard)
}

/**
 * Sets the cursor at the given index, which the user can interact with using the arrow keys
 * @param index the index to set the cursor to
 */
export function* setCursor(index: number) {
  yield put(createBoardSetCursorIndexAction(index))
}

export function* determineActivePiece(index: number) {
  const activePieceIndex = (yield select(selectActivePieceIndex)) as number
  yield put(createBoardSetActivePieceAction(activePieceIndex !== index ? index : null))
}
