import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { Board, Piece } from '../models/client/board';
import { ServerBoardResponse, ServerBoardSolverResponse, ServerBoardValidationResponse } from '../models/server/board';
import { makeRequest } from '../utils/api';
import { transformClientToServerSudokuBoard, transformServerToClientSudokuBoard } from '../utils/board';
import { BoardActions, BoardSetPaintNumberAction, BoardToggleActivePieceAction, createBoardSetAction, createBoardSetActivePieceAction, createBoardSetHighlightedNumber, createBoardSetSolutionBoardAction, createBoardSetValidationStatusAction } from './actions';
import { selectActivePiece, selectActivePieceIndex, selectBoard, selectSolutionBoard } from './selectors';

export function* rootSaga(): Generator {
  yield all([board()])
}

export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga),
    takeLatest(BoardActions.SET_PAINT_NUMBER, setNumberInPieceSaga),
    takeLatest(BoardActions.CHECK_BOARD, checkBoard),
    takeLatest(BoardActions.TOGGLE_ACTIVE_PIECE, handlePieceClick)
  ])
}

export function* fetchBoardSaga(): Generator {
  // gets a new board
  const response = (yield call(makeRequest, 'get-sudoku-board')) as ServerBoardResponse;

  // gets the solved board using the new board
  const solutionBoard = (yield call(makeRequest, 'check-board', { board: response.board })) as ServerBoardSolverResponse;

  yield put(createBoardSetAction(transformServerToClientSudokuBoard(response.board)));
  yield put(createBoardSetSolutionBoardAction(transformServerToClientSudokuBoard(solutionBoard.solution)));
}

export function* setNumberInPieceSaga(action: BoardSetPaintNumberAction): Generator {
  const currentBoard = (yield select(selectBoard)) as Board;
  const currentlyActivePieceIndex = (yield select(selectActivePieceIndex)) as number;

  const newBoard: Board = currentBoard.map((piece, index) => ({
    ...piece,
    number: currentlyActivePieceIndex === index ? action.payload : piece.number,
    isWrong: currentlyActivePieceIndex === index ? false : piece.isWrong
  }))

  if (action.payload != 0) {
    yield put(createBoardSetHighlightedNumber(action.payload));
  } else {
    yield put(createBoardSetHighlightedNumber(null));
  }

  yield put(createBoardSetAction(newBoard));


  if (newBoard.every(piece => piece.number !== 0)) {
    yield* validateBoard(newBoard)
  }
}

export function* handlePieceClick(action: BoardToggleActivePieceAction): Generator {
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