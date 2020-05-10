import { all, call, put, select, takeEvery, takeLeading } from 'redux-saga/effects';
import { Board } from '../models/client/board';
import { ServerBoardResponse, ServerBoardValidationResponse } from '../models/server/board';
import { makeRequest } from '../utils/api';
import { transformClientToServerSudokuBoard, transformServerToClientSudokuBoard } from '../utils/board';
import { BoardActions, BoardSetPaintNumberAction, createBoardSetAction, createBoardSetValidationStatus } from './actions';
import { selectActivePiece, selectBoard } from './selectors';

export function* rootSaga(): Generator {
  yield all([board()])
}

export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga),
    takeEvery(BoardActions.SET_PAINT_NUMBER, setNumberInPieceSaga)
  ])
}

export function* fetchBoardSaga(): Generator {
  const response = (yield call(makeRequest, 'get-sudoku-board')) as ServerBoardResponse;
  yield put(createBoardSetAction(transformServerToClientSudokuBoard(response.board)));
}

export function* setNumberInPieceSaga(action: BoardSetPaintNumberAction): Generator {
  const currentBoard = (yield select(selectBoard)) as Board;
  const currentlyActivePieceIndex = (yield select(selectActivePiece)) as number;

  const newBoard: Board = currentBoard.map((piece, index) => ({
    ...piece,
    number: currentlyActivePieceIndex === index ? action.payload : piece.number
  }))

  yield put(createBoardSetAction(newBoard));

  // if (newBoard.every(piece => piece.number !== 0)) {
  yield* validateBoard(newBoard)
  // }
}

export function* validateBoard(board: Board): Generator {
  const response = (yield call(makeRequest, 'validate-board', { board: transformClientToServerSudokuBoard(board) })) as ServerBoardValidationResponse;

  yield put(createBoardSetValidationStatus(response.status));
}