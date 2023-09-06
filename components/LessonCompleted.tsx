import { useEffect, useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Box, IconButton } from "@mui/material"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import CheckIcon from "@mui/icons-material/Check"
import CloseIcon from "@mui/icons-material/Close"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "./LoadingPage"
import ErrorPage from "../pages/errorpage"
import { useClassInfo } from "./zustand"

interface Type {
	completed_lessons: string[]
}

const LessonCompleted: React.FC<{
	uid: string
	classInfo: any
}> = ({ uid, classInfo }) => {
	const queryClient = useQueryClient()
	const [openConfirmDelete, setOpenConfirmDelete] = useState(false)
	const { apiRequest } = ApiServices()
	const { mutate, isLoading, isError } = useMutation({
		mutationFn: (lessonIdArray: Type) =>
			apiRequest("PATCH", lessonIdArray, { collectionName: "classes", uid: classInfo.uid }),
		onSuccess: () => queryClient.invalidateQueries(["classList"]),
	})

	function handleMutate() {
		let lessonIdArray: string[]
		if (classInfo.completed_lessons.includes(uid)) {
			lessonIdArray = classInfo.completed_lessons.filter((item) => item !== uid)
		} else {
			lessonIdArray = [...classInfo.completed_lessons, uid]
		}
		mutate({ completed_lessons: lessonIdArray })
		setOpenConfirmDelete(false)
	}

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box
			sx={{ display: "flex", color: "black", width: "fit-content", height: "fit-content" }}
			onClick={(e) => e.stopPropagation()}
		>
			{!openConfirmDelete ? (
				<CheckCircleIcon
					onClick={() => setOpenConfirmDelete(true)}
					style={{
						color: classInfo?.completed_lessons.includes(uid) ? "#57cc99" : "#dee2e6",
						marginLeft: 10,
						marginBottom: 5,
						cursor: "pointer",
					}}
				/>
			) : (
				<>
					<CheckIcon
						onClick={handleMutate}
						style={{
							color: "#6c757d",
							width: 22,
							marginLeft: 10,
							cursor: "pointer",
						}}
					/>
					<CloseIcon
						onClick={() => setOpenConfirmDelete(false)}
						style={{
							color: "#6c757d",
							width: 22,
							marginLeft: 10,
							cursor: "pointer",
						}}
					/>
				</>
			)}
		</Box>
	)
}

export default LessonCompleted
