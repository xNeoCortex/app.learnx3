import React from "react"
import { Button, Box, Typography } from "@mui/material"

type ScoreProps = {
	history: boolean[]
	onNext: () => void
}

const Score: React.FC<ScoreProps> = ({ history, onNext }) => {
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
		return `Thank you for taking our entry-test, your level is ${renderLevel()}`
	}

	return (
		<Box textAlign="center" mt={5}>
			<Typography variant="h3">Score</Typography>
			<Typography variant="h5" mt={3}>
				{rightAnswers} / {history.length}
			</Typography>
			<Typography variant="h6" mt={3} color="textSecondary">
				{renderLevel()}
			</Typography>
			<Typography variant="body1" mt={5}>
				{renderMessage()}
			</Typography>
			<Button variant="contained" color="primary" onClick={onNext} sx={{ mt: 5 }}>
				Start A New Game
			</Button>
		</Box>
	)
}

export default Score

// 10/10: C2 (Proficiency)
// 8-9/10: C1 (Advanced)
// 7/10: B2 (Upper-Intermediate)
// 5-6/10: B1 (Intermediate)
// 3/10: A2 (Pre-Intermediate)
// 1-2/10: A1 (Elementary)
// 0/10: AO (Beginner)
