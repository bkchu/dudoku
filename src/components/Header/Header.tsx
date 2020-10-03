import Button from "components/Button/Button"
import { Link } from "gatsby"
import React, { FC } from "react"
import "./Header.css"

export interface HeaderProps {
  siteTitle: string
}

const Header: FC<HeaderProps> = ({ siteTitle }) => {
  return (
    <header className="header">
      <div className="header__title-container">
        <h1 style={{ margin: 0 }} className="header__title">
          <Link className="header__title-link" to="/">
            {siteTitle}
          </Link>
        </h1>
        <Button to="/app/login" className="header__login-button">
          Login
        </Button>
      </div>
    </header>
  )
}

export default Header
