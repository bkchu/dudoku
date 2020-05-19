import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { board, boardReducer } from "./board";
import { pencilMarkBoard, pencilMarkBoardReducer } from "./pencilMarkBoard";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  board: boardReducer,
  pencilMarkBoard: pencilMarkBoardReducer
}))

export const sagaMiddleware = createSagaMiddleware();

export const createReduxStore = () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)))
  let persistor = persistStore(store);
  return {
    store,
    persistor
  }
}

export function* rootSaga(): Generator {
  yield all([
    board(),
    pencilMarkBoard()
  ])
}