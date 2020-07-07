import GameActions from "components/GameActions/GameActions"
import GameBoard from "components/GameBoard/GameBoard"
import NumberButtons from "components/NumberButtons/NumberButtons"
import SEO from "components/seo"
import Timer from "components/Timer/Timer"
import React from "react"

const PlayPage = () => (
  <>
    <SEO title="Play" />
    <Timer />
    <GameBoard />
    <NumberButtons />
    <GameActions />
  </>
)

export default PlayPage
