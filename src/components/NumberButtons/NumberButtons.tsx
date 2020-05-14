import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardSetPaintNumberAction } from "../../governor/actions"
import { InitialState } from "../../governor/initialState"
import { selectActivePieceIndex } from "../../governor/selectors"

import './NumberButtons.css';

export interface NumberButtonsProps {
  onNumberButtonPress: Function
  activePieceIndex: number
}

const NumberButtons: FC<NumberButtonsProps> = ({ onNumberButtonPress, activePieceIndex }) => {
  const buttons = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "X",
  ].map(key => (
    <button className="number-buttons__button" key={key} onClick={() => activePieceIndex != null && onNumberButtonPress(key === "X" ? 0 : +key)}>{key}</button>
  ))

  return <div className="number-buttons">{buttons}</div>
}
const mapStateToProps = (state: InitialState) => ({
  activePieceIndex: selectActivePieceIndex(state),
})
const mapDispatchToProps = (dispatch: Dispatch) => ({
  onNumberButtonPress: (number: number) =>
    dispatch(createBoardSetPaintNumberAction(number)),
})
export default connect(mapStateToProps, mapDispatchToProps)(NumberButtons)
