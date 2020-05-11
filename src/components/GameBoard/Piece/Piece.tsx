import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardToggleActivePieceAction } from "../../../governor/actions"
import classnames from "classnames"
import "./Piece.scss"

export interface PieceProps {
  number: number
  index: number
  isActionable: boolean
  isActive: boolean
  isWrong: boolean
  toggleActive: (num?: number) => {}
}

const Piece: FC<PieceProps> = ({
  number,
  index,
  toggleActive,
  isActionable,
  isActive,
  isWrong
}) => {
  const constructedClasses = classnames("piece", {
    "piece--active": isActive,
    "piece--not-actionable": !isActionable,
    "piece--is-wrong": isWrong
  })

  return (
    <div
      className={constructedClasses}
      onClick={() => isActionable && toggleActive(index)}
    >
      {number === 0 ? "" : `${number}`}
    </div>
  )
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleActive: index => dispatch(createBoardToggleActivePieceAction(index)),
})

export default connect(null, mapDispatchToProps)(Piece)
