import React, { useCallback } from "react"
import ApiServices from "@/api/ApiServices"
import { Alert, Box, Skeleton, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ErrorPage from "@/errorpage"
import isDateBeforeToday from "../helpers/isDateBeforeToday"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import LoadingPage from "../LoadingPage"
import { LessonTimetableType } from "@/types/types"
import Grid from "react-loading-icons/dist/esm/components/grid"
import { useStoreUser } from "../zustand"
import { filterLessonsBySubscriptionType } from "../helpers/filterLessonsBySubscriptionType"

function DashboardLessonTimetableMobile() {
	const { apiRequest } = ApiServices()
	const { userInfo } = useStoreUser()

	const {
		data: lessonTimetableData,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: ["lessonTimetable"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable" }),
		refetchOnWindowFocus: false,
	})

	const upcomingLessons = filterLessonsBySubscriptionType(lessonTimetableData?.data || [], userInfo)

	if (upcomingLessons?.length === 0) {
		return (
			<Alert
				severity="warning"
				sx={{
					p: 1,
					mt: 2,
					paddingY: "0px",
					fontSize: "15px",
					fontWeight: "500",
					width: "fit-content",
					display: { xs: "flex", sm: "none" },
				}}
			>
				No upcoming lessons
			</Alert>
		)
	}

	if (cIsError) return <ErrorPage />

	return (
		<Box
			//@ts-ignore
			display={["flex", "none"]}
			flexDirection="column"
		>
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
					: upcomingLessons
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
