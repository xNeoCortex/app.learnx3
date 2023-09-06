import React from "react"
import Statistics from "@/components/Statistics"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import StudentCardList from "@/components/student/StudentCardList"
import { Grid, Typography } from "@mui/material"
import DashboardLessonTimetable from "@/components/dashboard/DashboardLessonTimetable"
import DashboardLessonTimetableMobile from "@/components/dashboard/DashboardLessonTimetableMobile"

function MyDashboard() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher"]}>
			<SidebarContainer>
				<Grid container spacing={2}>
					<Grid item xs={12}>
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
						<DashboardLessonTimetable />
						<DashboardLessonTimetableMobile />
					</Grid>
					<Grid item xs={12}>
						<Statistics displayGraphs={false} />
					</Grid>
					<Grid item xs={12}>
						<StudentCardList />
					</Grid>
				</Grid>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default MyDashboard
