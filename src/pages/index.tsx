import React from "react"
import GameActions from "../components/GameActions/GameActions"
import GameBoard from "../components/GameBoard/GameBoard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NumberButtons from "../components/NumberButtons/NumberButtons"

const IndexPage = () => (
  <Layout>
    <SEO title="Welcome to Dudoku"/>
    <GameBoard />
    <NumberButtons />
    <GameActions />
  </Layout>
)

export default IndexPage
