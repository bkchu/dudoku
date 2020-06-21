import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { board, boardReducer } from "./board";
import { gameReducer } from "./game";
import { game } from "./game/saga";
import { pencilMarkBoard, pencilMarkBoardReducer } from "./pencilMarkBoard";

const persistConfig = {
  key: 'root',
  storage
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
  board: boardReducer,
  pencilMarkBoard: pencilMarkBoardReducer,
  game: gameReducer
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
    pencilMarkBoard(),
    game()
  ])
}