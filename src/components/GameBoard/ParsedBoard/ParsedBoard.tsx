import React, { FC } from "react"
import { Board } from "../../../models/board"
import "./ParsedBoard.scss"

export interface ParsedBoardProps {
  board: Board
}

const ParsedBoard: FC<ParsedBoardProps> = ({ board }) => {
  return (
    <div className="parsed-board">
      {board
        .reduce((acc, row) => [...acc, ...row], [])
        .map((num, index) => (
          <div key={index} className="parsed-board__num">
            {num === 0 ? "" : num}
          </div>
        ))}
    </div>
  )
}

export default ParsedBoard
