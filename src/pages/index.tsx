import React, { FC } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import DifficultySwitcher from "../components/DifficultySwitcher/DifficultySwitcher"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { createBoardLoadBoardAndNavigateAction } from "../governor/board/actions"
import "./index.css"

interface IndexPageProps {
  loadBoardAndNavigate: Function
}

const IndexPage: FC<IndexPageProps> = ({ loadBoardAndNavigate }) => (
  <Layout>
    <Seo title="Welcome" />
    <h1 className="home-page__header">DUEL + SUDOKU = DUDOKU</h1>
    <DifficultySwitcher></DifficultySwitcher>
    <a onClick={() => loadBoardAndNavigate()} className="home-page__play-button">
      Play!
    </a>
  </Layout>
)

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadBoardAndNavigate: () => dispatch(createBoardLoadBoardAndNavigateAction()),
})

export default connect(null, mapDispatchToProps)(IndexPage)
