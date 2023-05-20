import React from "react"
import { Box } from "@mui/material"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import Statistics from "@/components/Statistics"

function ClassStatistics() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher"]}>
			<SidebarContainer>
				<Box style={{ display: "flex", flexDirection: "column" }}>
					<Statistics displayGraphs={true} />
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default ClassStatistics
