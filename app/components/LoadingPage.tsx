import React from "react"
import { Box } from "@mui/material"
import { GridLoader } from "react-spinners"

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
			<GridLoader color="#5f61c4" />
		</Box>
	)
}

export default LoadingPage
