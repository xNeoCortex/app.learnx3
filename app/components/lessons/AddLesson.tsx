"use client"
import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useStoreUser } from "../zustand"
import ApiServices from "@/api/ApiServices"
import ErrorPage from "@/errorpage"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { Button, Box } from "@mui/material"
import { LessonTimetableType } from "@/types/types"
import AddLessonDialog from "./AddLessonDialog"

const AddLesson = React.memo<{ buttonName?: string; _lesson?: LessonTimetableType; params?: { id: string } }>(
	({ buttonName, _lesson = null, params }) => {
		const id = params?.id || null

		const queryClient = useQueryClient()
		const { userInfo } = useStoreUser()
		const { apiRequest } = ApiServices()
		const [open, setOpen] = React.useState(false)
		const [message, setMessage] = React.useState<string>("")
		const [lessonInfo, setLessonInfo] = React.useState<LessonTimetableType>({
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
			setMessage("")
		}
		const handleClose = React.useCallback(() => {
			setOpen(false)
			setMessage("")
		}, [message, open])

		const handleSave = React.useCallback(() => {
			try {
				const mutateFn = _lesson ? mutatePut : mutate
				const message = _lesson
					? "The class changes has been successfully saved!"
					: "The class has been successfully added!"
				mutateFn(lessonInfo)
				setMessage(message)
			} catch (error) {
				console.error(error)
				setMessage("Something went wrong")
			}
		}, [lessonInfo, _lesson])

		// Clean inputs after api requests
		React.useEffect(() => {
			if (isSuccess && !_lesson) {
				setLessonInfo((prev) => ({ ...prev, passcode: "", topic: "", level: "", video_call_link: "", students: [] }))
				handleClose()
			} else if (isSuccessPut && _lesson) {
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
			<Box>
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
				{
					<AddLessonDialog
						handleClose={handleClose}
						open={open}
						buttonName={buttonName}
						lessonInfo={lessonInfo}
						setLessonInfo={setLessonInfo}
						message={message}
						_lesson={_lesson}
						userInfo={userInfo}
						deleteLesson={deleteLesson}
						handleSave={handleSave}
					/>
				}
			</Box>
		)
	}
)
export default AddLesson
