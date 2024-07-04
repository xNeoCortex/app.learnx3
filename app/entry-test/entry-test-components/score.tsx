"use client"
import React from "react"
import { Button, Box, Typography } from "@mui/material"

const Score: React.FC<{
	history: boolean[]
	onNext: () => void
}> = ({ history, onNext }) => {
	const rightAnswers = history.filter((isValidAnswer) => isValidAnswer).length

	const renderLevel = () => {
		switch (rightAnswers) {
			case 10:
				return "C2 (Proficiency)"
			case 8:
			case 9:
				return "C1 (Advanced)"
			case 7:
				return "B2 (Upper-Intermediate)"
			case 5:
			case 6:
				return "B1 (Intermediate)"
			case 3:
				return "A2 (Pre-Intermediate)"
			case 1:
			case 2:
				return "A1 (Elementary)"
			default:
				return "AO (Beginner)"
		}
	}

	const renderMessage = () => {
		return `Thank you for taking our quiz. Your level is ${renderLevel()}.`
	}

	return (
		<Box
			//@ts-ignore
			sx={BoxStyle}
		>
			<Typography variant="h3" sx={{ color: "#3f51b5", mb: 2 }}>
				Score
			</Typography>
			<Typography variant="h5" sx={{ mb: 2 }}>
				{rightAnswers} / {history.length}
			</Typography>
			<Typography variant="h6" sx={{ color: "text.secondary", mb: 3 }}>
				{renderLevel()}
			</Typography>
			<Typography variant="body1" sx={{ mb: 3 }}>
				{renderMessage()}
			</Typography>
			<Button variant="contained" onClick={onNext} sx={ButtonStyle}>
				Start A New Quiz
			</Button>
		</Box>
	)
}

export default Score

const BoxStyle = {
	background: "#bdbdbd33",
	margin: "15px 0px",
	padding: "20px",
	borderRadius: 3,
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	flexDirection: "column",
}

const ButtonStyle = {
	margin: "15px 0px",
	background: "#9d4edd",
	color: "white",
	fontWeight: "600",
}
