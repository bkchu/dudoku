import classnames from "classnames"
import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  createBoardCheckBoardAction,
  createBoardMoveInDirectionAction,
} from "../../governor/board/actions"
import { InitialState } from "../../governor/initialState"
import { Direction } from "../../governor/models/board"
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
  moveInDirection: Function
}

const GameActions: FC<GameActionsProps> = ({
  checkBoard,
  isPencilMode,
  togglePencilMode,
  moveInDirection,
}) => {
  const classes = {
    checkBtn: "game-actions__btn",
    pencilModeBtn: classnames("game-actions__btn", {
      "game-actions__btn--is-active": isPencilMode,
    }),
  }

  const pressedKey = useKeyPress([
    "p",
    "w",
    "a",
    "s",
    "d",
    "arrowup",
    "arrowdown",
    "arrowleft",
    "arrowright",
  ])

  useEffect(() => {
    switch (pressedKey) {
      case "p":
        togglePencilMode()
        break

      case "w":
      case "arrowup":
        moveInDirection(Direction.UP)
        break

      case "a":
      case "arrowleft":
        moveInDirection(Direction.LEFT)
        break

      case "s":
      case "arrowdown":
        moveInDirection(Direction.DOWN)
        break

      case "d":
      case "arrowright":
        moveInDirection(Direction.RIGHT)
        break

      default:
        break
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
  moveInDirection: (direction: Direction) =>
    dispatch(createBoardMoveInDirectionAction(direction)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameActions)
