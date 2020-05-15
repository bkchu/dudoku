import classnames from "classnames"
import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardCheckBoardAction } from "../../governor/board/actions"
import { InitialState } from "../../governor/initialState"
import {
  createPencilMarkBoardDisablePencilModeAction,
  createPencilMarkBoardEnablePencilModeAction,
  selectIsPencilMode,
} from "../../governor/pencilMarkBoard"

export interface GameActionsProps {
  isPencilMode: boolean
  checkBoard: () => {}
  enablePencilMode: Function
  disablePencilMode: Function
}

const GameActions: FC<GameActionsProps> = ({
  checkBoard,
  isPencilMode,
  enablePencilMode,
  disablePencilMode,
}) => {
  const pencilModeButtonClassNames = classnames(
    "game-actions__pencil-mode-btn",
    {
      "game-actions__pencil-mode-btn--is-active": isPencilMode,
    }
  )

  const pencilModeButtonOnClick = () =>
    isPencilMode ? disablePencilMode() : enablePencilMode()

  return (
    <>
      <button onClick={checkBoard}>Check Board</button>
      <button
        className={pencilModeButtonClassNames}
        onClick={pencilModeButtonOnClick}
      >
        Pencil Mode
      </button>
    </>
  )
}

const mapStateToProps = (state: InitialState) => ({
  isPencilMode: selectIsPencilMode(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkBoard: () => dispatch(createBoardCheckBoardAction()),
  enablePencilMode: () =>
    dispatch(createPencilMarkBoardEnablePencilModeAction()),
  disablePencilMode: () =>
    dispatch(createPencilMarkBoardDisablePencilModeAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameActions)
