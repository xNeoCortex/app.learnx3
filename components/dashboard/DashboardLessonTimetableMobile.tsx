import React from "react"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ErrorPage from "../../pages/errorpage"
import isDateBeforeToday from "../helpers/isDateBeforeToday"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import LoadingPage from "../LoadingPage"

function DashboardLessonTimetableMobile(props) {
	const { apiRequest } = ApiServices()

	const {
		data: lessonTimetableList,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: ["lessonTimetable"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable" }),
		refetchOnWindowFocus: false,
	})

	console.log("lessonTimetableList?.data :>> ", lessonTimetableList?.data)

	if (cIsError) return <ErrorPage />
	if (cIsLoading) return <LoadingPage />

	return (
		<Box sx={{ display: { xs: "flex", sm: "none" } }}>
			<Typography
				style={{
					margin: "0px 10px 10px 0px",
					fontWeight: 600,
					fontSize: 19,
					color: "#5f616a",
				}}
			>
				Upcoming lessons
			</Typography>
			<Box
				sx={{
					display: { xs: "flex", sm: "none" },
					overflowX: "scroll",
					overflowY: "hidden",
					boxSizing: "border-box",
					width: `calc(100vw-20px)`,
					marginTop: "20px",
				}}
			>
				{lessonTimetableList?.data
					// @ts-ignore
					?.filter(({ lesson_date }) => !isDateBeforeToday(lesson_date))
					?.sort((a, b) => (a.lesson_date > b.lesson_date ? 1 : -1))
					?.slice(0, 3)
					?.map((x, index) => (
						<LessonTimetableCard index={index} x={x} />
					))}
			</Box>
		</Box>
	)
}

export default DashboardLessonTimetableMobile
