"use client"
import React, { useEffect, useState } from "react"
import { Box, Button, Dialog, DialogContent, IconButton, Typography, CssBaseline, styled } from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import { QuizItem } from "../../../types/quizType"
import { shuffleArray } from "../../utils/shuffleArray"
import Timer from "./timer"

type PlayQuizProps = {
	quiz: QuizItem[]
	onFinished: (history: boolean[]) => void
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
		background: "rgb(4 0 21 / 100%)",
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

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

	const handleAnswerChange = (selectedAnswer: string) => {
		if (questionStatus === "unanswered") {
			setAnswer(selectedAnswer)
		}
	}

	const handleTimerFinish = () => {
		onFinished([...history, false])
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
		<BootstrapDialog open={true} fullWidth maxWidth="md">
			<DialogContent dividers>
				<CssBaseline />
				<Box
					//@ts-ignore
					sx={{
						width: "100%",
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						mb: 3,
					}}
				>
					<Typography sx={{ color: "white", fontWeight: 600, fontSize: 22 }}>
						Quiz [{currentQuizItemIndex + 1}/{quiz.length}]
					</Typography>
					<IconButton onClick={() => onFinished(history)}>
						<CloseIcon sx={{ color: "white" }} />
					</IconButton>
				</Box>
				<Timer onFinished={handleTimerFinish} />
				<Box
					key={currentQuizItemIndex}
					mb="10px"
					borderRadius="10px"
					sx={BoxStyle(questionStatus === "invalid", questionStatus === "valid")}
				>
					<Typography fontWeight="bolder" sx={{ color: "white", fontSize: 18 }}>
						{`${currentQuizItemIndex + 1}. ${currentQuizItem.question}`}
					</Typography>
					<Box>
						{availableAnswers.map((availableAnswer, index) => (
							<Typography
								key={index}
								onClick={() => handleAnswerChange(availableAnswer)}
								sx={TextStyle(answer, availableAnswer)}
							>
								{String.fromCharCode(65 + index)}. {availableAnswer}
							</Typography>
						))}
					</Box>
					{questionStatus !== "unanswered" && (
						<Typography sx={TextStyleAnswer}>
							Correct Answer: <strong>{currentQuizItem.answer}</strong>
						</Typography>
					)}
					{questionStatus !== "unanswered" && (
						<Box textAlign="center" mt={3}>
							<Button sx={ButtonStyle} variant="contained" onClick={handleNextQuestion}>
								Next Question
							</Button>
						</Box>
					)}
				</Box>
			</DialogContent>
		</BootstrapDialog>
	)
}

export default PlayQuiz

const BoxStyle = (show: boolean, correct: boolean | undefined) => {
	return {
		display: "flex",
		flex: 1,
		flexDirection: "column",
		background: show ? (correct ? "#06d6a021" : "#ef233c26") : "transparent",
		border: show ? (correct ? "2px solid #06d6a0" : "2px solid #ef233c") : "transparent",
		p: show ? 1 : 0,
		boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
	}
}

const TextStyle = (responseOption: string | undefined, option: string | undefined) => {
	return {
		cursor: "pointer",
		border: responseOption == option ? "3px solid #90e0ef" : "1px solid #90e0ef",
		borderRadius: 2,
		color: "#e1e1e1",
		width: "100%",
		margin: "20px 20px 0px 0px",
		fontSize: 16,
		p: 2,
		textAlign: "start",
		background: responseOption == option ? "rgb(144 224 239 / 30%)" : "transparent",
	}
}

const TextStyleAnswer = {
	mt: 2,
	mb: 1,
	border: "2px solid #06d6a0",
	borderRadius: 2,
	p: 1,
	background: "#06d6a0",
	color: "black",
}

const ButtonStyle = {
	flex: 1,
	margin: "15px 0px",
	background: "#9d4edd",
	color: "white",
	fontWeight: "600",
	"&:hover": { backgroundColor: "#d6a3ff" },
}
