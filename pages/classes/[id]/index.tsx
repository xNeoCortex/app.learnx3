import React from "react"
import Lessons from "@/components/Lessons"
import Statistics from "@/components/Statistics"
import { useStoreUser } from "@/components/zustand"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import StudentCardList from "@/components/student/StudentCardList"
import { Box } from "@mui/material"
import AppContainer from "@/components/AppContainer"
import ExploreTopics from "@/components/dashboard/ExploreTopics"
import WordOfTheDay from "@/components/dashboard/WordOfTheDay"
import DashboardTopics from "@/components/dashboard/DashboardTopics"

function MyDashboard() {
	const { userInfo } = useStoreUser()

	return (
		<AppContainer>
			<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
				<SidebarContainer>
					<Box style={{ display: "flex", flexDirection: "column" }}>
						<Box style={{ display: "flex" }}>
							<Box style={{ display: "flex", flex: 2, flexDirection: "column" }}>
								{userInfo?.role === "student" ? (
									<>
										<ExploreTopics />
										<WordOfTheDay />
										<DashboardTopics />
									</>
								) : userInfo?.role === "teacher" || userInfo?.role === "admin" ? (
									<>
										<Lessons num={1} />
										<Statistics displayGraphs={false} />
										<StudentCardList />
									</>
								) : null}
							</Box>
						</Box>
					</Box>
				</SidebarContainer>
			</ProtectedRoute>
		</AppContainer>
	)
}

export default MyDashboard
