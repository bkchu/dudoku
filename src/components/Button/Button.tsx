import { Link } from "gatsby"
import React, { FC, MouseEventHandler } from "react"
import Spinner from "../../components/Spinner/Spinner"
import "./Button.css"

interface ButtonProps {
  onClick?: MouseEventHandler
  to?: string
  children: JSX.Element | string
  loading?: boolean
}

const Button: FC<ButtonProps> = ({
  to,
  onClick,
  children,
  loading = false,
}) => {
  return (
    <>
      {to != null ? (
        <Link className="button" to={to}>
          {loading ? <Spinner /> : children}
        </Link>
      ) : (
        <button className="button" onClick={onClick}>
          {loading ? <Spinner /> : children}
        </button>
      )}
    </>
  )
}

export default Button
