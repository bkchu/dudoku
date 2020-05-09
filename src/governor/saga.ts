import { all, call, put, takeLeading } from 'redux-saga/effects';
import { ServerBoardResponse } from '../models/server/board';
import { makeRequest } from '../utils/api';
import { BoardActions, createBoardSetAction } from './actions';
import { transformServerToClientSudokuBoard } from '../utils/board';

export function* rootSaga(): Generator {
  yield all([board()])
}

export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga)
  ])
}

export function* fetchBoardSaga(): Generator {
  const response = (yield call(makeRequest, 'get-sudoku-board')) as ServerBoardResponse;
  yield put(createBoardSetAction(transformServerToClientSudokuBoard(response.board)));
}