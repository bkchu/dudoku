import React, { FC, useEffect, useState } from "react"
import { makeRequest } from "utils/api"
import "./Leaderboard.css"

const Leaderboard: FC = () => {
  const [scores, setScores] = useState([])

  useEffect(() => {
    makeRequest("get-all-scores").then(response => {
      setScores(response.data)
    })
  }, [])

  return (
    <div className="leaderboard">
      Leaderboard
      {scores?.map(score => {
        console.log(score)
        return (
          <div className="leaderboard__score" key={score.ts}>
            <p className="leaderboard__score-username">{score.username}</p>
            <p className="leaderboard__score-time">{score.time}</p>
            <p className="leaderboard__score-difficulty">{score.difficulty}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Leaderboard
