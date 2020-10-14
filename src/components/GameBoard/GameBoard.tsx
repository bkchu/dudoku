import {
  createBoardFetchAction,
  createBoardSetUserPressedAction,
  selectActivePieceIndex,
  selectBoard,
  selectBoardValidationStatus,
  selectHighlightedNumber,
} from "governor/board"
import { InitialState } from "governor/initialState"
import {
  selectIsPencilMode,
  selectPencilMarkBoard,
} from "governor/pencilMarkBoard"
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
import { selectGameIsPaused } from "governor/game"

export interface GameBoardProps {
  board: Board
  validationStatus: ServerBoardValidationStatus
  activePieceIndex: number
  highlightedNumber: number
  pencilMarkBoard: PencilMarkBoard
  isPencilMode: boolean
  isPaused: boolean

  fetchBoard: () => {}
  setUserPressed: Function
}

const GameBoard: FC<GameBoardProps> = ({
  board,
  fetchBoard,
  activePieceIndex,
  validationStatus,
  highlightedNumber,
  pencilMarkBoard,
  setUserPressed,
  isPaused,
}) => {
  useEffect(() => {
    // if the board is empty, or if it's not empty and every piece contains a 0.
    if (board?.every(piece => piece.number === 0)) {
      fetchBoard()
    }
  }, [])

  const pressedKey = useKeyPress([
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "backspace",
  ])

  useEffect(() => {
    if (pressedKey != null) {
      setUserPressed(pressedKey === "backspace" ? 0 : +pressedKey)
    }
  }, [pressedKey])

  return (
    <>
      <div className="game-board">
        <BoardLines />
        <ParsedBoard
          board={board}
          activePieceIndex={activePieceIndex}
          highlightedNumber={highlightedNumber}
          pencilMarkBoard={pencilMarkBoard}
        />
        {isPaused === true && (
          <div className="game-board__paused-overlay">Paused</div>
        )}
        {validationStatus === ServerBoardValidationStatus.SOLVED && (
          <div className="game-board__success-overlay">Awesome!</div>
        )}
      </div>
    </>
  )
}

const mapStateToProps = (state: InitialState) => ({
  board: selectBoard(state),
  activePieceIndex: selectActivePieceIndex(state),
  validationStatus: selectBoardValidationStatus(state),
  highlightedNumber: selectHighlightedNumber(state),
  pencilMarkBoard: selectPencilMarkBoard(state),
  isPencilMode: selectIsPencilMode(state),
  isPaused: selectGameIsPaused(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBoard: () => dispatch(createBoardFetchAction()),
  setUserPressed: number => dispatch(createBoardSetUserPressedAction(number)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
