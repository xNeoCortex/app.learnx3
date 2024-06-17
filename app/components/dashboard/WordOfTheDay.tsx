import React, { useMemo } from "react"
import { Box, Typography } from "@mui/material"
import { WordOfTheDayData } from "../data/WordOfTheDayData"
import TextToSpeechButton from "../speakpage/TextToSpeechButton"

function WordOfTheDay() {
	const today = new Date().toLocaleDateString()
	const wordToday = useMemo(
		() => WordOfTheDayData.find((item) => new Date(item.date).toLocaleDateString() === today),
		[WordOfTheDayData, today]
	)

	return (
		<Box sx={BoxStyle}>
			<Typography sx={{ color: "white", mb: { xs: 1, sm: 2 } }}>🇬🇧 Word of the Day!</Typography>
			<Typography variant="h4" fontWeight="bolder" sx={TextStyle}>
				<TextToSpeechButton buttonSize="40px" text={wordToday?.word || "cherish"} /> {wordToday?.word || "cherish"}
			</Typography>
			<Typography sx={{ color: "rgb(219 193 228)", mb: "5px" }}>
				{wordToday?.definition || "protect and care for (someone) lovingly."}
			</Typography>
		</Box>
	)
}

export default WordOfTheDay

const BoxStyle = {
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	padding: "10px 20px",
	maxHeight: "250px",
	width: "100%",
	borderRadius: "8px",
	background: "#1d243d",
}

const TextStyle = { color: "white", mb: 1, display: "flex", alignItems: "center", fontSize: { xs: 24, sm: "inherit" } }
