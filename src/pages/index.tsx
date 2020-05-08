import React from "react"
import Board from "../components/Board/Board"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Board />
  </Layout>
)

export default IndexPage
