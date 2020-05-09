import React from "react"
import GameBoard from "../components/GameBoard/GameBoard"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GameBoard />
  </Layout>
)

export default IndexPage
