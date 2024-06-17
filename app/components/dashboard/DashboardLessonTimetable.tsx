import React from "react"
import ApiServices from "@/api/ApiServices"
import { Alert, Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ErrorPage from "@/errorpage"
import isDateBeforeToday from "../helpers/isDateBeforeToday"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import Link from "next/link"
import LoadingPage from "../LoadingPage"
import { LessonTimetableType } from "@/types/types"

function DashboardLessonTimetable() {
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
	if (cIsLoading) return <LoadingPage />
	if (filteredLessonTimetable.length === 0)
		return (
			<Alert
				severity="warning"
				sx={{ p: 1, mt: 2, paddingY: "0px", fontSize: "15px", fontWeight: "500", width: "fit-content" }}
			>
				No upcoming lessons
			</Alert>
		)

	return (
		<Box sx={{ display: { xs: "none", sm: "flex" }, flexDirection: "column" }}>
			{filteredLessonTimetable.length > 0 && <Typography sx={TextStyle}>Upcoming lessons</Typography>}

			<Grid container spacing={2}>
				{filteredLessonTimetable
					?.sort((a: LessonTimetableType, b: LessonTimetableType) => (a.lesson_date! > b.lesson_date! ? 1 : -1))
					?.slice(0, 3)
					?.map((lesson: LessonTimetableType, index: number) => (
						<Grid key={index} item xs={12} sm={6} lg={3} sx={{ display: { xs: "none", sm: "grid" } }}>
							<LessonTimetableCard lesson={lesson} />
						</Grid>
					))}
				{lessonTimetableList?.data.length > 3 && (
					<Grid item xs={12} sm={6} lg={3} sx={{ display: { xs: "none", sm: "grid" } }}>
						<Link href={`/lessons`} style={{ width: "100%" }}>
							<Box sx={BoxStyle}>
								<Box>
									<Typography sx={TextStyleTitle}>View all lessons</Typography>
									<img src={"/lesson_image_1.svg"} alt="book" style={{ maxWidth: "180px", height: "100%" }} />{" "}
								</Box>
							</Box>
						</Link>
					</Grid>
				)}
			</Grid>
		</Box>
	)
}

export default DashboardLessonTimetable

const TextStyle = {
	margin: "0px 10px 10px 0px",
	fontWeight: "600",
	fontSize: "19px",
	color: "#5f616a",
	width: "100%",
}

const BoxStyle = {
	cursor: "pointer",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	flexDirection: "column",
	width: "100%",
	height: "100%",
	borderRadius: "10px",
	padding: "10px 20px 20px",
	overflow: "hidden",
	background: "white",
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
}

const TextStyleTitle = {
	fontWeight: 600,
	fontSize: 22,
	padding: 0,
	color: "#0e1237",
	marginBottom: "-10px",
	textAlign: "center",
}
