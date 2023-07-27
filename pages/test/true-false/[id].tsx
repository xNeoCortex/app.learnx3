import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Alert, Box, Button, Container, CssBaseline, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import BackButton from "../../../components/other/BackButton"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { auth } from "../../../components/firebaseX"
import LoadingPage from "@/components/LoadingPage"
import ReadingQuiz from "@/components/assessment/ReadingQuiz"
import { useStoreUser } from "@/components/zustand"
import CompletedAssessment from "@/components/assessment/CompletedAssessment"
import LinearTimer from "@/components/other/LinearTimer"
import AlertDialog from "@/components/AlertDialog"

function TrueFalseQuiz() {
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
	const { fetchOneAssessment, fetchTestResults } = ApiServices()

	// Submit assessment on database
	const { mutate, isLoading, isError, isSuccess } = useMutation((body) => submitTest(body), {
		onSuccess: () => queryClient.invalidateQueries(["testResult"]),
	})

	// Get assessment data from database
	const {
		data: reading_quiz,
		isLoading: isLoadingQuiz,
		isError: isErrorQuiz,
	} = useQuery([`readingAssessment-${id}`], () => fetchOneAssessment({ db_collection: "readingAssessment", id: id }))

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
			topic: reading_quiz?.data.topic,
			level: reading_quiz?.data.level,
			lesson_number: reading_quiz?.data.lesson_number,
			assessment_type: reading_quiz?.data.question_type,
			result: score,
			assessment_id: reading_quiz?.data?.uid,
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
		setQuizData(reading_quiz?.data?.questions)
	}, [isLoadingQuiz])

	if (isLoading || isLoadingQuiz || isLoadingResult) return <LoadingPage />
	if (isError || isErrorQuiz || isErrorResult) return <ErrorPage />

	const pastScore = assessmentResult?.data.filter((item) => item.assessment_id === id)
	// if (pastScore?.length > 0) return <CompletedAssessment score={pastScore} />
	return (
		<Box sx={{ flexGrow: 1, background: "rgba(226, 230, 251, 0.3)" }}>
			<Container sx={{ padding: "20px 5px" }}>
				<AlertDialog open={open} setOpen={setOpen} component={<CompletedAssessment score={[{ result: score }]} />} />
				<CssBaseline />
				<Box
					sx={{
						background: "#bdbdbd33",
						margin: "15px ",
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
							color: "rgb(50, 50, 93)",
						}}
					>
						{reading_quiz?.data?.topic}
					</Typography>
					<Typography sx={{ margin: "0px 15px 15px" }}>
						{" "}
						Please answer the following questions within 10 minutes.{" "}
					</Typography>
					<BackButton disabled={buttonDisabled} />
					<Alert severity="error" sx={{ p: 1, m: 2, paddingY: "0px", fontSize: 14 }}>
						Please finish the test and submit before leaving the page to avoid getting 0!
					</Alert>
					<LinearTimer minutes={10} handleSubmit={handleSubmit} />
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						margin: 2,
						padding: 4,
						background: "#f4eee3",
						color: "#404040",
						borderRadius: 3,
					}}
				>
					<h3>📝 {reading_quiz?.data?.topic} </h3>
					<p
						style={{ color: "black" }}
						dangerouslySetInnerHTML={{
							__html: reading_quiz?.data?.content
								?.replace(/\n/g, "<br /> <br />")
								.replace(/\*([^*]+)\*/g, "<strong>$1</strong>"),
						}}
					/>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						margin: 1,
						mt: 5,
					}}
				>
					<h3 style={{ margin: 12 }}>❓ Questions </h3>
					{quizData?.map((test, index) => (
						<ReadingQuiz key={index} show={show} test={test} index={index} handleSelect={handleSelect} />
					))}
				</Box>
				{show && <CompletedAssessment score={[{ result: score }]} />}
				{!show && (
					<Button
						variant="contained"
						style={{
							margin: 15,
							minWidth: 200,
							background: "rgb(95, 106, 196)",
						}}
						onClick={handleSubmit}
					>
						Submit
					</Button>
				)}
			</Container>
		</Box>
	)
}

export default TrueFalseQuiz
