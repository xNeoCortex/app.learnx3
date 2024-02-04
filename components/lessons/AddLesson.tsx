import * as React from "react"
import { useRouter } from "next/router"
import { useStoreUser } from "../zustand"
import ApiServices from "@/pages/api/ApiServices"
import ErrorPage from "../../pages/errorpage"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import {
	Alert,
	Button,
	TextField,
	Box,
	Dialog,
	DialogContent,
	DialogActions,
	IconButton,
	Grid,
	capitalize,
	Typography,
} from "@mui/material"
import { styled } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"
import { englishLevels } from "../utils/englishLevels"
import DatePickerX from "../elements/DatePickerX"
import { LessonTimetableType } from "@/types/types"

const AddLesson = React.memo<{ buttonName?: string; _lesson?: LessonTimetableType }>(
	({ buttonName, _lesson = null }) => {
		const {
			query: { id },
		} = useRouter()
		const queryClient = useQueryClient()
		const { userInfo } = useStoreUser()
		const { apiRequest } = ApiServices()
		const [open, setOpen] = React.useState(false)
		const [message, setMessage] = React.useState(false)
		const [
			{
				topic,
				level,
				lesson_duration_minutes,
				video_call_link,
				students,
				passcode,
				lesson_type,
				lesson_date,
				description,
				platform,
				lesson_target_skills,
				teacher_id,
				teacher_name,
				cancelled,
				teaching_material,
				for_everyone,
			},
			setLessonInfo,
		] = React.useState<LessonTimetableType>({
			topic: "",
			level: "B1",
			video_call_link: "",
			students: [],
			passcode: "",
			lesson_date: null,
			lesson_type: "speaking_club",
			description: null,
			lesson_duration_minutes: 60,
			lesson_target_skills: ["speaking", "listening"],
			platform: "Google Meet",
			teacher_id: userInfo?.uid,
			teacher_name: userInfo?.name,
			cancelled: false,
			teaching_material: "",
			for_everyone: true,
		})

		// Add lesson
		const { mutate, isSuccess, isError } = useMutation(
			(body: LessonTimetableType) => apiRequest("POST", body, { collectionName: "lessonTimetable" }),
			{
				onSuccess: () => queryClient.invalidateQueries(["lessonTimetable"]),
			}
		)

		//Delete Lesson
		const {
			mutate: deleteLesson,
			isSuccess: deleteIsSuccess,
			isError: deleteIsError,
		} = useMutation(
			() => apiRequest("DELETE", null, { collectionName: "lessonTimetable", uid: (id as string) || _lesson?.uid }),
			{
				onSuccess: () => queryClient.invalidateQueries(["lessonTimetable"]),
			}
		)

		// Edit class
		const {
			mutate: mutatePut,
			isSuccess: isSuccessPut,
			isError: isErrorPut,
		} = useMutation({
			mutationFn: (mutatedLesson: LessonTimetableType) =>
				apiRequest("PATCH", mutatedLesson, { collectionName: "lessonTimetable", uid: _lesson?.uid || (id as string) }),
			onSuccess: () => queryClient.invalidateQueries(["lessonTimetable"]),
		})

		const handleClickOpen = () => {
			setOpen(true)
			setMessage(false)
		}
		const handleClose = () => {
			setOpen(false)
			setMessage(false)
		}

		function handleSave() {
			if (topic?.length > 0) {
				if (_lesson) {
					mutatePut({
						topic,
						level,
						lesson_duration_minutes,
						video_call_link: video_call_link?.trim(),
						students,
						passcode,
						lesson_type,
						lesson_date,
						description,
						platform,
						lesson_target_skills,
						teacher_id,
						teacher_name,
						cancelled,
						teaching_material,
						for_everyone,
					})
				} else {
					mutate({
						topic,
						level,
						lesson_duration_minutes,
						video_call_link: video_call_link?.trim(),
						students,
						passcode,
						lesson_type,
						lesson_date,
						description,
						platform,
						lesson_target_skills,
						teacher_id,
						teacher_name,
						cancelled,
						teaching_material,
						for_everyone,
					})
				}
			}
		}

		// Clean inputs after api requests
		React.useEffect(() => {
			if (isSuccess && !_lesson) {
				setLessonInfo((prev) => ({ ...prev, passcode: "", topic: "", level: "", video_call_link: "", students: [] }))
				setMessage(true)
			} else if (isSuccessPut && _lesson) {
				setMessage(true)
				handleClose()
			}
		}, [isSuccess, isSuccessPut])

		React.useEffect(() => {
			if (_lesson) {
				setLessonInfo(_lesson)
			}
		}, [_lesson])

		if (isError || isErrorPut) return <ErrorPage />

		return (
			<div>
				<Button
					variant="outlined"
					onClick={handleClickOpen}
					sx={{
						border: "1px solid rgb(95, 97, 196)",
						color: "rgb(95, 97, 196)",
						textTransform: "none",
						fontSize: 13,
						fontWeight: 600,
						padding: "2.2px 10px",
					}}
				>
					{buttonName ? buttonName : "Create lesson"}
				</Button>
				<BootstrapDialog
					onClose={handleClose}
					aria-labelledby="customized-dialog-title"
					open={open}
					fullWidth={true}
					maxWidth="lg"
				>
					<DialogContent dividers>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "start",
								margin: "20px 40px",
							}}
						>
							<p
								style={{
									display: "flex",
									alignItems: "center",
									fontWeight: 600,
									fontSize: 22,
									margin: "10px 0px",
								}}
							>
								{buttonName ? buttonName : "Create lesson"}
							</p>

							<IconButton
								aria-label="close"
								onClick={handleClose}
								sx={{
									position: "absolute",
									right: 8,
									top: 8,
									color: (theme) => theme.palette.grey[500],
								}}
							>
								<CloseIcon />
							</IconButton>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
									width: "100%",
								}}
							>
								<Box
									component="form"
									noValidate
									// onSubmit={handleSubmit}
									sx={{ mt: 5, width: "100%" }}
								>
									<Grid container spacing={4}>
										<Grid item sm={6}>
											<TextField
												name="firstName"
												required
												fullWidth
												id="firstName"
												label="Topic"
												autoFocus
												value={topic}
												onChange={(e) => setLessonInfo((prev) => ({ ...prev, topic: e.target.value }))}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												name="lesson_duration_minutes"
												type="number"
												required
												fullWidth
												id="lesson_duration_minutes"
												label="Lesson duration (minutes)"
												value={lesson_duration_minutes}
												onChange={(e) =>
													setLessonInfo((prev) => ({ ...prev, lesson_duration_minutes: Number(e.target.value) }))
												}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<TextField
												name="videoLink"
												required
												fullWidth
												id="videoLink"
												label="Video Call Link"
												value={video_call_link}
												onChange={(e) => setLessonInfo((prev) => ({ ...prev, video_call_link: e.target.value }))}
											/>
										</Grid>
										<Grid item xs={12} sm={6}>
											<DatePickerX calendarValue={lesson_date} setCalendarValue={setLessonInfo} />
										</Grid>

										<Grid item xs={12}>
											<Typography sx={{ fontSize: 15, fontWeight: "bold" }}>Lesson level</Typography>
											<Box sx={{ display: "flex" }}>
												{["A0", "A1", "A2", "B1", "B2", "C1", "C2"].map((item, index) => (
													<Box
														key={index}
														onClick={() => setLessonInfo((prev) => ({ ...prev, level: item }))}
														sx={{
															flex: 1,
															textAlign: "center",
															color: "#373636",
															background: level == item ? "#c1c1ff" : "white",
															border: `1px solid rgb(95 97 196)`,
															margin: "10px 5px 10px 0",
															borderRadius: "6px",
															fontSize: "14px",
															p: "5px 10px",
															cursor: "pointer",
														}}
													>
														{englishLevels[item]}
													</Box>
												))}
											</Box>
										</Grid>
										<Grid item xs={12}>
											<Typography sx={{ fontSize: 15, fontWeight: "bold" }}>Lesson type</Typography>
											<Box sx={{ display: "flex" }}>
												{["general_english", "speaking_club", "business_english", "ielts", "toefl"].map(
													(item, index) => (
														<Box
															key={index}
															onClick={() => setLessonInfo((prev) => ({ ...prev, lesson_type: item }))}
															sx={{
																flex: 1,
																textAlign: "center",
																color: "#373636",
																background: lesson_type == item ? "#c1c1ff" : "white",
																border: `1px solid rgb(95 97 196)`,
																margin: "10px 5px 10px 0",
																borderRadius: "6px",
																fontSize: "14px",
																p: "5px 10px",
																cursor: "pointer",
															}}
														>
															{capitalize(item.split("_").join(" "))}
														</Box>
													)
												)}
											</Box>
										</Grid>
									</Grid>
								</Box>
							</Box>
						</Box>
					</DialogContent>
					<DialogActions>
						<Box
							sx={{
								display: "flex",
								justifyContent: "right",
								width: "100%",
							}}
						>
							<Box>
								{message && (
									<Box sx={{ m: "10px 30px" }}>
										<Alert severity="success">
											{_lesson
												? "The class changes has been successfully saved!"
												: "The class has been successfully added!"}
										</Alert>
									</Box>
								)}
							</Box>
							{userInfo?.role == "admin" && (
								<Button
									variant="contained"
									color="error"
									onClick={() => (deleteLesson(), handleClose())}
									sx={{
										m: "10px ",
										background: "rgb(255 92 92)",
									}}
								>
									Delete lesson
								</Button>
							)}
							<Button
								disabled={
									topic?.length === 0 ||
									level?.length === 0 ||
									lesson_type?.length === 0 ||
									lesson_date === null ||
									video_call_link?.length === 0
								}
								variant="contained"
								onClick={handleSave}
								sx={{ m: "10px " }}
							>
								{_lesson ? "Update lesson" : "Create lesson"}
							</Button>
						</Box>
					</DialogActions>
				</BootstrapDialog>
			</div>
		)
	}
)

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

export default AddLesson
