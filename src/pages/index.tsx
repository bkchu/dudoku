import React from "react"
import GameActions from "../components/GameActions/GameActions"
import GameBoard from "../components/GameBoard/GameBoard"
import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GameBoard />
    <GameActions></GameActions>
  </Layout>
)

export default IndexPage
