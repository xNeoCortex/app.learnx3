import { useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { Box, Button, CssBaseline, TextareaAutosize, Typography } from "@mui/material"
import BackButton from "../../../components/other/BackButton"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import { auth } from "@/components/firebaseX"

function WritingTest() {
	const queryClient = useQueryClient()
	const {
		query: { id },
	} = useRouter()
	const [essay, setEssay] = useState("")
	const [show, setShow] = useState(false)
	const [showCongrats, setShowCongrats] = useState(false)
	const { fetchOneAssessment } = ApiServices()

	// Get assessment data from database
	const {
		data: writingAssessment,
		isLoading: isLoadingData,
		isError: isErrorData,
	} = useQuery(["writingAssessment"], () => fetchOneAssessment({ db_collection: "writingAssessment", id: id }))

	// Function to handle essay submission
	const { submitEssay } = ApiPostServices()
	const { mutate, isLoading, isError } = useMutation((body) => submitEssay(body), {
		onSuccess: () => queryClient.invalidateQueries("essayResult"),
	})

	function handleSubmit() {
		//@ts-ignore
		mutate({
			topic: writingAssessment?.data?.topic,
			level: "b1",
			writing_type: writingAssessment?.data?.writing_type,
			essay: essay,
			feedback: "",
			result: null,
			student_id: auth.currentUser.uid,
			student_name: auth.currentUser.displayName,
		})
		setShowCongrats(true)
	}

	if (isLoading || isLoadingData) return <LoadingPage />
	if (isError || isErrorData) return <ErrorPage />

	return (
		<Box
			sx={{
				marginTop: "20px",
				paddingTop: "5px",
				flexGrow: 1,
				background: "rgb(255, 244, 232)",
				borderRadius: 3,
				minHeight: "90vh",
			}}
		>
			<CssBaseline />
			<Box
				sx={{
					background: "#bdbdbd33",
					margin: "15px ",
					padding: "15px",
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
					Topic: {writingAssessment?.data?.topic}
				</Typography>
				<Typography sx={{ margin: "15px 15px -15px", fontWeight: 600 }}>Task Description:</Typography>
				<Typography sx={{ margin: "0px 15px 15px" }}>
					<p
						style={{ color: "black" }}
						dangerouslySetInnerHTML={{
							__html: writingAssessment?.data?.task?.replace(/\n/g, "<br /> "),
						}}
					/>
				</Typography>
				<Box sx={{ marginLeft: 1, display: "flex" }}>
					<span
						style={{
							fontWeight: 600,
							padding: "3px 10px",
							background: "white",
							color: "#41b6ff",
							border: "2px solid #41b6ff",
							borderRadius: 12,
							fontSize: "13px",
							textAlign: "center",
							margin: "10px 5px",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						Word Limit: {writingAssessment?.data?.word_limit}{" "}
					</span>
					<span
						style={{
							fontWeight: 600,
							padding: "3px 10px",
							background: "white",
							color: "#41b6ff",
							border: "2px solid #41b6ff",
							borderRadius: 12,
							fontSize: "13px",
							textAlign: "center",
							margin: "10px 5px",
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
						}}
					>
						Key Words:
						{writingAssessment?.data?.key_words?.map((word) => ` ${word}, `)}
					</span>
				</Box>
				<BackButton />
			</Box>
			{!showCongrats ? (
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						margin: 1,
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "#bdbdbd33",
							color: "#404040",
							borderRadius: 3,
							m: 1,
							width: "97%",
							padding: "30px",
						}}
					>
						<h3
							style={{
								background: "white",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							{" "}
							📝 {writingAssessment?.data?.topic}!
						</h3>
						<p
							style={{ color: "black" }}
							dangerouslySetInnerHTML={{
								__html: writingAssessment?.data?.topic_content?.replace(/\n/g, "<br /> "),
							}}
						/>
					</Box>
					<Box sx={{ margin: 1 }}>
						<TextareaAutosize
							onChange={(e) => setEssay(e.target.value)}
							aria-label="empty textarea"
							placeholder="Write your essay here..."
							value={essay}
							style={{
								width: "100%",
								borderRadius: "6px",
								padding: "10px",
								minHeight: "300px",
								border: "1px solid #bdbdbd",
								background: "white",
								color: "black",
							}}
						/>
					</Box>
					<Button
						sx={{ m: 1, background: "rgb(95, 106, 196)" }}
						variant="contained"
						onClick={handleSubmit}
						disabled={essay.length < 10 ? true : false}
					>
						Submit
					</Button>
				</Box>
			) : (
				<Box
					sx={{
						margin: 2,
						background: "rgb(95, 196, 151)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						minHeight: "300px",
						borderRadius: "12px",
					}}
				>
					<Typography
						sx={{
							textAlign: "center",
							fontWeight: "bold",
							fontSize: "22px",
							color: "white",
						}}
					>
						Congratulations 🎉 <br />
						You have successfully submitted your essay!
					</Typography>
				</Box>
			)}
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
					You scored out of 100%
				</Typography>
			)}
		</Box>
	)
}

export default WritingTest
