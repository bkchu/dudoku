import {
  createGameSaveTimerAction,
  createGameStartTimerAction,
  createGameStopTimerAction,
  selectGameIsTimerActive,
  selectGameTimer,
} from "governor/game"
import { InitialState } from "governor/initialState"
import ms from "pretty-ms"
import React, { FC, useEffect, useState } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import "./Timer.css"

interface TimerProps {
  isTimerActive: boolean
  currentTime: number
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
}) => {
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (currentTime !== 0) {
      setTime(currentTime)
    }
    setActive();
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
      !document.hidden ? setActive() : setInactive()
    }

    document.addEventListener(
      "visibilitychange",
      setIsActiveBasedOnTabVisibility
    )

    return () =>
      document.removeEventListener(
        "visibilitychange",
        setIsActiveBasedOnTabVisibility
      )
  }, [])

  return (
    <div className="timer">
      <div className="time">{time !== 0 ? ms(time).replace(/\.\d/, '') : `0s`}</div>
    </div>
  )
}

const mapStateToProps = (state: InitialState) => ({
  isTimerActive: selectGameIsTimerActive(state),
  currentTime: selectGameTimer(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setActive: () => dispatch(createGameStartTimerAction()),
  setInactive: () => dispatch(createGameStopTimerAction()),
  saveTimer: time => dispatch(createGameSaveTimerAction(time)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Timer)
