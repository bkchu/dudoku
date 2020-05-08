import React from "react"
import GameBoard from "../components/GameBoard/GameBoard"
import Layout from "../components/Layout"
import SEO from "../components/Seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <GameBoard />
  </Layout>
)

export default IndexPage
