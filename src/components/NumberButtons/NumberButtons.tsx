import classnames from "classnames"
import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardSetUserPressedAction } from "../../governor/board/actions"
import {
  selectActivePaintNumber,
  selectBoard,
} from "../../governor/board/selectors"
import { InitialState } from "../../governor/initialState"
import { Board } from "../../models/client/board"
import { countRemainingNumbers } from "../../utils/board"
import "./NumberButtons.css"

export interface NumberButtonsProps {
  onNumberButtonPress: Function
  board: Board
  selectedPaintNumber: number
}

const NumberButtons: FC<NumberButtonsProps> = ({
  onNumberButtonPress,
  board,
  selectedPaintNumber,
}) => {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "X"].map(
    key => {
      const countRemaining = countRemainingNumbers(board, +key)
      const _classNames = classnames("number-buttons__button", {
        "number-buttons__button--selected":
          selectedPaintNumber === +key ||
          (selectedPaintNumber === 0 && key === "X"),
      })
      return (
        <button
          className={_classNames}
          key={key}
          onClick={() => onNumberButtonPress(key === "X" ? 0 : +key)}
        >
          <p className="number-buttons__number">{key}</p>
          {key !== "X" && (
            <p className="number-buttons__remaining-count">
              {countRemaining !== 0 ? countRemaining : null}
            </p>
          )}
        </button>
      )
    }
  )

  return (
    <div className="number-buttons">
      <div className="number-buttons__container">{buttons}</div>
    </div>
  )
}
const mapStateToProps = (state: InitialState) => ({
  board: selectBoard(state),
  selectedPaintNumber: selectActivePaintNumber(state),
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNumberButtonPress: (number: number) =>
    dispatch(createBoardSetUserPressedAction(number)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NumberButtons)
