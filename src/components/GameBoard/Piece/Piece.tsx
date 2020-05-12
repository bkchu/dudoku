import classnames from "classnames"
import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  createBoardSetHighlightedNumber,
  createBoardToggleActivePieceAction,
} from "../../../governor/actions"
import "./Piece.scss"

export interface PieceProps {
  number: number
  index: number
  isActionable: boolean
  isActive: boolean
  isWrong: boolean
  isHighlighted: boolean

  toggleActive: (num?: number) => {}
  setHighlightedNumber: (num?: number) => {}
}

const Piece: FC<PieceProps> = ({
  number,
  index,
  isActionable,
  isActive,
  isWrong,
  isHighlighted,
  toggleActive,
  setHighlightedNumber,
}) => {
  const constructedClasses = classnames("piece", {
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
    } else if(!isHighlighted && number === 0) {
      setHighlightedNumber(null);
    }
    toggleActive(index)
  }

  return (
    <div className={constructedClasses} onClick={onClick}>
      {number === 0 ? "" : `${number}`}
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleActive: index => dispatch(createBoardToggleActivePieceAction(index)),
  setHighlightedNumber: number =>
    dispatch(createBoardSetHighlightedNumber(number)),
})

export default connect(null, mapDispatchToProps)(Piece)
