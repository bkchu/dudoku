import React, { FC } from "react"
import './BoardLines.scss';

const BoardLines: FC = () => (
  <div className="board-lines">
    <div className="board-lines__lines board-lines__lines--1"></div>
    <div className="board-lines__lines board-lines__lines--2"></div>
    <div className="board-lines__lines board-lines__lines--3"></div>
    <div className="board-lines__lines board-lines__lines--4"></div>
  </div>
)

export default BoardLines
