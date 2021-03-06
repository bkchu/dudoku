import Button from "components/Button/Button"
import React, { FC } from "react"
import { connect } from "react-redux"
import "./Pause.css"
import { createGamePauseGameAction, selectGameIsPaused } from "governor/game"
import { InitialState } from "governor/initialState"

interface PauseProps {
  pauseGame: () => {}
  isPaused: boolean
}

const Pause: FC<PauseProps> = ({ pauseGame, isPaused }) => {
  return (
    <Button className="pause" onClick={pauseGame}>
      {isPaused ? "Resume" : "Pause"}
    </Button>
  )
}

const mapStateToProps = (state: InitialState) => ({
  isPaused: selectGameIsPaused(state),
})

const mapDispatchToProps = dispatch => ({
  pauseGame: () => dispatch(createGamePauseGameAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Pause)
