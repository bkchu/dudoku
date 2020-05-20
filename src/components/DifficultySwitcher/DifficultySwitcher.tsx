import classnames from "classnames"
import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import {
  createBoardSetDifficultyAction,
  selectDifficulty,
} from "../../governor/board"
import { InitialState } from "../../governor/initialState"
import { Difficulty } from "../../models/client/board"
import "./DifficultySwitcher.css"

interface DifficultSwitcherProps {
  setDifficulty: Function
  difficulty: Difficulty
  className?: string
}

const DifficultSwitcher: FC<DifficultSwitcherProps> = ({
  setDifficulty,
  difficulty,
  className
}) => {
  return (
    <div className={classnames("difficulty-switcher", className)}>
      <button
        className={classnames("difficulty-switcher__button", {
          "difficulty-switcher__button--selected":
            difficulty === Difficulty.EASY,
        })}
        onClick={() => setDifficulty(Difficulty.EASY)}
      >
        EASY
      </button>
      <button
        className={classnames("difficulty-switcher__button", {
          "difficulty-switcher__button--selected":
            difficulty === Difficulty.MEDIUM,
        })}
        onClick={() => setDifficulty(Difficulty.MEDIUM)}
      >
        MEDIUM
      </button>
      <button
        className={classnames("difficulty-switcher__button", {
          "difficulty-switcher__button--selected":
            difficulty === Difficulty.HARD,
        })}
        onClick={() => setDifficulty(Difficulty.HARD)}
      >
        HARD
      </button>
    </div>
  )
}

export const mapStateToProps = (state: InitialState) => ({
  difficulty: selectDifficulty(state),
})

export const mapDispatchToProps = (dispatch: Dispatch) => ({
  setDifficulty: (difficulty: Difficulty) =>
    dispatch(createBoardSetDifficultyAction(difficulty)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DifficultSwitcher)
