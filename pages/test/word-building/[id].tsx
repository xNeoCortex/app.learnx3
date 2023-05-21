import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { auth } from "../../../components/firebaseX"
import { Box, Button, Chip, Container, CssBaseline, TextField, Typography } from "@mui/material"
import BackButton from "../../../components/other/BackButton"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"

function WordBuildingTest() {
	const {
		query: { id },
	} = useRouter()

	const queryClient = useQueryClient()
	const [arrayInput, setArrayInput] = useState([])
	const [show, setShow] = useState(false)
	const [score, setScore] = useState(0)
	const { submitTest } = ApiPostServices()
	const { fetchOneAssessment } = ApiServices()

	// Submit assessment on database
	const { mutate, isLoading, isError } = useMutation((body) => submitTest(body), {
		onSuccess: () => queryClient.invalidateQueries(["testResult"]),
	})

	// Get assessment data from database
	const { data: word_building } = useQuery(["word_building"], () =>
		fetchOneAssessment({ db_collection: "word_building", id: id })
	)

	// Get correct answers
	const correctAnswers = word_building?.data.questions.filter((item) => arrayInput.includes(item.answers))

	// Function to handle submit
	function handleSubmit() {
		const score = (correctAnswers.length / arrayInput.length) * 100
		setScore(Math.round(score))
		setShow(true)
		//@ts-ignore
		mutate({
			topic: word_building?.data.topic,
			level: word_building?.data.level,
			lesson_number: word_building?.data.lesson_number,
			assessment_type: word_building?.data.question_type,
			result: score,
			assessment_id: word_building?.data.uid,
			student_id: auth.currentUser.uid,
			student_name: auth.currentUser.displayName,
		})
	}

	if (isLoading) <LoadingPage />
	if (isError) <ErrorPage />

	return (
		<Box sx={{ flexGrow: 1, background: "rgba(226, 230, 251, 0.3)" }}>
			<Container sx={{ padding: "20px 5px" }}>
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
						{" "}
						Please answer the following questions within 15 minutes.{" "}
					</Typography>
					<BackButton />
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
				{show && (
					<Typography
						sx={{
							flex: 1,
							margin: "0px 15px",
							mb: 1,
							border: "2px solid #3c096c",
							borderRadius: 3,
							p: 1,
							background: "#e0aaff",
							textAlign: "center",
							fontWeight: 600,
						}}
					>
						You scored {Math.round(score)}% out of 100%
					</Typography>
				)}
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
				background: show ? (answerX.trim() === test.answers ? "#d8f3dc" : "#ffccd578") : "white",
				boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
			}}
		>
			<h3>{test.question}</h3>
			{show &&
				(answerX.trim() === test.answers ? (
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
