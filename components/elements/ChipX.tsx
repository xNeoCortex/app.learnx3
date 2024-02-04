import { Box } from "@mui/material"
import React from "react"

function ChipX({ text, color = "#5f61c4" }: { text: string; color?: string }) {
	return (
		<Box
			sx={{
				color,
				background: "transparent",
				border: `1px solid ${color}`,
				margin: "10px 5px 10px 0",
				borderRadius: "0.75rem",
				fontSize: "10px",
				p: "5px 10px",
				textAlign: "center",
			}}
		>
			{text}
		</Box>
	)
}

export default ChipX
