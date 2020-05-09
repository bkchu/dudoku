import React, { FC } from "react"
import "./Piece.scss"

export interface PieceProps {
  number: number,
  index: number
}

const Piece: FC<PieceProps> = ({ number }) => {
  return <div className="piece">{number === 0 ? "" : `${number}`}</div>
}

export default Piece
