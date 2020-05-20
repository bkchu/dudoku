
import React from "react"
import GameActions from "../components/GameActions/GameActions"
import GameBoard from "../components/GameBoard/GameBoard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import NumberButtons from "../components/NumberButtons/NumberButtons"

const PlayPage = () => (
  <Layout>
    <SEO title="Play"/>
    <GameBoard />
    <NumberButtons />
    <GameActions />
  </Layout>
)

export default PlayPage
