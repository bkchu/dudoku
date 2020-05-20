/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import { graphql, useStaticQuery } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import Header from "./Header/Header"
import "./layout.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="layout__container">
        <main>{children}</main>
        <footer className="layout__footer">
          <h1>
            © {new Date().getFullYear()}, Built with
            {` `}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.gatsbyjs.org"
            >
              Gatsby
            </a>{" "}
            by{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.bkchu.dev"
              className="layout__footer-personal-link"
            >
              bkchu
            </a>
          </h1>
        </footer>
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
