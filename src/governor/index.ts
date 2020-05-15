import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { board, boardReducer } from "./board";
import { pencilMarkBoard, pencilMarkBoardReducer } from "./pencilMarkBoard";

export const sagaMiddleware = createSagaMiddleware();

export const createReduxStore = () => {
  return createStore(combineReducers({
    board: boardReducer,
    pencilMarkBoard: pencilMarkBoardReducer
  }), composeWithDevTools(applyMiddleware(sagaMiddleware)))
}

export function* rootSaga(): Generator {
  yield all([
    board(),
    pencilMarkBoard()
  ])
}