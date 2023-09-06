import React from "react"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import AppsIcon from "@mui/icons-material/Apps"
import ErrorPage from "../../pages/errorpage"
import isDateBeforeToday from "../helpers/isDateBeforeToday"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import Link from "next/link"

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

	console.log("lessonTimetableList :>> ", lessonTimetableList?.data)

	if (cIsError) return <ErrorPage />
	return (
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
				?.filter((item) => !isDateBeforeToday(item?.lesson_date))
				?.sort((a, b) => (a.lesson_date > b.lesson_date ? 1 : -1))
				?.slice(0, 3)
				?.map((x, index) => (
					<LessonTimetableCard index={index} x={x} />
				))}
		</Box>
	)
}

export default DashboardLessonTimetableMobile
