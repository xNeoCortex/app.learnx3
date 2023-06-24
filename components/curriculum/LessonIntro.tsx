import { Avatar, Button, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import VideocamIcon from "@mui/icons-material/Videocam"
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter"
import { setEnglishLevel } from "../helpers/setEnglishLevel"

export const LessonIntro = ({ lessonState, image, width = "250px" }) => {

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "left",
				justifyContent: "space-between",
				width: "100%",
				background: "rgba(226, 230, 251, 0.3)",
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
					<Typography
						sx={{
							marginRight: 5,
							color: "rgb(50, 50, 93)",
							fontWeight: 600,
							fontSize: 16,
							padding: 0,
							maxWidth: 400,
						}}
					>
						Lesson {lessonState?.data?.lesson_number}
					</Typography>
					<h4
						style={{
							color: "#323331",
							fontWeight: 600,
							fontSize: 28,
							padding: 0,
							margin: 0,
							marginBottom: 10,
						}}
					>
						{capitalizeFirstLetter(lessonState?.data?.topic)}
					</h4>
					<Box
						sx={{
							display: "flex",
							justifyContent: "start",
							alignItems: "center",
						}}
					>
						{["Class A", setEnglishLevel(lessonState?.data?.level), lessonState?.data?.category].map((item) => (
							<p
								style={{
									fontWeight: 500,
									padding: "3px 10px",
									background: "white",
									color: "rgb(50, 50, 93)",
									border: "1px solid rgb(50, 50, 93)",
									maxWidth: "191px",
									borderRadius: 12,
									marginRight: 10,
									fontSize: "12px",
								}}
							>
								{item}
							</p>
						))}
					</Box>
				</Box>
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
