import ProtectedRoute from "@/components/auth/ProtectedRoute"
import Statistics from "@/components/Statistics"
import React from "react"

function ClassStatistics() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher"]}>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Statistics displayGraphs={true} />
			</div>
		</ProtectedRoute>
	)
}

export default ClassStatistics
