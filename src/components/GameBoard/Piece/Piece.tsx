import classnames from "classnames"
import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  createBoardSelectPieceAction,
  createBoardSetHighlightedNumber,
} from "../../../governor/board"
import PencilGrid from "./PencilGrid/PencilGrid"
import "./Piece.css"
import { InitialState } from "governor/initialState"
import { selectGameIsPaused } from "governor/game"

export interface PieceProps {
  number: number
  index: number
  isActionable: boolean
  isActive: boolean
  isWrong: boolean
  isHighlighted: boolean
  pencilMarks: number[]
  isPaused: boolean

  onPieceClick: (num?: number) => {}
  setHighlightedNumber: (num?: number) => {}
}

const Piece: FC<PieceProps> = ({
  number,
  index,
  isActionable,
  isActive,
  isWrong,
  isHighlighted,
  onPieceClick,
  setHighlightedNumber,
  pencilMarks,
  isPaused,
}) => {
  const _classNames = classnames("piece", {
    "piece--active": isActive,
    "piece--is-actionable": isActionable,
    "piece--is-wrong": isWrong,
    "piece--is-highlighted": isHighlighted,
  })

  const onClick = () => {
    if (isHighlighted) {
      setHighlightedNumber(null)
    } else if (!isHighlighted && number !== 0) {
      setHighlightedNumber(number)
    } else if (!isHighlighted && number === 0) {
      setHighlightedNumber(null)
    }
    onPieceClick(index)
  }

  return (
    <>
      <div className={_classNames} onClick={onClick}>
        {number === 0 && (
          <PencilGrid
            isHighlighted={isHighlighted}
            pencilMarks={pencilMarks}
            isActive={isActive}
          ></PencilGrid>
        )}
        {number === 0 ? "" : isPaused ? "" : `${number}`}
      </div>
    </>
  )
}

const mapStateToProps = (state: InitialState) => ({
  isPaused: selectGameIsPaused(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onPieceClick: index => dispatch(createBoardSelectPieceAction(index)),
  setHighlightedNumber: number =>
    dispatch(createBoardSetHighlightedNumber(number)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Piece)
