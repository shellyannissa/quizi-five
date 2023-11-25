import React from 'react'
import "./BarGraph.css"

export const BarGraph = ({counts, totalVotes, index, selectedOption , isCorrect}) => {
  return (
    <div className="bar-graph">
        <div className={`option bar ${isCorrect(index) ? "correct" : (selectedOption === index) ? "incorrect" : ""}`} style={{width: `${(counts[index] / totalVotes) * 100}%`}}>{((counts[index] / totalVotes) * 100).toFixed(2)}%</div>
    </div>
  )
}
