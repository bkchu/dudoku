import GameActions from "components/GameActions/GameActions"
import GameBoard from "components/GameBoard/GameBoard"
import Layout from "components/layout"
import NumberButtons from "components/NumberButtons/NumberButtons"
import SEO from "components/seo"
// import Timer from "components/Timer/Timer"
import React from "react"

const PlayPage = () => (
  <Layout>
    <SEO title="Play" />
    {/* <Timer /> */}
    <GameBoard />
    <NumberButtons />
    <GameActions />
  </Layout>
)

export default PlayPage
