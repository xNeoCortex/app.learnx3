import ExplainAI from "@/components/ExplainAI"
import { Avatar, Box, CssBaseline, TextareaAutosize, Typography } from "@mui/material"
import { useState } from "react"
import { auth } from "./firebaseX"

function FinaAI() {
	const [question, setQuestion] = useState("")

	return (
		<Box sx={{ marginTop: "20px", flexGrow: 1 }}>
			<CssBaseline />
			<Box
				sx={{
					background: "#bdbdbd33",

					padding: "5px 10px",
					borderRadius: 3,
					display: "flex",
					alignItems: "center",
				}}
			>
				<Avatar style={{ width: 80, height: 80 }} alt="professor" src="/fina.image.png" />
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
						Fina
					</Typography>
					<Typography sx={{ margin: "0px 15px 15px" }}>
						Hi {auth.currentUser?.displayName}! I am teacher Fina. How can I help you? 🙂
					</Typography>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					marginTop: 2,
				}}
			>
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
			<Box
				sx={{
					display: "flex",
					marginBottom: "15px",
					flexDirection: "column",
				}}
			>
				<ExplainAI prompt={question} buttonTitle="Explain please" bg="white" />
			</Box>
		</Box>
	)
}

export default FinaAI
