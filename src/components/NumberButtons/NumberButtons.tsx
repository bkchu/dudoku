import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardSetUserPressedAction } from "../../governor/board/actions"
import {
  selectActivePieceIndex,
  selectBoard,
} from "../../governor/board/selectors"
import { InitialState } from "../../governor/initialState"
import { Board } from "../../models/client/board"
import { countRemainingNumbers } from "../../utils/board"
import "./NumberButtons.css"

export interface NumberButtonsProps {
  onNumberButtonPress: Function
  activePieceIndex: number
  board: Board
}

const NumberButtons: FC<NumberButtonsProps> = ({
  onNumberButtonPress,
  activePieceIndex,
  board,
}) => {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "X"].map(
    key => (
      <button
        className="number-buttons__button"
        key={key}
        onClick={() =>
          activePieceIndex != null &&
          onNumberButtonPress(key === "X" ? 0 : +key)
        }
      >
        <p className="number-buttons__number">{key}</p>
        {key !== "X" && (
          <p className="number-buttons__remaining-count">
            {countRemainingNumbers(board, +key)}
          </p>
        )}
      </button>
    )
  )

  return (
    <div className="number-buttons">
      <div className="number-buttons__container">{buttons}</div>
    </div>
  )
}
const mapStateToProps = (state: InitialState) => ({
  board: selectBoard(state),
  activePieceIndex: selectActivePieceIndex(state),
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNumberButtonPress: (number: number) =>
    dispatch(createBoardSetUserPressedAction(number)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NumberButtons)
