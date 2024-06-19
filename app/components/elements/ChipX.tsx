import { Box } from "@mui/material"
import React, { memo } from "react"

const ChipX = memo(({ text, color = "#5f61c4", style }: { text: string; color?: string; style?: any }) => {
	return (
		<Box
			//@ts-ignore
			sx={{
				color,
				background: "transparent",
				border: `1px solid ${color}`,
				margin: "10px 5px 10px 0",
				borderRadius: "5px",
				fontSize: "10px",
				p: "3px 8px",
				textAlign: "center",
				...style,
			}}
		>
			{text}
		</Box>
	)
})

export default ChipX
