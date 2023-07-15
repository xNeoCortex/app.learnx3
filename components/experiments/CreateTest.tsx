import { Avatar, Box, CssBaseline, TextareaAutosize, Typography } from "@mui/material"
import { useState } from "react"
import { auth } from "../firebaseX"

function CreateTest() {
	const [question, setQuestion] = useState("create 3 multiple choice question on topic verb  ")

	return (
		<Box sx={{ marginTop: "20px", flexGrow: 1 }}>
			<CssBaseline />
			<Box
				sx={{
					background: "#bdbdbd33",
					margin: "15px ",
					padding: "5px 10px",
					borderRadius: 3,
					display: "flex",
					alignItems: "center",
				}}
			>
				<Avatar style={{ width: 80, height: 80 }} alt="professor" src="/teacher-johny.png" />
				<Box>
					<Typography
						sx={{
							margin: "15px 15px 0px",
							marginBottom: "10px",
							fontWeight: 600,
							fontSize: "19px",
							color: "rgb(50, 50, 93)",
						}}
					>
						Teacher Fina
					</Typography>
					<Typography sx={{ margin: "0px 15px 15px" }}>
						Hi {auth.currentUser?.displayName}! I am teacher Fina. How can I help you? 🙂
					</Typography>
				</Box>
			</Box>
			<p>create 3 multiple choice question on topic verb</p>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					margin: 1,
				}}
			>
				<Box sx={{ margin: 1 }}>
					<TextareaAutosize
						onChange={(e) => setQuestion(e.target.value)}
						aria-label="empty textarea"
						placeholder="Ask your question here..."
						value={question}
						style={{
							width: "100%",
							borderRadius: "6px",
							padding: "10px",
							minHeight: "60px",
							border: "1px solid #bdbdbd",
							background: "white",
							color: "black",
						}}
					/>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					marginX: "15px",
					marginBottom: "15px",
					flexDirection: "column",
				}}
			></Box>
		</Box>
	)
}

export default CreateTest
