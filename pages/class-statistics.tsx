import Statistics from "@/components/Statistics"
import React from "react"

function ClassStatistics() {
	return (
		<div style={{ display: "flex", flexDirection: "column" }}>
			<Statistics displayGraphs={true} />
		</div>
	)
}

export default ClassStatistics
