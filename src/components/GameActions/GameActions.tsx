import classnames from "classnames"
import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardCheckBoardAction } from "../../governor/board/actions"
import { InitialState } from "../../governor/initialState"
import {
  createPencilMarkBoardTogglePencilModeAction,
  selectIsPencilMode,
} from "../../governor/pencilMarkBoard"
import { useKeyPress } from "../../hooks/useKeyPress"
import "./GameActions.css"

export interface GameActionsProps {
  isPencilMode: boolean
  checkBoard: () => {}
  togglePencilMode: Function
}

const GameActions: FC<GameActionsProps> = ({
  checkBoard,
  isPencilMode,
  togglePencilMode,
}) => {
  const classes = {
    checkBtn: "game-actions__btn",
    pencilModeBtn: classnames("game-actions__btn", {
      "game-actions__btn--is-active": isPencilMode,
    }),
  }

  const pressedKey = useKeyPress(["p"])

  useEffect(() => {
    if (pressedKey === "p") {
      togglePencilMode()
    }
  }, [pressedKey])

  const pencilModeButtonOnClick = () => togglePencilMode()

  return (
    <div className="game-actions">
      <button className={classes.checkBtn} onClick={checkBoard}>
        Check Board
      </button>
      <button
        className={classes.pencilModeBtn}
        onClick={pencilModeButtonOnClick}
      >
        ✏️ {isPencilMode ? "ON" : "OFF"}
      </button>
    </div>
  )
}

const mapStateToProps = (state: InitialState) => ({
  isPencilMode: selectIsPencilMode(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkBoard: () => dispatch(createBoardCheckBoardAction()),
  togglePencilMode: () =>
    dispatch(createPencilMarkBoardTogglePencilModeAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameActions)
