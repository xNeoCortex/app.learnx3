import React, { useState } from "react"
import { Container, Typography, Button } from "@mui/material"
import PlayQuiz from "../../components/entry-test/play-quiz"
import { initialQuestions } from "../../components/data/initial-questions.json"
import { QuizItem } from "../../types/quizType"
import { shuffleArray } from "../../components/utils/shuffleArray"

type ProficiencyLevel = {
	scoreRange: [number, number]
	level: string
}

const proficiencyLevels: ProficiencyLevel[] = [
	{ scoreRange: [10, 10], level: "C2 (Proficiency)" },
	{ scoreRange: [8, 9], level: "C1 (Advanced)" },
	{ scoreRange: [7, 7], level: "B2 (Upper-Intermediate)" },
	{ scoreRange: [5, 6], level: "B1 (Intermediate)" },
	{ scoreRange: [3, 4], level: "A2 (Pre-Intermediate)" },
	{ scoreRange: [1, 2], level: "A1 (Elementary)" },
	{ scoreRange: [0, 0], level: "AO (Beginner)" },
]

const OnboardingTestPage: React.FC = () => {
	const shuffledQuestions: QuizItem[] = shuffleArray(initialQuestions)

	const [proficiency, setProficiency] = useState<string | null>(null)

	const handleQuizFinish = (history: boolean[]) => {
		const correctAnswers = history.filter((answer) => answer).length

		const level = proficiencyLevels.find(
			(level) => correctAnswers >= level.scoreRange[0] && correctAnswers <= level.scoreRange[1]
		)

		if (level) {
			setProficiency(level.level)
		}
	}

	return (
		<Container maxWidth="md" sx={{ mt: 5 }}>
			<Typography variant="h4" align="center" gutterBottom>
				This is the onboarding test.
			</Typography>
			{proficiency ? (
				<Typography variant="h5" align="center">
					Your proficiency level is: {proficiency}
					{/* <Button sx={ButtonStyle} variant="contained">
						Go to Dashboard
					</Button> */}
				</Typography>
			) : (
				<PlayQuiz quiz={shuffledQuestions} onFinished={handleQuizFinish} />
			)}
		</Container>
	)
}

export default OnboardingTestPage

const ButtonStyle = {
	flex: 1,
	margin: "15px 0px",
	background: "#9d4edd",
	color: "white",
	fontWeight: "600",
}
