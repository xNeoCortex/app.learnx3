import { Box } from "@mui/material"
import React from "react"

function CardWrapper({
	children,
	maxWidth = 400,
	maxHeight = 400,
	background = "linear-gradient(45deg, #8b58fe, #5fdee7)",
}) {
	return (
		<Box
			sx={{
				// maxWidth,
				maxHeight: 600,
				width: "100%",
				height: "100%",
				background,
				boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
				borderRadius: "8px",
				cursor: "pointer",
				transition: "transform 0.3s ease-in-out",
				"&:hover": {
					cursor: "pointer",
					transform: "scale(1.02)",
				},
				overflow: "hidden",
				position: "relative",
				p: 2,
			}}
		>
			{children}
		</Box>
	)
}

export default CardWrapper
