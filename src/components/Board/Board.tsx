import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { selectBoard } from "../../governor/selectors"
import { Dispatch } from "redux"
import { createBoardFetchAction } from "../../governor/actions"
import { Board } from "../../models/board"

export interface BoardProps {
  board: Board
  fetchBoard: () => {}
}

const GameBoard: FC<BoardProps> = ({ board, fetchBoard }) => {
  useEffect(() => {
    fetchBoard()
  }, [])

  return <div className="board">{board}</div>
}

const mapStateToProps = state => ({
  board: selectBoard(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchBoard: () => dispatch(createBoardFetchAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
