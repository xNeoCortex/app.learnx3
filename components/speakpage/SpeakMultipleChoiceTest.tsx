import { useEffect, useState } from "react"
import { Box, Button } from "@mui/material"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import ApiPostServices from "@/pages/api/ApiPostServices"
import LoadingPage from "@/components/LoadingPage"
import CompletedAssessment from "@/components/assessment/CompletedAssessment"
import LinearTimer from "@/components/other/LinearTimer"
import { auth } from "../firebaseX"
import ErrorPage from "@/pages/error"
import SpeakQuiz from "../assessment/SpeakQuiz"

function SpeakMultipleChoiceTest({ lesson, contentIndex, handleNext, handlePrevious }) {
	const queryClient = useQueryClient()
	const [score, setScore] = useState(0)
	const [show, setShow] = useState(false)
	const [quizData, setQuizData] = useState([])
	const [showResultPage, setShowResultPage] = useState(false)

	const { submitTest } = ApiPostServices()

	// Submit assessment on database
	const { mutate, isLoading, isError, isSuccess } = useMutation((body) => submitTest(body), {
		onSuccess: () => (
			queryClient.invalidateQueries(["testResult"]),
			queryClient.invalidateQueries(["myLatestTestResult"]),
			queryClient.invalidateQueries(["mySumTestResult"])
		),
	})

	function handleSelect(response, index) {
		const quizDataCopy = [...quizData]
		const answer = quizDataCopy[index]
		answer.response = response
		setQuizData(quizDataCopy)
	}

	function handleSubmit() {
		const correctAnswers = quizData.filter((item) => item?.response?.correct === true)
		const score = (correctAnswers?.length / quizData?.length) * 100

		setShow(true)
		setScore(score)
		setShowResultPage(true)
		//@ts-ignore
		mutate({
			topic: lesson.topic,
			level: lesson.level,
			assessment_type: lesson.exercise.type,
			result: score,
			assessment_id: lesson?.uid,
			student_id: auth.currentUser?.uid,
			student_name: auth.currentUser.displayName,
		})
	}

	// Dialog
	const [open, setOpen] = useState(false)

	useEffect(() => {
		isSuccess && setOpen(true)
	}, [isLoading])

	// Save quiz data to state
	useEffect(() => {
		setQuizData(lesson?.exercise?.questions)
	}, [])

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	if (show && showResultPage)
		return <CompletedAssessment score={[{ result: score }]} setShowResultPage={setShowResultPage} />
	return (
		<Box
			sx={{
				background: "inherit",
				display: "flex",
				height: "100%",
				flexDirection: "column",
				justifyContent: "space-between",
			}}
		>
			{!show && <LinearTimer minutes={10} handleSubmit={handleSubmit} />}
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					mt: 5,
				}}
			>
				<SpeakQuiz show={show} test={quizData[contentIndex]} index={contentIndex} handleSelect={handleSelect} />
			</Box>

			<Box sx={{ width: "100%", display: "flex" }}>
				<Button
					disabled={!quizData[contentIndex - 1]}
					sx={{
						flex: 1,
						margin: "15px 0px",
						background: "#9d4edd",
						color: "white",
						fontWeight: 600,
						mr: 1,
						"&:hover": { backgroundColor: "#d6a3ff" },
					}}
					onClick={handlePrevious}
				>
					{quizData[contentIndex - 1] ? "Back" : "Back"}
				</Button>
				{!show && !showResultPage ? (
					<Button
						disabled={quizData[contentIndex + 1]}
						sx={{
							flex: 4,
							margin: "15px 0px",
							width: "100%",
							background: "#9d4edd",
							color: "white",
							fontWeight: 600,
							"&:hover": { backgroundColor: "#d6a3ff" },
						}}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				) : (
					<Button
						variant="contained"
						sx={{
							flex: 4,
							margin: "15px 0px",
							width: "100%",
							background: "#9d4edd",
							fontWeight: 600,
							"&:hover": { backgroundColor: "#d6a3ff" },
						}}
						onClick={() => setShowResultPage(true)}
					>
						Show Result
					</Button>
				)}
				<Button
					disabled={!quizData[contentIndex + 1]}
					sx={{
						flex: 1,
						margin: "15px 0px",
						background: "#9d4edd",
						color: "white",
						fontWeight: 600,
						ml: 1,
						"&:hover": { backgroundColor: "#d6a3ff" },
					}}
					onClick={handleNext}
				>
					{quizData[contentIndex + 1] ? "Next" : "Next"}
				</Button>
			</Box>
		</Box>
	)
}

export default SpeakMultipleChoiceTest
