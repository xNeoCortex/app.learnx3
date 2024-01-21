import React, { ReactNode } from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Box, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import AddLesson from "@/components/lessons/AddLesson"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "../api/ApiServices"
import ErrorPage from "../error"
import { useStoreUser } from "@/components/zustand"
import LessonTimetableCard from "@/components/lessons/LessonTimetableCard"
import isDateBeforeToday from "@/components/helpers/isDateBeforeToday"
import LoadingPage from "@/components/LoadingPage"
import { convertToWeeklyObjectType, lessonTimetableType } from "@/types/types"

type PermitType = "admin" | "teacher" | "student"
interface ProtectedRouteProps {
	children: ReactNode
	permitArray: PermitType[]
}

function index() {
	const { apiRequest } = ApiServices()
	const { userInfo } = useStoreUser()

	// Fetch lessons
	const {
		data: lessonTimetableList,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: ["lessonTimetable"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable" }),
		refetchOnWindowFocus: false,
	})

	if (cIsError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Box sx={{ marginTop: "20px", width: "100%" }}>
					<Grid item xs={12} sm={12} sx={{ marginTop: "20px" }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								width: "100%",
							}}
						>
							<Typography
								style={{
									margin: "0px 10px 10px 0px",
									fontWeight: 600,
									fontSize: 19,
									color: "#5f616a",
								}}
							>
								Lessons
							</Typography>
							{(userInfo?.role === "admin" || userInfo?.role === "teacher") && <AddLesson />}
						</Box>
					</Grid>
					<Grid container spacing={3}>
						{convertToWeeklyObject(lessonTimetableList?.data)
							?.filter((item) => !isDateBeforeToday(item?.date_to))
							.sort((a, b) => (a?.date_to > b?.date_to ? 1 : -1))
							?.map(
								(
									{
										date_from,
										date_to,
										lessons,
									}: {
										date_from: string
										date_to: string
										lessons: lessonTimetableType[]
									},
									index
								) => (
									<React.Fragment key={index}>
										<Grid item xs={12} key={index} sx={{ marginTop: "20px" }}>
											<Box
												sx={{
													display: "flex",
													alignItems: "center",
													justifyContent: "space-between",
													width: "100%",
												}}
											>
												<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
													<Typography sx={{ fontSize: 16, fontWeight: 600 }}>
														{/* @ts-ignore */}
														{dayjs(date_from).format("D MMMM")} - {dayjs(date_to).format("D MMMM")}
													</Typography>
												</Box>
											</Box>
										</Grid>
										{lessons
											.sort((a: lessonTimetableType, b: lessonTimetableType) =>
												a.lesson_date > b.lesson_date ? 1 : -1
											)
											.map((lesson: lessonTimetableType, index: number) => (
												<Grid key={index} item xs={12} sm={3}>
													{cIsLoading ? <LoadingPage /> : <LessonTimetableCard key={index} lesson={lesson} />}
												</Grid>
											))}
									</React.Fragment>
								)
							)}
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default index

function getWeekRange(date: string | Date) {
	const currentDate = dayjs(date)
	const dayOfWeek = currentDate.day()
	const diff = currentDate.date() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Adjust for Sunday
	const startOfWeek = currentDate.date(diff)
	const endOfWeek = currentDate.date(diff + 6)
	return { start: startOfWeek.format("YYYY-MM-DD"), end: endOfWeek.format("YYYY-MM-DD") }
}

function convertToWeeklyObject(input: lessonTimetableType[]): convertToWeeklyObjectType[] {
	const weeklyData: any = {}

	input?.forEach((lesson) => {
		const lessonDate = new Date(lesson.lesson_date)
		const weekRange: {
			start: string
			end: string
		} = getWeekRange(lessonDate)

		if (!weeklyData[weekRange.start]) {
			weeklyData[weekRange.start] = {
				date_from: weekRange.start,
				date_to: weekRange.end,
				lessons: [],
			}
		}

		weeklyData[weekRange.start].lessons.push(lesson)
	})

	return Object.values(weeklyData)
}
