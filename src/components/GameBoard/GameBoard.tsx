import classnames from "classnames"
import {
  createBoardFetchAction,
  createBoardSetUserPressedAction,
  selectBoard,
  selectBoardValidationStatus,
} from "governor/board"
import { InitialState } from "governor/initialState"
import { selectIsPencilMode, selectPencilMarkBoard } from "governor/pencilMarkBoard"
import { useKeyPress } from "hooks/useKeyPress"
import { Board } from "models/client/board"
import { PencilMarkBoard } from "models/client/pencilMarkBoard"
import { ServerBoardValidationStatus } from "models/server/board"
import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import BoardLines from "./BoardLines/BoardLines"
import "./GameBoard.css"
import ParsedBoard from "./ParsedBoard/ParsedBoard"
export interface GameBoardProps {
  board: Board
  validationStatus: ServerBoardValidationStatus
  pencilMarkBoard: PencilMarkBoard
  isPencilMode: boolean

  fetchBoard: () => {}
  setUserPressed: Function
}

const GameBoard: FC<GameBoardProps> = ({
  board,
  fetchBoard,
  validationStatus,
  pencilMarkBoard,
  setUserPressed,
}) => {
  useEffect(() => {
    // if the board is empty, or if it's not empty and every piece contains a 0.
    if (board?.every(piece => piece.number === 0)) {
      fetchBoard()
    }
  }, [])

  const pressedKey = useKeyPress(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "backspace"])

  useEffect(() => {
    if (pressedKey != null) {
      setUserPressed(pressedKey === "backspace" ? 0 : +pressedKey)
    }
  }, [pressedKey])

  const _classNames = classnames("game-board", {
    "game-board--solved": validationStatus === ServerBoardValidationStatus.SOLVED,
  })

  return (
    <>
      <div className={_classNames}>
        <BoardLines />
        <ParsedBoard board={board} pencilMarkBoard={pencilMarkBoard} />
      </div>
      {validationStatus === ServerBoardValidationStatus.SOLVED && (
        <div className="game-board__success-overlay">Awesome!</div>
      )}
    </>
  )
}

const mapStateToProps = (state: InitialState) => ({
  board: selectBoard(state),
  validationStatus: selectBoardValidationStatus(state),
  pencilMarkBoard: selectPencilMarkBoard(state),
  isPencilMode: selectIsPencilMode(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBoard: () => dispatch(createBoardFetchAction()),
  setUserPressed: number => dispatch(createBoardSetUserPressedAction(number)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
