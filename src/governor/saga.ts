import { all, takeLeading, call, put } from 'redux-saga/effects';
import { BoardActions, createBoardSetAction } from './actions';
import { makeRequest } from '../utils/api';

export function* rootSaga(): Generator {
  yield all([board()])
}

export function* board(): Generator {
  yield all([
    takeLeading(BoardActions.FETCH_BOARD, fetchBoardSaga)
  ])
}

export function* fetchBoardSaga(): Generator {
  const response = (yield call(makeRequest, 'get-sudoku-board')) as string;
  console.log(response);
  yield put(createBoardSetAction(response));
}