import React from "react"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import AppsIcon from "@mui/icons-material/Apps"
import ErrorPage from "../ErrorPage"
import isDateBeforeToday from "../helpers/isDateBeforeToday"
import LessonTimetableCard from "../lessons/LessonTimetableCard"
import Link from "next/link"

function DashboardLessonTimetable(props) {
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

	if (cIsError) return <ErrorPage />
	return (
		<Grid container spacing={2}>
			{lessonTimetableList?.data
				?.filter((item) => !isDateBeforeToday(item?.date_to))
				?.sort((a, b) => (a.lesson_date > b.lesson_date ? 1 : -1))
				?.slice(0, 3)
				?.map((x, index) => (
					<Grid item xs={12} sm={3}>
						<LessonTimetableCard index={index} x={x} />
					</Grid>
				))}
			<Grid item xs={3} sx={{ display: { xs: "none", sm: "grid" } }}>
				<Link href={`/lessons`}>
					<Box
						sx={{
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
						}}
					>
						<Box>
							<Typography
								sx={{
									fontWeight: 600,
									fontSize: 22,
									padding: 0,
									color: "#0e1237",
									marginBottom: "-10px",
								}}
							>
								View all lessons
							</Typography>
							<img src={"/lesson_image_1.svg"} alt="book" style={{ maxWidth: "180px", height: "100%" }} />{" "}
						</Box>
					</Box>
				</Link>
			</Grid>
		</Grid>
	)
}

export default DashboardLessonTimetable
