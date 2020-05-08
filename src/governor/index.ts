import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from "redux-saga";
import { initialState } from "./initialState";
import { reducer } from "./reducer";

export const sagaMiddleware = createSagaMiddleware();

export const createReduxStore = () => {
  return createStore(reducer, initialState, composeWithDevTools(applyMiddleware(sagaMiddleware)))
}