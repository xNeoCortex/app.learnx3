import {
	Box,
	Button,
	CssBaseline,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	TextField,
	Typography,
} from "@mui/material"
import ErrorPage from "../ErrorPage"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import MultipleSelectAssessment from "./MultipleSelectAssessment"
import LoadingPage from "../LoadingPage"
import ApiServices from "@/pages/api/ApiServices"
import { School } from "../data/SpeakingNew"

function CreateAssessment({ open, setOpen }) {
	const { apiRequest } = ApiServices()
	const [topic, setTopic] = useState("")
	const [category, setCategory] = useState("")
	const [lessonNumber, setLessonNumber] = useState("")
	const [selectedAssessment, setSelectedAssessment] = useState([])
	const [assessmentType, setAssessmentType] = useState("readingContent")

	// Add assessment
	const { mutate, isLoading, isError } = useMutation(() =>
		apiRequest("POST", School, { collectionName: assessmentType })
	)

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box sx={{ width: "100%", paddingX: 2 }}>
			<CssBaseline />
			<Button
				sx={{
					width: "100%",
					background: "rgb(95, 106, 196)",
					color: "white",
					"&:hover": { background: "#424493" },
				}}
				onClick={() => setOpen(!open)}
			>
				{open ? " Back" : "Create Word Building"}
			</Button>
			{open && (
				<Grid
					container
					spacing={2}
					sx={{
						background: "white",
						p: 1,
						m: 1,
						borderRadius: 2,
						width: "98%",
					}}
				>
					<Grid item xs={12} sm={6}>
						<h3>{assessmentType}</h3>
						<Typography sx={{ fontWeight: "bolder", mb: 2 }}>Create your assessment</Typography>
						<TextField
							required
							fullWidth
							id="outlined-basic"
							label="Curriculum name"
							variant="outlined"
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
						/>
						<MultipleSelectAssessment
							selectedLessons={selectedAssessment}
							setSelectedLessons={setSelectedAssessment}
							assessmentType={assessmentType}
						/>
						{[
							"readingAssessment",
							"writingAssessment",
							"wordBuildingAssessment",
							"readingContent",
							"speakingContent",
							"vocabularyCards",
							"writingContent",
							"speakEnglish",
							"speakEnglishAssessment",
						].map((item) => (
							<Button
								sx={{ m: 1, border: item === assessmentType ? "1px solid blue" : "" }}
								onClick={() => setAssessmentType(item)}
							>
								{item}
							</Button>
						))}
					</Grid>
					<Grid item xs={12} sm={6}>
						<Typography sx={{ fontWeight: "bolder", mb: 2 }}>Selected Assessment</Typography>
						<List
							sx={{
								p: "3px",
								mb: 1,
							}}
						>
							{selectedAssessment.map((lesson) => (
								<ListItem disablePadding>
									<ListItemButton
										sx={{
											background: "rgba(186, 185, 204, 0.2)",
											mb: 1,
											borderRadius: 1,
										}}
									>
										<ListItemIcon>{lesson.lesson_number}</ListItemIcon>
										<ListItemText
											primary={lesson.topic}
											sx={{
												flex: 3,
											}}
										/>
										<ListItemText sx={{ flex: 1 }} primary={lesson.category} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Grid>
					<Button
						disabled={category.length === 0 && lessonNumber.length === 0 && topic.length === 0}
						style={{ margin: 15, minWidth: 300 }}
						variant="contained"
						onClick={() => (
							//@ts-ignore
							mutate(), setOpen(false)
						)}
					>
						Save ABC
					</Button>
				</Grid>
			)}
		</Box>
	)
}

export default CreateAssessment
