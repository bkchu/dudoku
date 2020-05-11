import { all, call, put, select, takeLatest, takeLeading } from 'redux-saga/effects';
import { Board } from '../models/client/board';
import { ServerBoardResponse, ServerBoardSolverResponse, ServerBoardValidationResponse } from '../models/server/board';
import { makeRequest } from '../utils/api';
import { transformClientToServerSudokuBoard, transformServerToClientSudokuBoard } from '../utils/board';
import { BoardActions, BoardSetPaintNumberAction, createBoardSetAction, createBoardSetValidationStatusAction, createBoardSetSolutionBoardAction, createBoardToggleActivePieceAction } from './actions';
import { selectActivePiece, selectBoard, selectSolutionBoard } from './selectors';

export function* rootSaga(): Generator {
  yield all([board()])
}

export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga),
    takeLatest(BoardActions.SET_PAINT_NUMBER, setNumberInPieceSaga),
    takeLatest(BoardActions.CHECK_BOARD, checkBoard),
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
  const currentlyActivePieceIndex = (yield select(selectActivePiece)) as number;

  const newBoard: Board = currentBoard.map((piece, index) => ({
    ...piece,
    number: currentlyActivePieceIndex === index ? action.payload : piece.number,
    isWrong: currentlyActivePieceIndex === index ? false : piece.isWrong
  }))

  yield put(createBoardSetAction(newBoard));

  if (newBoard.every(piece => piece.number !== 0)) {
    yield* validateBoard(newBoard)
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

  yield put(createBoardToggleActivePieceAction(null));

  yield put(createBoardSetAction(checkedBoard));
}
