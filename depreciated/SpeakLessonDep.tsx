import { Box, Grid, Typography } from "@mui/material"
import React from "react"
import { SpeakY } from "../components/data/SpeakingNew"

function SpeakLessonDep() {
	return (
		<div>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "column",
					justifyContent: "center",
					background: "white",
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
					borderRadius: 3,
					width: "100%",
					p: "20px 0px",
					mt: 3,
				}}
			>
				<Typography style={{ color: "black", margin: "10px 30px", fontWeight: 600, fontSize: 19 }}>
					{" "}
					📣 Most common phrases!
				</Typography>
				<Box>
					<Grid spacing={2} container>
						{SpeakY.phrases?.map((item, index) => (
							<Grid item xs={12} key={item}>
								<Box
									key={index}
									sx={{
										display: "flex",
										alignItems: "center",
										m: "5px 20px",
										padding: "15px",
										borderRadius: 2,
										color: "#323331",
										background: "#dbf48212",
										boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
									}}
								>
									<Typography
										sx={{
											fontSize: 16,
											padding: "5px 10px",
											background: "#f4f482",
											borderRadius: 2,
											width: "fit-content",
											mr: 2,
											color: "white",
											minWidth: "fit-content",
										}}
									>
										🏀{" "}
									</Typography>
									<Typography sx={{ fontSize: 16 }}> {item}</Typography>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "column",
					justifyContent: "center",
					background: "white",
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
					borderRadius: 3,
					width: "100%",
					p: "20px 0px",
					mt: 3,
				}}
			>
				<Typography style={{ color: "black", margin: "10px 30px", fontWeight: 600, fontSize: 19 }}>
					{" "}
					📣 Conversation!
				</Typography>
				<Box>
					<Grid spacing={2} container>
						{SpeakY.conversation.map((item, index) => (
							<Grid item xs={12}>
								<Box
									key={index}
									sx={{
										display: "flex",
										alignItems: "center",
										m: "5px 20px",
										padding: "15px",
										borderRadius: 2,
										color: "#323331",
										background: "#ffadad0a",
										boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
									}}
								>
									<Typography
										sx={{
											fontSize: 16,
											padding: "5px 10px",
											background: item.speaker === "Student" ? "#06d6a0" : "rgb(95, 97, 196)",
											borderRadius: 2,
											width: "fit-content",
											mr: 2,
											color: "white",
											minWidth: "fit-content",
										}}
									>
										{item.speaker === "Student" ? <span>👩‍🎓</span> : <span>👨‍🏫</span>} {item.speaker}
									</Typography>
									<Typography sx={{ fontSize: 16 }}> {item.content}</Typography>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					flexDirection: "column",
					justifyContent: "center",
					background: "white",
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
					borderRadius: 3,
					width: "100%",
					p: "20px 0px",
					mt: 3,
				}}
			>
				<Typography style={{ color: "black", margin: "10px 30px", fontWeight: 600, fontSize: 19 }}>
					{" "}
					🙋‍♀️ Questions to ask!
				</Typography>
				<Box>
					<Grid spacing={2} container>
						{SpeakY.questions.map((item, index) => (
							<Grid item xs={12} key={item}>
								<Box
									key={index}
									sx={{
										display: "flex",
										alignItems: "center",
										m: "5px 20px",
										padding: "15px",
										borderRadius: 2,
										color: "#323331",
										background: "#ffadad0a",
										boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
									}}
								>
									<Typography
										sx={{
											fontSize: 16,
											padding: "5px 10px",
											background: "#f48282",
											borderRadius: 2,
											width: "fit-content",
											mr: 2,
											color: "black",
											minWidth: "fit-content",
										}}
									>
										⁉️{" "}
									</Typography>
									<Typography sx={{ fontSize: 16 }}> {item}</Typography>
								</Box>
							</Grid>
						))}
					</Grid>
				</Box>
			</Box>
		</div>
	)
}

export default SpeakLessonDep
