import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardFetchAction } from "../../governor/actions"
import { selectBoard } from "../../governor/selectors"
import { Board } from "../../models/client/board"
import BoardLines from "./BoardLines/BoardLines"
import "./GameBoard.scss"
import ParsedBoard from "./ParsedBoard/ParsedBoard"

export interface BoardProps {
  board: Board
  fetchBoard: () => {}
}

const GameBoard: FC<BoardProps> = ({ board, fetchBoard }) => {
  useEffect(() => {
    fetchBoard()
  }, [])

  return (
    <div className="game-board">
      <BoardLines></BoardLines>
      <ParsedBoard board={board}></ParsedBoard>
    </div>
  )
}

const mapStateToProps = state => ({
  board: selectBoard(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBoard: () => dispatch(createBoardFetchAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
