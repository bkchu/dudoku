import { all, takeLatest, put, select } from "redux-saga/effects";
import { GameActions, createGameStopTimerAction, createGameStartTimerAction } from "./actions";
import { selectGameIsPaused } from "./selectors";

export function* game(): Generator {
    yield all([
        takeLatest(GameActions.PAUSE_GAME, pauseGameSaga)
    ])
}

export function* pauseGameSaga(): Generator {
    const isPaused = (yield select(selectGameIsPaused)) as boolean;

    if (isPaused) {
        yield put(createGameStopTimerAction());
    } else {
        yield put(createGameStartTimerAction());
    }
} 