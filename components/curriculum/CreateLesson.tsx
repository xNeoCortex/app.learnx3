import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import dayjs from "dayjs"
import {
	Box,
	Button,
	ListItemIcon,
	CssBaseline,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	TextField,
	Typography,
} from "@mui/material"
import ApiPostServices from "@/pages/api/ApiPostServices"
import LoadingPage from "../LoadingPage"
import ErrorPage from "../ErrorPage"
import MultipleSelectAssessment from "@/components/curriculum/MultipleSelectAssessment"
import { useStoreUser } from "../zustand"
import MultipleSelectContent from "./MultipleSelectContent"

function CreateLesson({ open, setOpen }) {
	const { userInfo } = useStoreUser()
	const { addLesson } = ApiPostServices()
	const [topic, setTopic] = useState("")
	const [category, setCategory] = useState("vocabulary")
	const [lessonNumber, setLessonNumber] = useState("")
	const [selectedAssessment, setSelectedAssessment] = useState([])
	const [assessmentType, setAssessmentType] = useState("wordBuildingAssessment")
	const [selectedContent, setSelectedContent] = useState([])
	const [contentType, setContentType] = useState("readingContent")

	// Add lesson
	const { mutate, isLoading, isError } = useMutation((body) => addLesson(body))

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box sx={{ width: "100%", paddingX: 2 }}>
			<CssBaseline />
			<Button
				sx={{
					mr: "10px",
					mb: "20px",
					width: "100%",
					background: "rgb(95, 106, 196)",
					color: "white",
					"&:hover": { backgroundColor: "rgba(95, 106, 196, 0.9)" },
				}}
				onClick={() => setOpen(!open)}
			>
				{open ? " Back" : "Create Lesson"}
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
					<Grid item xs={12} sm={4}>
						<TextField
							fullWidth
							type="number"
							id="outlined-basic"
							label="Lesson number"
							variant="outlined"
							value={lessonNumber}
							onChange={(e) => setLessonNumber(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12} sm={8}>
						<TextField
							fullWidth
							id="outlined-basic"
							label="Topic"
							variant="outlined"
							value={topic}
							onChange={(e) => setTopic(e.target.value)}
						/>
					</Grid>
					<Grid item xs={12}>
						<Typography sx={{ fontWeight: "bolder", mb: 2 }}>Choose category</Typography>

						<Box sx={{ m: "10px 0px", background: "rgba(186, 185, 204, 0.2)", p: 1, borderRadius: 1 }}>
							{["vocabulary", "speaking", "reading", "writing"].map((item) => (
								<Button
									sx={{ mr: 1, border: item === category && "2px solid purple" }}
									color="secondary"
									onClick={() => setCategory(item)}
								>
									{item}
								</Button>
							))}
						</Box>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ mt: 3 }}>
						<Typography sx={{ fontWeight: "bolder" }}>Add Content to your lesson</Typography>
						{[
							{
								name: "Reading Content",
								type: "readingContent",
							},
							{
								name: "Writing Content",
								type: "writingContent",
							},
							{
								name: "Speaking Content",
								type: "speakingContent",
							},
							{
								name: "Vocabulary",
								type: "vocabularyCards",
							},
						].map((item) => (
							<Button
								sx={{ mr: 1, mt: 1, border: item.type === contentType && "2px solid blue" }}
								onClick={() => setContentType(item.type)}
							>
								{item.name}
							</Button>
						))}
						<MultipleSelectContent
							selectedLessons={selectedContent}
							setSelectedLessons={setSelectedContent}
							collectionName={contentType}
						/>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ mt: 3 }}>
						<Typography sx={{ fontWeight: "bolder", mb: 2 }}>Selected assessments</Typography>
						<List
							sx={{
								mb: 1,
								background: "rgba(186, 185, 204, 0.2)",
								minHeight: "200px",
								p: 1,
								borderRadius: 1,
							}}
						>
							{selectedContent?.map((lesson) => (
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
										<ListItemText sx={{ flex: 1 }} primary={lesson?.category} />
									</ListItemButton>
								</ListItem>
							))}
						</List>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ mt: 3 }}>
						<Typography sx={{ fontWeight: "bolder" }}>Add assessment to your lesson</Typography>
						{[
							{ name: "Word building", type: "wordBuildingAssessment" },
							{
								name: "Reading assessment",
								type: "readingAssessment",
							},
							{
								name: "Writing assessment",
								type: "writingAssessment",
							},
						].map((item) => (
							<Button
								sx={{ mr: 1, mt: 1, border: item.type === assessmentType && "2px solid blue" }}
								onClick={() => setAssessmentType(item.type)}
							>
								{item.name}
							</Button>
						))}
						<MultipleSelectAssessment
							selectedLessons={selectedAssessment}
							setSelectedLessons={setSelectedAssessment}
							assessmentType={assessmentType}
						/>
					</Grid>
					<Grid item xs={12} sm={6} sx={{ mt: 3 }}>
						<Typography sx={{ fontWeight: "bolder", mb: 2 }}>Selected assessments</Typography>
						<List
							sx={{
								mb: 1,
								background: "rgba(186, 185, 204, 0.2)",
								minHeight: "200px",
								p: 1,
								borderRadius: 1,
							}}
						>
							{selectedAssessment?.map((lesson) => (
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
						disabled={category && category?.length === 0 && lessonNumber?.length === 0 && topic?.length === 0}
						style={{ margin: 15, minWidth: 300 }}
						variant="contained"
						onClick={() => (
							//@ts-ignore
							mutate({
								level: "b1",
								topic: topic,
								lesson_number: lessonNumber,
								type: "file",
								teach_material: "",
								content: selectedContent?.map((item) => item.uid) || [],
								category: category?.trim(),
								createdBy: {
									name: userInfo.name,
									email: userInfo.email,
									uid: userInfo.uid,
									time: dayjs(),
								},
								assessments: selectedAssessment?.map((item) => item.uid) || [],
							}),
							setOpen(false),
							setTopic(""),
							setCategory("vocabulary"),
							setLessonNumber(null),
							setSelectedAssessment([]),
							setAssessmentType("wordBuildingAssessment"),
							setSelectedContent([]),
							setContentType("readingContent")
						)}
					>
						Save
					</Button>
				</Grid>
			)}
		</Box>
	)
}

export default CreateLesson
