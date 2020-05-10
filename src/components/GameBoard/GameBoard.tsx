import classnames from "classnames"
import React, { FC, useEffect } from "react"
import KeyboardEventHandler from "react-keyboard-event-handler"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  createBoardFetchAction,
  createBoardSetPaintNumberAction,
} from "../../governor/actions"
import {
  selectActivePiece,
  selectBoard,
  selectBoardValidationStatus,
} from "../../governor/selectors"
import { Board } from "../../models/client/board"
import { ServerBoardValidationStatus } from "../../models/server/board"
import BoardLines from "./BoardLines/BoardLines"
import "./GameBoard.scss"
import ParsedBoard from "./ParsedBoard/ParsedBoard"

export interface BoardProps {
  board: Board
  activePieceIndex: number
  validationStatus: ServerBoardValidationStatus

  fetchBoard: () => {}
  setPaintNumber: (num: number) => {}
}

const GameBoard: FC<BoardProps> = ({
  board,
  fetchBoard,
  activePieceIndex,
  setPaintNumber,
  validationStatus,
}) => {
  useEffect(() => {
    fetchBoard()
  }, [])

  const constructedClasses = classnames("game-board", {
    "game-board--solved":
      validationStatus === ServerBoardValidationStatus.SOLVED,
  })

  return (
    <>
      <div className={constructedClasses}>
        <KeyboardEventHandler
          handleKeys={["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]}
          onKeyEvent={(key: string) =>
            activePieceIndex != null && setPaintNumber(+key)
          }
          handleFocusableElements={true}
        />
        <BoardLines></BoardLines>
        <ParsedBoard
          board={board}
          activePieceIndex={activePieceIndex}
        ></ParsedBoard>
      </div>
      {validationStatus === ServerBoardValidationStatus.SOLVED && (
        <div className="game-board__success-overlay">Awesome!</div>
      )}
    </>
  )
}

const mapStateToProps = state => ({
  board: selectBoard(state),
  activePieceIndex: selectActivePiece(state),
  validationStatus: selectBoardValidationStatus(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBoard: () => dispatch(createBoardFetchAction()),
  setPaintNumber: (number: number) =>
    dispatch(createBoardSetPaintNumberAction(number)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
