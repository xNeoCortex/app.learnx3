import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Alert, Box, Button, capitalize, Container, CssBaseline, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ReadingQuiz from "@/components/assessment/ReadingQuiz"
import { useStoreUser } from "@/components/zustand"
import CompletedAssessment from "@/components/assessment/CompletedAssessment"
import LinearTimer from "@/components/other/LinearTimer"
import AlertDialog from "@/components/AlertDialog"
import { auth } from "../firebaseX"
import ErrorPage from "@/pages/error"
import SpeakQuiz from "../assessment/SpeakQuiz"

function SpeakMultipleChoiceTest({ lesson }) {
	const {
		query: { id },
	} = useRouter()
	const queryClient = useQueryClient()
	const { userInfo } = useStoreUser()
	const [score, setScore] = useState(0)
	const [show, setShow] = useState(false)
	const [quizData, setQuizData] = useState([])
	const [buttonDisabled, setButtonDisabled] = useState(true)

	const { submitTest } = ApiPostServices()
	const { fetchTestResults } = ApiServices()

	// Submit assessment on database
	const { mutate, isLoading, isError, isSuccess } = useMutation((body) => submitTest(body), {
		onSuccess: () => queryClient.invalidateQueries(["testResult"]),
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
		setButtonDisabled(false)
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

	// get assessment result
	const {
		data: assessmentResult,
		isLoading: isLoadingResult,
		isError: isErrorResult,
	} = useQuery([`testResult-${id}-${userInfo?.uid}`], () => fetchTestResults(String(userInfo?.uid)))

	useEffect(() => {
		setQuizData(lesson?.exercise?.questions)
	}, [])

	if (isLoading || isLoadingResult) return <LoadingPage />
	if (isError || isErrorResult) return <ErrorPage />

	const pastScore = assessmentResult?.data.filter((item) => item.assessment_id === id)
	// if (pastScore?.length > 0) return <CompletedAssessment score={pastScore} />
	return (
		<Box sx={{ flexGrow: 1, background: "#161F23" }}>
			<AlertDialog
				open={open}
				setOpen={setOpen}
				component={<CompletedAssessment score={[{ result: score }]} handleButton={() => setOpen(false)} />}
			/>
			<CssBaseline />
			<Box
				sx={{
					background: "#bdbdbd33",
					margin: "15px 0px",
					padding: "1px 0px",
					borderRadius: 3,
					position: "relative",
				}}
			>
				<Typography
					sx={{
						margin: "15px 15px 0px",
						marginBottom: "10px",
						fontWeight: 600,
						fontSize: "19px",
						color: "white",
					}}
				>
					{capitalize(lesson?.topic)}
				</Typography>
				<Typography sx={{ margin: "0px 15px 15px", color: "grey" }}>
					{" "}
					Please answer the following questions within 10 minutes.{" "}
				</Typography>
				{/* <Alert severity="error" sx={{ p: 1, m: 2, paddingY: "0px", fontSize: 14 }}>
					Please finish the test and submit before leaving the page to avoid getting 0!
				</Alert> */}
				<LinearTimer minutes={10} handleSubmit={handleSubmit} />
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					mt: 5,
				}}
			>
				{quizData?.map((test, index) => (
					<SpeakQuiz key={index} show={show} test={test} index={index} handleSelect={handleSelect} />
				))}
			</Box>
			{show && <CompletedAssessment score={[{ result: score }]} />}
			{!show && (
				<Button
					variant="contained"
					style={{
						margin: "15px 0px",
						width: "100%",
						background: "rgb(95, 106, 196)",
					}}
					onClick={handleSubmit}
				>
					Submit
				</Button>
			)}
		</Box>
	)
}

export default SpeakMultipleChoiceTest
