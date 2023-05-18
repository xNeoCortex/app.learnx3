import React from "react"
import { Box, CircularProgress } from "@mui/material"

function LoadingPage() {
	return (
		<Box
			sx={{
				display: "flex",
				height: "100%",
				width: "100%",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<CircularProgress />
		</Box>
	)
}

export default LoadingPage
