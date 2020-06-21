import { Link } from "gatsby"
import React, { FC, MouseEventHandler } from "react"
import Spinner from "../../components/Spinner/Spinner"
import classnames from 'classnames';
import "./Button.css"

interface ButtonProps {
  onClick?: MouseEventHandler
  to?: string
  children: JSX.Element | string
  loading?: boolean
  className?: string
}

const Button: FC<ButtonProps> = ({
  to,
  onClick,
  children,
  loading = false,
  className
}) => {
  const _className = classnames('button', className)
  return (
    <>
      {to != null ? (
        <Link className={_className} to={to}>
          {loading ? <Spinner /> : children}
        </Link>
      ) : (
        <button className={_className} onClick={onClick}>
          {loading ? <Spinner /> : children}
        </button>
      )}
    </>
  )
}

export default Button
