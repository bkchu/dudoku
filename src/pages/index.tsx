import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import Button from "../components/Button/Button"
import DifficultySwitcher from "../components/DifficultySwitcher/DifficultySwitcher"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { createBoardLoadBoardAndNavigateAction } from "../governor/board/actions"
import { selectIsGameInProgress } from "../governor/board/selectors"
import { selectGameIsBoardLoading } from "../governor/game/selectors"
import { InitialState } from "../governor/initialState"
import "./index.css"

interface IndexPageProps {
  isGameInProgress: boolean
  isBoardLoading: boolean
  loadBoardAndNavigate: Function
}

const IndexPage: FC<IndexPageProps> = ({
  loadBoardAndNavigate,
  isGameInProgress,
  isBoardLoading,
}) => (
  <Layout>
    <Seo title="Welcome" />
    <div className="home-page">
      <h1 className="home-page__header">DUDOKU</h1>
      <div className="home-page__difficulty-switcher">
        <DifficultySwitcher />
      </div>
      <div className="home-page__buttons-container">
        <div>
          {isGameInProgress && (
            <Button className="home-page__btn" to="/app/play">
              Resume
            </Button>
          )}
        </div>
        <div>
          <Button
            className="home-page__btn"
            onClick={() => loadBoardAndNavigate()}
            loading={isBoardLoading}
          >
            New Game
          </Button>
        </div>
      </div>
    </div>
  </Layout>
)

const mapStateToProps = (state: InitialState) => ({
  isGameInProgress: selectIsGameInProgress(state),
  isBoardLoading: selectGameIsBoardLoading(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadBoardAndNavigate: () => dispatch(createBoardLoadBoardAndNavigateAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
