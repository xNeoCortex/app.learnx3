import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { Box, Button, Chip, Container, CssBaseline, Typography } from "@mui/material"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import BackButton from "../../../components/other/BackButton"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { auth } from "../../../components/firebaseX"
import LoadingPage from "@/components/LoadingPage"
import ReadingQuiz from "@/components/assessment/ReadingQuiz"

function TrueFalseQuiz() {
	const {
		query: { id },
	} = useRouter()
	const queryClient = useQueryClient()
	const [score, setScore] = useState(0)
	const [show, setShow] = useState(false)
	const [answers, setAnswers] = useState([])

	const { submitTest } = ApiPostServices()
	const { fetchOneAssessment } = ApiServices()

	// Submit assessment on database
	const { mutate, isLoading, isError } = useMutation((body) => submitTest(body), {
		onSuccess: () => queryClient.invalidateQueries(["testResult"]),
	})

	// Get assessment data from database
	const {
		data: reading_quiz,
		isLoading: isLoadingQuiz,
		isError: isErrorQuiz,
	} = useQuery(["readingAssessment"], () => fetchOneAssessment({ db_collection: "readingAssessment", id: id }))

	function handleSelect(response, index) {
		const newAnswers = [...answers]
		const answer = newAnswers[index]
		answer.response = response
		setAnswers(newAnswers)
	}

	function handleSubmit() {
		const correctAnswers = answers.filter((item) => item.response == item.answer)
		const score = (correctAnswers?.length / answers?.length) * 100

		setShow(true)
		setScore(score)
		//@ts-ignore
		mutate({
			topic: reading_quiz?.data.topic,
			level: reading_quiz?.data.level,
			lesson_number: reading_quiz?.data.lesson_number,
			assessment_type: reading_quiz?.data.question_type,
			result: score,
			assessment_id: reading_quiz?.data.uid,
			student_id: auth.currentUser.uid,
			student_name: auth.currentUser.displayName,
		})
	}

	useEffect(() => {
		setAnswers(reading_quiz?.data?.questions)
	}, [isLoadingQuiz])

	if (isLoading || isLoadingQuiz) <LoadingPage />
	if (isError || isErrorQuiz) <ErrorPage />

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
						{reading_quiz?.data?.topic}
					</Typography>
					<Typography sx={{ margin: "0px 15px 15px" }}>
						{" "}
						Please answer the following questions within 5 minutes.{" "}
					</Typography>
					<BackButton />
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
					{answers?.map((test, index) => (
						<ReadingQuiz key={index} show={show} test={test} index={index} handleSelect={handleSelect} />
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
						You scored {score}% out of 100%
					</Typography>
				)}
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
