import * as React from "react"
import { styled } from "@mui/material/styles"
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip"
import { Box, Zoom } from "@mui/material"

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: "white",
		color: "black",
		boxShadow: theme.shadows[1],
		fontSize: 11,
		padding: 10,
		maxWidth: "fit-content",
	},
}))

export default function MyTooltip({ content, children }) {
	return (
		<div>
			<LightTooltip arrow title={content} TransitionComponent={Zoom}>
				{children}
			</LightTooltip>
		</div>
	)
}
