import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../../components/firebaseX"
import { Alert, Box, Button, Chip, Container, CssBaseline, TextField, Typography } from "@mui/material"
import BackButton from "../../../components/other/BackButton"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import LinearTimer from "@/components/other/LinearTimer"
import { useStoreUser } from "@/components/zustand"
import CompletedAssessment from "@/components/assessment/CompletedAssessment"
import TaskComponent from "@/components/Text"
import AlertDialog from "@/components/AlertDialog"
import StandTestResult from "@/components/helpers/StandTestResult"

function WordBuildingTest() {
	const {
		query: { id },
	} = useRouter()
	const queryClient = useQueryClient()
	const { userInfo } = useStoreUser()
	const [arrayInput, setArrayInput] = useState([])
	const [buttonDisabled, setButtonDisabled] = useState(true)
	const [show, setShow] = useState(false)
	const [score, setScore] = useState(0)
	const { submitTest } = ApiPostServices()
	const { fetchOneAssessment, fetchTestResult } = ApiServices()

	// get assessment result
	const {
		data: assessmentResult,
		isLoading: isLoadingResult,
		isError: isErrorResult,
	} = useQuery([`testResult-${id}-${userInfo?.uid}`], () => fetchTestResult(String(userInfo?.uid)))

	// Submit assessment on database
	const { mutate, isLoading, isError, isSuccess } = useMutation((body) => submitTest(body), {
		onSuccess: () => queryClient.invalidateQueries(["testResult"]),
	})

	// Get assessment data from database
	const {
		data: word_building,
		isLoading: isLoadingWB,
		isError: isErrorWB,
	} = useQuery(["wordBuildingAssessment"], () =>
		fetchOneAssessment({ db_collection: "wordBuildingAssessment", id: id })
	)

	// Dialog
	const [open, setOpen] = useState(false)

	useEffect(() => {
		isSuccess && setOpen(true)
	}, [isLoading])

	// Get correct answers
	const correctAnswers = word_building?.data?.questions.filter(
		({ answers }, index) => StandTestResult(answers) === StandTestResult(arrayInput[index])
	)

	// Function to handle submit
	function handleSubmit() {
		const scoreX = (correctAnswers?.length / arrayInput?.length) * 100
		setScore(Math.round(scoreX))
		setShow(true)
		setButtonDisabled(false)
		//@ts-ignore
		mutate({
			topic: word_building?.data.topic,
			level: word_building?.data.level,
			lesson_number: word_building?.data.lesson_number,
			assessment_type: word_building?.data.question_type,
			result: score,
			assessment_id: word_building?.data?.uid,
			student_id: auth.currentUser?.uid,
			student_name: auth.currentUser.displayName,
		})
	}

	if (isLoading || isLoadingResult || isLoadingWB) return <LoadingPage />
	if (isError || isErrorResult || isErrorWB) return <ErrorPage />

	const pastScore = assessmentResult?.data.filter((item) => item.assessment_id === id)
	if (pastScore?.length > 0) return <CompletedAssessment score={pastScore} />

	return (
		<Box sx={{ flexGrow: 1, background: "rgba(226, 230, 251, 0.3)" }}>
			<Container sx={{ padding: "20px 5px" }}>
				<AlertDialog
					open={open}
					setOpen={setOpen}
					component={<CompletedAssessment score={[{ result: score }]} handleButton={() => setOpen(false)} />}
				/>
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
						{word_building?.data?.topic}
					</Typography>
					<Typography sx={{ margin: "0px 15px 15px" }}>
						Please answer the following questions within 20 minutes.{" "}
					</Typography>
					<BackButton disabled={buttonDisabled} />
					<Alert severity="error" sx={{ p: 1, m: 2, paddingY: "0px", fontSize: 14 }}>
						Please finish the test and submit before leaving the page to avoid getting 0!
					</Alert>
					<LinearTimer minutes={20} handleSubmit={handleSubmit} />
				</Box>
				<Box
					sx={{
						border: "5px solid #999bff",
						background: "white",
						margin: "15px ",
						padding: " 20px",
						borderRadius: 3,
						position: "relative",
					}}
				>
					<TaskComponent title="Task" text={word_building?.data?.task} />
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						margin: 1,
					}}
				>
					{word_building?.data?.questions.map((test, index) => (
						<EachQuestion
							key={index}
							test={test}
							index={index}
							setArrayInput={setArrayInput}
							arrayInput={arrayInput}
							show={show}
						/>
					))}
				</Box>
				{show && <CompletedAssessment score={[{ result: score }]} />}
				{!show && (
					<Button variant="contained" style={{ margin: 15, background: "rgb(95, 106, 196)" }} onClick={handleSubmit}>
						Submit
					</Button>
				)}
			</Container>
		</Box>
	)
}

export default WordBuildingTest

const EachQuestion = ({ test, index, arrayInput, show, setArrayInput }) => {
	const [answerX, setAnswerX] = useState("")

	const handleInput = () => {
		const w = [...arrayInput]
		w[index] = answerX
		setArrayInput([...w])
	}

	useEffect(() => {
		handleInput()
	}, [answerX])

	return (
		<Box
			key={index}
			mb="10px"
			m={1}
			p={2}
			borderRadius="10px"
			sx={{
				display: "flex",
				p: 3,
				flex: 1,
				margin: 1,
				flexDirection: "column",
				background: show
					? StandTestResult(arrayInput[index]) === StandTestResult(test.answers)
						? "#d8f3dc"
						: "#ffccd578"
					: "white",
				boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
			}}
		>
			<h3>{`${index + 1}. ${test.question}`}</h3>
			{show &&
				(StandTestResult(arrayInput[index]) === StandTestResult(test.answers) ? (
					<h3 style={{ color: "green" }}>Correct!</h3>
				) : (
					<h3 style={{ color: "red" }}>Wrong!</h3>
				))}
			<Chip
				sx={{
					width: "fit-content",
					margin: "20px 0px 0px",
					fontWeight: "bolder",
				}}
				label={test.word}
				color="secondary"
				variant="outlined"
			/>
			<TextField
				sx={{ mt: 2 }}
				id="standard-basic"
				label="Write your answer here"
				variant="standard"
				color="secondary"
				value={arrayInput[index]}
				onChange={(e) => setAnswerX(e.target.value)}
			/>
			{show && (
				<Typography
					sx={{
						mt: 2,
						mb: 1,
						border: "2px solid #06d6a0",
						borderRadius: 2,
						p: 1,
						background: "#06d6a021",
					}}
				>
					Correct Answer: <strong> {test.answers}</strong>
				</Typography>
			)}
			{show && test?.explanation && (
				<Typography
					sx={{
						mb: 1,
						border: "2px solid #ffee32",
						borderRadius: 2,
						p: 1,
						background: "#ffee325e",
					}}
				>
					{" "}
					{test.explanation}
				</Typography>
			)}
		</Box>
	)
}
