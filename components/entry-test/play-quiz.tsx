import React, { useEffect, useState } from "react"
import { Container, Box, Typography, RadioGroup, FormControlLabel, Button, Radio, Grid } from "@mui/material"
import Timer from "./timer"
import { QuizItem } from "../../types/quizType"
import { shuffleArray } from "../utils/shuffleArray"
import { on } from "events"

type PlayQuizProps = {
	quiz: QuizItem[]
	onFinished: (history: boolean[]) => void
}

const PlayQuiz: React.FC<PlayQuizProps> = ({ quiz, onFinished }) => {
	const [currentQuizItemIndex, setCurrentQuizItemIndex] = useState<number>(0)
	const [availableAnswers, setAvailableAnswers] = useState<string[]>([])
	const [history, setHistory] = useState<boolean[]>([])
	const [answer, setAnswer] = useState<string>()
	const [questionStatus, setQuestionStatus] = useState<"valid" | "invalid" | "unanswered">("unanswered")

	const currentQuizItem: QuizItem = quiz[currentQuizItemIndex]

	useEffect(() => {
		setAvailableAnswers(
			shuffleArray([
				currentQuizItem.answer,
				...currentQuizItem.options.filter((option) => option !== currentQuizItem.answer),
			])
		)
	}, [currentQuizItemIndex])

	useEffect(() => {
		if (answer) {
			const isValid = isValidAnswer(answer)
			setQuestionStatus(isValid ? "valid" : "invalid")
			setHistory((prevHistory) => [...prevHistory, isValid])
		}
	}, [answer])

	const isValidAnswer = (answer: string): boolean => {
		return answer === currentQuizItem.answer
	}

	const renderProgressBar = () => {
		return (
			<Box display="flex" justifyContent="center" my={2}>
				{quiz.map((_, i) => (
					<Box
						key={i}
						width={25}
						height={10}
						mx={0.5}
						bgcolor={i >= currentQuizItemIndex ? "gray" : history[i] ? "navy" : "navy"}
					/>
				))}
			</Box>
		)
	}

	const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (questionStatus === "unanswered") {
			setAnswer((event.target as HTMLInputElement).value)
		}
	}

	const handleTimerFinish = () => {
		setHistory((prevHistory) => [...prevHistory, false])
		setQuestionStatus("invalid")
		onFinished(history)
	}

	const handleNextQuestion = () => {
		if (currentQuizItemIndex < quiz.length - 1) {
			setQuestionStatus("unanswered")
			setCurrentQuizItemIndex(currentQuizItemIndex + 1)
			setAnswer(undefined)
		} else {
			onFinished(history)
		}
	}

	return (
		<Container maxWidth="md" sx={{ textAlign: "center", mt: 5 }}>
			{renderProgressBar()}
			{questionStatus === "unanswered" && (
				<Box position="absolute" top={50} right={50}>
					<Timer max={10} onFinished={handleTimerFinish} />
				</Box>
			)}
			<Typography variant="h4" component="div" sx={{ mt: 5, mb: 2 }}>
				{currentQuizItem.question}
			</Typography>
			<RadioGroup value={answer} onChange={handleAnswerChange}>
				<Grid container spacing={2}>
					{availableAnswers.map((availableAnswer, index) => (
						<Grid item xs={6} key={index}>
							<FormControlLabel
								value={availableAnswer}
								control={<Radio />}
								label={
									<span
									// style={{
									//   color:
									//     questionStatus === "unanswered"
									//       ? "black"
									//       : isValidAnswer(availableAnswer)
									//       ? "black"
									//       : "black",
									// }}
									>
										{availableAnswer}
									</span>
								}
							/>
						</Grid>
					))}
				</Grid>
			</RadioGroup>
			{questionStatus !== "unanswered" && (
				<Box mt={3}>
					<Typography variant="h6" color={questionStatus === "valid" ? "green" : "red"}>
						{/* {questionStatus === "valid" ? "Correct!" : "Incorrect!"} */}
					</Typography>
					<Button sx={ButtonStyle} variant="contained" onClick={handleNextQuestion}>
						Next Question
					</Button>
				</Box>
			)}
		</Container>
	)
}

export default PlayQuiz

const ButtonStyle = {
	flex: 1,
	margin: "15px 0px",
	background: "#9d4edd",
	color: "white",
	fontWeight: "600",
}
