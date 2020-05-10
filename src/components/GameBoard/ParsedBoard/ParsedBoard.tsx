import React, { FC } from "react"
import { Board } from "../../../models/client/board"
import Piece from "../Piece/Piece"
import "./ParsedBoard.scss"

export interface ParsedBoardProps {
  board: Board
  activePieceIndex: number;
}

const ParsedBoard: FC<ParsedBoardProps> = ({ board, activePieceIndex }) => {
  return (
    <div className="parsed-board">
      {board?.map(({ number, index, isActionable }) => (
        <Piece
          number={number}
          key={index}
          index={index}
          isActionable={isActionable}
          isActive={index === activePieceIndex}
        />
      ))}
    </div>
  )
}

export default ParsedBoard
