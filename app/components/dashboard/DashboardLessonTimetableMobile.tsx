import React from "react"
import ApiServices from "@/api/ApiServices"
import { Alert, Box, Skeleton, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ErrorPage from "@/errorpage"
import isDateBeforeToday from "../helpers/isDateBeforeToday"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import LoadingPage from "../LoadingPage"
import { LessonTimetableType } from "@/types/types"
import Grid from "react-loading-icons/dist/esm/components/grid"

function DashboardLessonTimetableMobile() {
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

	const filteredLessonTimetable = lessonTimetableList?.data?.filter(
		({ lesson_date }: { lesson_date: string }) => !isDateBeforeToday(lesson_date)
	)

	if (cIsError) return <ErrorPage />

	return (
		<Box sx={{ display: { xs: "flex", sm: "none" }, flexDirection: "column" }}>
			<Box
				sx={{
					display: { xs: "flex", sm: "none" },
					overflowX: "scroll",
					overflowY: "hidden",
					boxSizing: "border-box",
					width: `calc(100vw-20px)`,
				}}
			>
				{cIsLoading
					? [1, 2].map((x) => (
							<Skeleton key={x} variant="rounded" sx={{ height: "315px", width: "230px", margin: "5px" }} />
					  ))
					: filteredLessonTimetable
							?.sort((a: LessonTimetableType, b: LessonTimetableType) => (a.lesson_date! > b.lesson_date! ? 1 : -1))
							?.slice(0, 3)
							?.map((lesson: LessonTimetableType, index: number) => (
								<LessonTimetableCard key={index} lesson={lesson} />
							))}
			</Box>
		</Box>
	)
}

export default DashboardLessonTimetableMobile

const TextStyle = {
	margin: "0px 10px 10px 0px",
	fontWeight: "600",
	fontSize: "19px",
	color: "#5f616a",
}
