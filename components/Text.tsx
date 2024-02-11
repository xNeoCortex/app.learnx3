import React from "react"
import { Box } from "@mui/material"

function TaskComponent({ title, text }: { title: string; text: string }) {
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
