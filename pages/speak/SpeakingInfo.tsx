import { Avatar, Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import VideocamIcon from "@mui/icons-material/Videocam"

const SpeakingInfo = ({ topic, image, width = "150px" }) => {
	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "left",
				justifyContent: "space-between",
				width: "100%",
				background: "rgb(95, 106, 196)",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
				borderRadius: 3,
				p: 1,
				mb: 3,
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
				<Box>
					<h4
						style={{
							color: "white",
							fontWeight: 600,
							fontSize: 28,
							padding: 0,
							margin: 0,
							marginBottom: 10,
						}}
					>
						Topic: {topic} 📚
					</h4>
					<Box
						sx={{
							display: "flex",
							justifyContent: "start",
							alignItems: "center",
						}}
					></Box>
				</Box>
				<Box>
					<a
						style={{
							padding: 0,
							margin: 0,
						}}
						target="_blank"
						rel="noreferrer"
						href={`https://meet.google.com/spb-qdmh-sij`}
					>
						<Button
							variant="outlined"
							sx={{
								mt: "10px",
								textTransform: "none",
								color: "white",
								borderColor: "white",
							}}
						>
							<VideocamIcon
								style={{
									marginRight: 6,
									// color: "#5f61c4"
								}}
							/>
							Video Call
						</Button>
					</a>
				</Box>
			</Box>
			<Avatar
				src={image}
				sx={{
					width,
					height: "100%",
					borderRadius: "0px",
					position: "relative",
					bottom: 20,
					right: 120,
				}}
			/>
		</Box>
	)
}

export default SpeakingInfo
