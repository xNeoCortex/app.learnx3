import React from "react"
import { useStoreTemporary } from "@/components/zustand"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Grid } from "@mui/material"
import ExploreTopics from "@/components/dashboard/ExploreTopics"
import WordOfTheDay from "@/components/dashboard/WordOfTheDay"
import DashboardTopics from "@/components/dashboard/DashboardTopics"
import StudentRanking from "@/components/dashboard/StudentRanking"
import MostRecentTestScore from "@/components/dashboard/MostRecentTestScore"
import DashboardLessonTimetable from "@/components/dashboard/DashboardLessonTimetable"
import DashboardLessonTimetableMobile from "@/components/dashboard/DashboardLessonTimetableMobile"

function MyDashboard() {
	const { botComponentWidth } = useStoreTemporary()

	return (
		<ProtectedRoute permitArray={["admin", "student"]}>
			<SidebarContainer>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<DashboardLessonTimetable />
						<DashboardLessonTimetableMobile />
					</Grid>
					<Grid item xs={12} sm={botComponentWidth === 900 ? 12 : 8}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<ExploreTopics />
							</Grid>
							<Grid item xs={12} sm={6}>
								<WordOfTheDay />
							</Grid>
							<Grid item xs={12} sm={6}>
								<MostRecentTestScore />
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={12} sm={botComponentWidth === 900 ? 12 : 4}>
						<StudentRanking />
					</Grid>
					<Grid item xs={12}>
						<DashboardTopics />
					</Grid>
				</Grid>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default MyDashboard
