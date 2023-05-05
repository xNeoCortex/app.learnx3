import React from "react"
import Statistics from "./Components/Statistics"

function ClassStatistics() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Statistics displayGraphs={true} />
    </div>
  )
}

export default ClassStatistics
