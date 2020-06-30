import React, { FC } from "react"
import { Board } from "../../../models/client/board"
import { PencilMarkBoard } from "../../../models/client/pencilMarkBoard"
import Piece from "../Piece/Piece"
import "./ParsedBoard.css"

export interface ParsedBoardProps {
  board: Board
  pencilMarkBoard: PencilMarkBoard
}

const ParsedBoard: FC<ParsedBoardProps> = ({ board, pencilMarkBoard }) => {
  return (
    <div className="parsed-board">
      {board?.map(({ number, index, isActionable, isWrong, isActive, isHighlighted }, i) => (
        <Piece
          number={number}
          key={i}
          index={index}
          isActionable={isActionable}
          isActive={isActive}
          isWrong={isWrong}
          isHighlighted={isHighlighted}
          pencilMarks={pencilMarkBoard[index]}
        />
      ))}
    </div>
  )
}

export default ParsedBoard
