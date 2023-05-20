import React from "react"
import Navbar from "@/components/Navbar"
import Lessons from "@/components/Lessons"
import Translator from "@/components/Translator"
import TestResult from "@/components/result/TestResult"
import Statistics from "@/components/Statistics"
import { useStoreUser } from "@/components/zustand"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import StudentCardList from "@/components/student/StudentCardList"
import { Box } from "@mui/material"
import AppContainer from "@/components/AppContainer"

function MyDashboard() {
	const { userInfo } = useStoreUser()

	return (
		<AppContainer>
			<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
				<SidebarContainer>
					<Box style={{ display: "flex", flexDirection: "column" }}>
						<Navbar />
						<Box style={{ display: "flex" }}>
							<Box style={{ display: "flex", flex: 2, flexDirection: "column" }}>
								{userInfo?.role === "student" ? (
									<>
										<Lessons num={1} />
										<Translator />
										<TestResult />
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
