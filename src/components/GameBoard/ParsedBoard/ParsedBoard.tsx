import React, { FC } from "react"
import { Board } from "../../../models/client/board"
import { PencilMarkBoard } from "../../../models/client/pencilMarkBoard"
import Piece from "../Piece/Piece"
import "./ParsedBoard.css"

export interface ParsedBoardProps {
  board: Board
  activePieceIndex: number
  highlightedNumber: number
  pencilMarkBoard: PencilMarkBoard
}

const ParsedBoard: FC<ParsedBoardProps> = ({
  board,
  activePieceIndex,
  highlightedNumber,
  pencilMarkBoard,
}) => {
  return (
    <div className="parsed-board">
      {board?.map(({ number, index, isActionable, isWrong }, i) => (
        <Piece
          number={number}
          key={i}
          index={index}
          isActionable={isActionable}
          isActive={index === activePieceIndex}
          isWrong={isWrong}
          isHighlighted={highlightedNumber === number}
          pencilMarks={pencilMarkBoard[index]}
        />
      ))}
    </div>
  )
}

export default ParsedBoard
