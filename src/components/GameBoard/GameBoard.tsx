import classnames from "classnames"
import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  createBoardFetchAction,
  createBoardSetUserPressedAction,
  selectActivePieceIndex,
  selectBoard,
  selectBoardValidationStatus,
  selectHighlightedNumber,
} from "../../governor/board"
import { InitialState } from "../../governor/initialState"
import {
  selectIsPencilMode,
  selectPencilMarkBoard,
} from "../../governor/pencilMarkBoard"
import { useKeyPress } from "../../hooks/useKeyPress"
import { Board } from "../../models/client/board"
import { PencilMarkBoard } from "../../models/client/pencilMarkBoard"
import { ServerBoardValidationStatus } from "../../models/server/board"
import BoardLines from "./BoardLines/BoardLines"
import "./GameBoard.css"
import ParsedBoard from "./ParsedBoard/ParsedBoard"
export interface GameBoardProps {
  board: Board
  validationStatus: ServerBoardValidationStatus
  activePieceIndex: number
  highlightedNumber: number
  pencilMarkBoard: PencilMarkBoard
  isPencilMode: boolean

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
}) => {
  useEffect(() => {
    console.log(board);
    if (board == null || (board.length != null && board.every((piece) => piece.number === 0))) {
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

  const _classNames = classnames("game-board", {
    "game-board--solved":
      validationStatus === ServerBoardValidationStatus.SOLVED,
  })

  return (
    <>
      <div className={_classNames}>
        <BoardLines></BoardLines>
        <ParsedBoard
          board={board}
          activePieceIndex={activePieceIndex}
          highlightedNumber={highlightedNumber}
          pencilMarkBoard={pencilMarkBoard}
        ></ParsedBoard>
      </div>
      {validationStatus === ServerBoardValidationStatus.SOLVED && (
        <div className="game-board__success-overlay">Awesome!</div>
      )}
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
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBoard: () => dispatch(createBoardFetchAction()),
  setUserPressed: number => dispatch(createBoardSetUserPressedAction(number)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
