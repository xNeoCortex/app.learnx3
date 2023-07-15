import { Avatar, Button, capitalize, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"

const SpeakingInfo = ({ topic = "", image }) => {
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
				width: "100%",
				margin: "10px",
				borderRadius: "8px",
				overflow: "hidden",
				position: "relative",
				p: 1,
				background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
			}}
		>
			<Box
				display="flex"
				flexDirection="column"
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "flexStart",
					padding: "20px",
				}}
			>
				<Typography
					style={{
						color: "white",
						fontWeight: 500,
						fontSize: 19,
						padding: 0,
						margin: 0,
						marginBottom: 1,
					}}
				>
					Topic
				</Typography>
				<Typography
					style={{
						color: "white",
						fontWeight: 600,
						fontSize: 32,
						padding: 0,
						margin: 0,
						marginBottom: 10,
					}}
				>
					📚 {capitalize(topic)}
				</Typography>
			</Box>
			<Avatar
				src={image}
				sx={{
					width: 200,
					height: "100%",
					marginRight: "30px",
				}}
			/>
		</Box>
	)
}

export default SpeakingInfo
