import { selectBoardValidationStatus } from "governor/board"
import {
  createGameSaveTimerAction,
  createGameStartTimerAction,
  createGameStopTimerAction,
  selectGameIsTimerActive,
  selectGameTimer,
} from "governor/game"
import { InitialState } from "governor/initialState"
import { ServerBoardValidationStatus } from "models/server/board"
import ms from "pretty-ms"
import React, { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Pause from "./Pause/Pause"
import "./Timer.css"

interface TimerProps {
  isTimerActive: boolean
  currentTime: number
  validationStatus: ServerBoardValidationStatus
  setActive: () => {}
  setInactive: () => {}
  saveTimer: (time: number) => {}
}
const Timer: FC<TimerProps> = ({
  isTimerActive,
  setActive,
  setInactive,
  saveTimer,
  currentTime,
  validationStatus,
}) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    setActive()
    if (currentTime !== 0) {
      setTime(currentTime)
      setInactive()
    }
  }, [])

  useEffect(() => {
    let interval = null
    if (isTimerActive) {
      interval = setInterval(() => {
        setTime(time => time + 1000)
        saveTimer(time)
      }, 1000)
    } else if (!isTimerActive && time !== 0) {
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [isTimerActive, time])

  useEffect(() => {
    function setIsActiveBasedOnTabVisibility() {
      if (validationStatus !== ServerBoardValidationStatus.SOLVED) {
        !document.hidden ? setActive() : setInactive()
      } else {
        setInactive()
      }
    }

    document.addEventListener("visibilitychange", setIsActiveBasedOnTabVisibility)

    return () => document.removeEventListener("visibilitychange", setIsActiveBasedOnTabVisibility)
  }, [])

  return (
    <div className="timer">
      <div className="timer__time">{time !== 0 ? ms(time).replace(/\.\d/, "") : `0s`}</div>
      <Pause />
    </div>
  )
}

const mapStateToProps = (state: InitialState) => ({
  isTimerActive: selectGameIsTimerActive(state),
  currentTime: selectGameTimer(state),
  validationStatus: selectBoardValidationStatus(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActive: () => dispatch(createGameStartTimerAction()),
  setInactive: () => dispatch(createGameStopTimerAction()),
  saveTimer: time => dispatch(createGameSaveTimerAction(time)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
