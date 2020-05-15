import classnames from "classnames"
import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  createBoardFetchAction,
  createBoardSetPaintNumberAction,
  selectActivePieceIndex,
  selectBoard,
  selectBoardValidationStatus,
  selectHighlightedNumber,
} from "../../governor/board"
import { InitialState } from "../../governor/initialState"
import { selectPencilMarkBoard } from "../../governor/pencilMarkBoard"
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

  fetchBoard: () => {}
  setPaintNumber: (num: number) => {}
}

const GameBoard: FC<GameBoardProps> = ({
  board,
  fetchBoard,
  activePieceIndex,
  setPaintNumber,
  validationStatus,
  highlightedNumber,
  pencilMarkBoard,
}) => {
  useEffect(() => {
    fetchBoard()
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
    if (pressedKey != null && activePieceIndex != null) {
      setPaintNumber(pressedKey === "backspace" ? 0 : +pressedKey)
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
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBoard: () => dispatch(createBoardFetchAction()),
  setPaintNumber: (number: number) =>
    dispatch(createBoardSetPaintNumberAction(number)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
