import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useEffect } from "react"
import axios from "axios"

const Header = ({ siteTitle }) => {
  useEffect(() => {
    async function getSudokuBoard() {
      const response = await axios.get("/.netlify/functions/get-sudoku-board")
      console.log(response);
    }

    getSudokuBoard();
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
          </Link>
        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
