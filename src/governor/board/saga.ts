import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { createPencilMarkBoardClearPencilMarksAction, selectPencilMarkBoard } from '../../governor/pencilMarkBoard';
import { Board, Piece } from '../../models/client/board';
import { PencilMarkBoard } from '../../models/client/pencilMarkBoard';
import { ServerBoardResponse, ServerBoardSolverResponse, ServerBoardValidationResponse } from '../../models/server/board';
import { makeRequest } from '../../utils/api';
import { transformClientToServerSudokuBoard, transformServerToClientSudokuBoard } from '../../utils/board';
import { BoardActions, BoardSelectPieceAction, BoardSetPaintNumberAction, createBoardSetAction, createBoardSetActivePieceAction, createBoardSetHighlightedNumber, createBoardSetSolutionBoardAction, createBoardSetValidationStatusAction } from './actions';
import { selectActivePiece, selectActivePieceIndex, selectBoard, selectSolutionBoard } from './selectors';


export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga),
    takeLatest(BoardActions.SET_PAINT_NUMBER, setNumberInPieceSaga),
    takeLatest(BoardActions.CHECK_BOARD, checkBoard),
    takeLatest(BoardActions.SELECT_PIECE, handlePieceSelection)
  ])
}

export function* fetchBoardSaga(): Generator {
  // gets a new board
  const response = (yield call(makeRequest, 'get-sudoku-board')) as ServerBoardResponse;
  // const response = {
  //   "board": [
  //     [0, 6, 2, 0, 0, 0, 0, 0, 8],
  //     [0, 3, 0, 0, 0, 0, 0, 0, 0],
  //     [0, 7, 8, 4, 0, 9, 0, 0, 0],
  //     [2, 0, 3, 0, 4, 0, 8, 0, 7],
  //     [0, 0, 6, 8, 9, 0, 0, 0, 1],
  //     [7, 0, 9, 0, 0, 0, 0, 0, 6],
  //     [3, 0, 0, 6, 7, 4, 9, 8, 5],
  //     [0, 0, 0, 0, 8, 0, 0, 1, 0],
  //     [0, 9, 5, 0, 1, 0, 0, 6, 4]
  //   ]
  // } as ServerBoardResponse;

  // gets the solved board using the new board
  const solutionBoard = (yield call(makeRequest, 'check-board', { board: response.board })) as ServerBoardSolverResponse;

  yield put(createBoardSetAction(transformServerToClientSudokuBoard(response.board)));
  yield put(createBoardSetSolutionBoardAction(transformServerToClientSudokuBoard(solutionBoard.solution)));
}

export function* setNumberInPieceSaga(action: BoardSetPaintNumberAction): Generator {
  const desiredNumber = action.payload
  const activePieceIndex = (yield select(selectActivePieceIndex)) as number;
  const activePiece = (yield select(selectActivePiece)) as Piece;
  const currentBoard = [...(yield select(selectBoard)) as Board]
  const currentPencilMarkBoard = [...(yield select(selectPencilMarkBoard)) as PencilMarkBoard];

  currentBoard[activePieceIndex] = {
    ...activePiece,
    number: currentBoard[activePieceIndex].number === desiredNumber ? 0 : desiredNumber,
    isWrong: false
  }

  // check if there are pencil markings in that piece first and remove them
  if (currentPencilMarkBoard[activePieceIndex].length > 0) {
    yield put(createPencilMarkBoardClearPencilMarksAction());
  }

  if (desiredNumber != 0) {
    yield put(createBoardSetHighlightedNumber(desiredNumber));
  } else {
    yield put(createBoardSetHighlightedNumber(null));
  }

  yield put(createBoardSetAction(currentBoard));

  if (currentBoard.every(piece => piece.number !== 0)) {
    yield* validateBoard(currentBoard)
  }
}

export function* handlePieceSelection(action: BoardSelectPieceAction): Generator {
  const board = (yield select(selectBoard)) as Board;
  const clickedIndex = action.payload;
  const { isActionable, number } = board[clickedIndex];
  const activePiece = (yield select(selectActivePiece)) as Piece;

  if (isActionable) {
    if (activePiece == null) {
      yield put(createBoardSetActivePieceAction(clickedIndex));
      if (number !== 0) {
        yield put(createBoardSetHighlightedNumber(number));
      } else {
        yield put(createBoardSetHighlightedNumber(null));
      }
    } else if (activePiece != null) {
      if (activePiece.index != clickedIndex) {
        yield put(createBoardSetActivePieceAction(clickedIndex));
      } else {
        yield put(createBoardSetActivePieceAction(null));
        yield put(createBoardSetHighlightedNumber(null));
      }
    }
  } else if (!isActionable && number != 0) {
    yield put(createBoardSetActivePieceAction(null));
  }
}

export function* validateBoard(board: Board): Generator {
  const response = (yield call(makeRequest, 'validate-board', { board: transformClientToServerSudokuBoard(board) })) as ServerBoardValidationResponse;

  yield put(createBoardSetValidationStatusAction(response.status));
}

export function* checkBoard(): Generator {
  const currentBoard = (yield select(selectBoard)) as Board;
  const solvedBoard = (yield select(selectSolutionBoard)) as Board;

  const checkedBoard = currentBoard.map((currentPiece, index) => {
    return {
      ...currentPiece,
      isWrong: currentPiece.number != 0 && currentPiece.number != solvedBoard[index].number
    }
  })

  yield put(createBoardSetActivePieceAction(null));

  yield put(createBoardSetAction(checkedBoard));
}