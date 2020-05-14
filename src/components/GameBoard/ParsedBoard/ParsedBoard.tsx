import React, { FC } from "react"
import { Board } from "../../../models/client/board"
import Piece from "../Piece/Piece"
import "./ParsedBoard.css"

export interface ParsedBoardProps {
  board: Board
  activePieceIndex: number
  highlightedNumber: number
}

const ParsedBoard: FC<ParsedBoardProps> = ({
  board,
  activePieceIndex,
  highlightedNumber,
}) => {
  return (
    <div className="parsed-board">
      {board?.map(({ number, index, isActionable, isWrong }) => (
        <Piece
          number={number}
          key={index}
          index={index}
          isActionable={isActionable}
          isActive={index === activePieceIndex}
          isWrong={isWrong}
          isHighlighted={highlightedNumber === number}
        />
      ))}
    </div>
  )
}

export default ParsedBoard
