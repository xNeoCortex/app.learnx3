import { useState } from "react"
import { useRouter } from "next/router"
import { useMutation, useQuery } from "react-query"
import { Avatar, Box, Button, TextField, TextareaAutosize, Typography } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import ApiPostServices from "@/pages/api/ApiPostServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import ExplainAI from "@/components/ExplainAI"
import BackButton from "../../components/other/BackButton"
import { useStoreUser } from "@/components/zustand"

function GradeWritingPage() {
	const {
		query: { id },
	} = useRouter()
	const { userInfo } = useStoreUser()
	const [feedback, setFeedback] = useState("")
	const [mark, setMark] = useState(null)
	const [successMessage, setSuccessMessage] = useState(false)

	// add essay feedback
	const { submitFeedback } = ApiPostServices()
	const {
		mutate,
		isLoading: isLoadingFeedback,
		isError: isErrorFeedback,
	} = useMutation((body) => submitFeedback(body, id))

	const submitFeedbackFunc = () => {
		//@ts-ignore
		mutate({
			result: mark,
			feedback: feedback,
		})
		setFeedback("")
		setMark(null)
		setSuccessMessage(true)
	}

	// fetch essay info
	const { fetchEssayInfo } = ApiServices()
	const { data: essayInfo, isLoading, isError } = useQuery("essayInfo", () => fetchEssayInfo(String(id)))

	// manage loading and error
	if (isLoading || isLoadingFeedback) return <LoadingPage />
	if (isError || isErrorFeedback) return <ErrorPage />

	return (
		<Box display="flex" sx={{ position: "relative", width: "100%" }}>
			<div
				style={{
					padding: "20px 10px",
					flex: 2,
					margin: 5,
					borderRadius: 23,
					color: "white",
					height: "100%",
					display: "flex",
					justifyContent: "start",
					alignItems: "center",
					flexDirection: "column",
					background: "rgb(255, 244, 232)",
					boxSizing: "border-box",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "left",
						justifyContent: "start",
						width: "100%",
						padding: "10px 20px",
						marginBottom: 1,
					}}
				>
					<Avatar src="/pupil-avatar.png" sx={{ bgcolor: "grey", width: 100, height: 100 }} />
					<Box
						display="flex"
						alignItems="center"
						flexDirection="column"
						sx={{
							display: "flex",
							width: "100%",
							justifyContent: "center",
							alignItems: "flexStart",
							padding: "0px 30px",
						}}
					>
						<h4
							style={{
								color: "#323331",
								fontWeight: 600,
								fontSize: 18,
								padding: 0,
								margin: 0,
								marginBottom: 15,
							}}
						>
							{essayInfo?.data?.student_name || "No student name"}
						</h4>
						<Box
							sx={{
								display: "flex",
								justifyContent: "start",
								alignItems: "center",
							}}
						>
							{["Class A", `${essayInfo?.data?.level}`].map((item, index) => (
								<p
									key={index}
									style={{
										fontWeight: 500,
										padding: "3px 10px",
										background: "white",
										color: "rgb(50, 50, 93)",
										border: "1px solid rgb(50, 50, 93)",
										maxWidth: "191px",
										borderRadius: 12,
										marginRight: 10,
										fontSize: "12px",
									}}
								>
									{item}
								</p>
							))}
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "center",
						flexDirection: "column",
						width: "100%",
						padding: "10px",
					}}
				>
					<Box
						sx={{
							padding: "10px",
							background: "#bdbdbd33",
							marginBottom: "10px",
							width: "100%",
							borderRadius: 2,
							color: "black",
						}}
					>
						<Typography
							sx={{
								fontSize: 16,
								fontWeight: 600,
								padding: "5px 10px",
								width: "fit-content",
								mb: "10px",
							}}
						>
							Essay Topic: {essayInfo?.data?.topic}
						</Typography>
						<Typography
							sx={{
								padding: "0px 10px",
							}}
						>
							{essayInfo?.data?.essay}
						</Typography>
					</Box>
					<Box
						sx={{
							padding: "10px",
							background: "#bdbdbd33",
							marginBottom: "10px",
							width: "100%",
							borderRadius: 2,
							minHeight: "200px",
							color: "black",
						}}
					>
						{essayInfo?.data?.result?.length > 0 ? (
							<>
								<Typography
									sx={{
										fontSize: 16,
										fontWeight: 600,
										padding: "5px 10px",
										width: "fit-content",
										mb: "10px",
									}}
								>
									Feedback from your Teacher
								</Typography>
								<Typography
									sx={{
										padding: "0px 10px",
									}}
								>
									<p
										dangerouslySetInnerHTML={{
											__html: essayInfo?.data?.feedback.replace(/\n/g, "<br />"),
										}}
									/>
								</Typography>
								<Typography
									sx={{
										padding: "0px 10px",
										marginTop: 5,
										fontSize: 16,
										fontWeight: 600,
									}}
								>
									Your mark is {essayInfo?.data?.result}/100
								</Typography>
							</>
						) : (
							<Typography
								sx={{
									fontSize: 19,
									fontWeight: 600,
									padding: "5px 10px",
									width: "100%",
									display: "flex",
									justifyContent: "space-around",
								}}
							>
								No feedback yet
							</Typography>
						)}
					</Box>
					{userInfo.role == "admin" ||
						(userInfo.role == "teacher" && (
							<>
								<Box sx={{ width: "100%" }}>
									<ExplainAI
										prompt={`You are english teacher. Check the essay of essayInfo with Intermediate level of english and give him detailed feedback on his mistakes. This is the essay ${essayInfo?.data?.essay}. Suggest on which topic a student should focus to improve his weakness based on his essay. Also, give student grade out of 100%.`}
										buttonTitle="Get Feedback and Grade"
										bg="#bdbdbd33"
									/>
								</Box>
								<Box
									sx={{
										display: "flex",
										align: "center",
										marginTop: "10px",
										width: "100%",
										borderRadius: 2,
										gap: 1,
									}}
								>
									<TextareaAutosize
										onChange={(e) => setFeedback(e.target.value)}
										aria-label="empty textarea"
										placeholder="Write your feedback here..."
										value={feedback}
										style={{
											width: "100%",
											borderRadius: "6px",
											padding: "10px 20px",
											minHeight: "85px",
											border: "1px solid #bdbdbd",
											color: "black",
											background: "white",
										}}
									/>
									<Box>
										<TextField
											sx={{
												marginBottom: 1,
												width: "100%",
												background: "white",
											}}
											id="outlined-basic"
											type="number"
											label="Mark"
											variant="outlined"
											value={mark}
											onChange={(e) => setMark(e.target.value)}
										/>
										<Button
											disabled={feedback?.length < 1 || mark?.length < 1}
											onClick={submitFeedbackFunc}
											variant="contained"
											sx={{ width: "100%", background: "rgb(95, 97, 196)" }}
										>
											Submit
										</Button>
									</Box>
								</Box>
								{successMessage && (
									<Box
										sx={{
											background: "rgb(95, 196, 151)",
											display: "flex",
											alignItems: "center",
											justifyContent: "center",
											borderRadius: "8px",
											padding: "20px",
											width: "100%",
											marginTop: 2,
										}}
									>
										<Typography
											sx={{
												width: "100%",
												textAlign: "center",
												fontWeight: "semibold",
												fontSize: "16px",
												color: "white",
											}}
										>
											You have successfully submitted your feedback!
										</Typography>
									</Box>
								)}
							</>
						))}
				</Box>

				<BackButton />
			</div>
		</Box>
	)
}

export default GradeWritingPage
