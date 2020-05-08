import { Link } from "gatsby"
import { InitialState } from "../governor/initialState"
import { selectBoard } from "../governor/selectors"
import React, { FC, useEffect } from "react"
import { connect } from "react-redux"
import { Dispatch } from "redux"
import { createBoardFetchAction } from "../governor/actions"

export interface HeaderProps {
  fetchBoard: () => {}
  board: string
  siteTitle: string
}

const Header: FC<HeaderProps> = ({ fetchBoard, board, siteTitle }) => {
  useEffect(() => {
    fetchBoard()
  }, [])

  return (
    <header
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <h1 style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              color: `white`,
              textDecoration: `none`,
            }}
          >
            {siteTitle}
            {JSON.stringify(board)}
          </Link>
        </h1>
      </div>
    </header>
  )
}

function mapStateToProps(state: InitialState) {
  return {
    board: selectBoard(state),
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchBoard: () => {
      dispatch(createBoardFetchAction())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
