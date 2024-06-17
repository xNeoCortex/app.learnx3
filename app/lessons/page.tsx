"use client"

import React, { ReactNode } from "react"
import dayjs from "dayjs"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Box, Grid, Typography } from "@mui/material"
import AddLesson from "@/components/lessons/AddLesson"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "../api/ApiServices"
import ErrorPage from "../error"
import { useStoreUser } from "@/components/zustand"
import LessonTimetableCard from "@/components/lessons/LessonTimetableCard"
import isDateBeforeToday from "@/components/helpers/isDateBeforeToday"
import LoadingPage from "@/components/LoadingPage"
import { LessonTimetableType } from "@/types/types"
import groupLessonsByWeek from "@/components/helpers/getWeekRange"

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
								sx={{
									margin: "0px 10px 10px 0px",
									fontWeight: "600",
									fontSize: "19px",
									color: "#5f616a",
								}}
							>
								Lessons
							</Typography>
							{(userInfo?.role === "admin" || userInfo?.role === "teacher") && <AddLesson />}
						</Box>
					</Grid>
					<Grid container spacing={3}>
						{groupLessonsByWeek(lessonTimetableList?.data)
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
										lessons: LessonTimetableType[]
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
														{dayjs(date_from).format("D MMMM")} - {dayjs(date_to).format("D MMMM")}
													</Typography>
												</Box>
											</Box>
										</Grid>
										{lessons
											.sort((a: LessonTimetableType, b: LessonTimetableType) =>
												a.lesson_date! > b.lesson_date! ? 1 : -1
											)
											.map((lesson: LessonTimetableType, index: number) => (
												<Grid key={index} item xs={12} sm={3} md={2}>
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
