import { Link } from "gatsby"
import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import DifficultySwitcher from "../components/DifficultySwitcher/DifficultySwitcher"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { createBoardLoadBoardAndNavigateAction } from "../governor/board/actions"
import { selectIsGameInProgress } from "../governor/board/selectors"
import { InitialState } from "../governor/initialState"
import "./index.css"

interface IndexPageProps {
  isGameInProgress: boolean
  loadBoardAndNavigate: Function
}

const IndexPage: FC<IndexPageProps> = ({
  loadBoardAndNavigate,
  isGameInProgress,
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
            <Link to="/play" className="home-page__play-button">
              Resume
            </Link>
          )}
        </div>
        <div>
          <a
            onClick={() => loadBoardAndNavigate()}
            className="home-page__play-button"
          >
            New Game
          </a>
        </div>
      </div>
    </div>
  </Layout>
)

const mapStateToProps = (state: InitialState) => ({
  isGameInProgress: selectIsGameInProgress(state),
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadBoardAndNavigate: () => dispatch(createBoardLoadBoardAndNavigateAction()),
})

export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)
