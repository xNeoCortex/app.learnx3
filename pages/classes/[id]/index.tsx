import React from "react"
import Lessons from "@/components/Lessons"
import Statistics from "@/components/Statistics"
import { useStoreUser } from "@/components/zustand"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import StudentCardList from "@/components/student/StudentCardList"
import { Box, Grid } from "@mui/material"
import AppContainer from "@/components/AppContainer"
import ExploreTopics from "@/components/dashboard/ExploreTopics"
import WordOfTheDay from "@/components/dashboard/WordOfTheDay"
import DashboardTopics from "@/components/dashboard/DashboardTopics"
import StudentRanking from "@/components/dashboard/StudentRanking"
import MostRecentTestScore from "@/components/dashboard/MostRecentTestScore"

function MyDashboard() {
	const { userInfo } = useStoreUser()

	return (
		<AppContainer>
			<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
				<SidebarContainer>
					<Grid container spacing={3}>
						{userInfo?.role === "student" ? (
							<>
								<Grid item xs={12} sm={8}>
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
								<Grid item xs={12} sm={4}>
									<StudentRanking />
								</Grid>
								<Grid item xs={12}>
									<DashboardTopics />
								</Grid>
							</>
						) : userInfo?.role === "teacher" || userInfo?.role === "admin" ? (
							<>
								<Lessons num={1} />
								<Statistics displayGraphs={false} />
								<StudentCardList />
							</>
						) : null}
					</Grid>
				</SidebarContainer>
			</ProtectedRoute>
		</AppContainer>
	)
}

export default MyDashboard
