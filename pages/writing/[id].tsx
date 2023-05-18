import { useState } from "react"
import { Box, Button, CssBaseline, TextareaAutosize, Typography } from "@mui/material"
import ApiPostServices from "@/pages/api/ApiPostServices"
import { WritingData } from "@/components/data/WritingData"
import { useMutation, useQueryClient } from "react-query"
import { useRouter } from "next/router"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import BackButton from "@/components/other/BackButton"
import { auth } from "@/components/firebaseX"

function Writing() {
	const {
		query: { id },
	} = useRouter()
	const queryClient = useQueryClient()
	const [essay, setEssay] = useState("")
	const [show, setShow] = useState(false)
	const [showCongrats, setShowCongrats] = useState(false)

	const currentWriting = WritingData.filter((test) => test.id === +id)

	// Function to handle essay submission
	const { submitEssay } = ApiPostServices()
	const { mutate, isLoading, isError } = useMutation((body) => submitEssay(body), {
		onSuccess: () => queryClient.invalidateQueries("essayResult"),
	})

	function handleSubmit() {
		//@ts-ignore
		mutate({
			topic: currentWriting[0]?.topic,
			level: "intermediate",
			essay: essay,
			feedback: "",
			result: null,
			student_id: auth.currentUser.uid,
			student_name: auth.currentUser.displayName,
		})
		setShowCongrats(true)
	}

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

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
					Topic: {currentWriting[0]?.topic}
				</Typography>
				<Typography sx={{ margin: "5px 15px", fontWeight: 600 }}>
					Word Limit: {currentWriting[0]?.word_limit}
				</Typography>
				<Typography sx={{ margin: "0px 15px 15px" }}>
					{" "}
					The topic of this essay is about you, and you are required to write 250 words within 20 minutes.{" "}
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
						Key Words:
						{currentWriting[0].key_words.map((word) => ` ${word}, `)}
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
					<Button sx={{ m: 1 }} variant="contained" onClick={handleSubmit} disabled={essay.length < 10 ? true : false}>
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

export default Writing
