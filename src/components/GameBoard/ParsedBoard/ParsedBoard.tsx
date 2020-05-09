import React, { FC } from "react"
import "./ParsedBoard.scss"
import Piece from "../Piece/Piece"
import { Board } from "../../../models/client/board"

export interface ParsedBoardProps {
  board: Board
}

const ParsedBoard: FC<ParsedBoardProps> = ({ board }) => {
  return (
    <div className="parsed-board">
      {board.map((num, index) => (
        <Piece number={num} key={index} index={index}/>
      ))}
    </div>
  )
}

export default ParsedBoard
