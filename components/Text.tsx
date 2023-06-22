import React from "react"
import { Box } from "@mui/material"

function TaskComponent({ title, text }) {
	return (
		<Box>
			<h3>{title}</h3>
			<p
				dangerouslySetInnerHTML={{
					__html: text.replace(/\n/g, "<br />"),
				}}
			/>
		</Box>
	)
}

export default TaskComponent
