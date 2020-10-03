import classnames from "classnames"
import { Link } from "gatsby"
import React, { FC, MouseEventHandler } from "react"
import Spinner from "../../components/Spinner/Spinner"
import "./Button.css"

interface ButtonProps {
  onClick?: MouseEventHandler
  to?: string
  children: JSX.Element | string
  loading?: boolean
  className?: string
  type?: "button" | "submit" | "reset"
}

const Button: FC<ButtonProps> = ({ to, onClick, children, loading = false, className, type }) => {
  const _className = classnames("button", className)
  return (
    <>
      {to != null ? (
        <Link className={_className} to={to}>
          {loading ? <Spinner /> : children}
        </Link>
      ) : (
        <button className={_className} onClick={onClick} type={type}>
          {loading ? <Spinner /> : children}
        </button>
      )}
    </>
  )
}

export default Button
