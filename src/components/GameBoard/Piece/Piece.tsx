import classnames from "classnames"
import { selectGameIsPaused } from "governor/game"
import { InitialState } from "governor/initialState"
import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardSelectPieceAction } from "../../../governor/board"
import PencilGrid from "./PencilGrid/PencilGrid"
import "./Piece.css"

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
}

const Piece: FC<PieceProps> = ({
  number,
  index,
  isActionable,
  isActive,
  isWrong,
  isHighlighted,
  onPieceClick,
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Piece)
