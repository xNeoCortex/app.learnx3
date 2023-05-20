import React from "react"
import { useRouter } from "next/router"
import Navbar from "@/components/Navbar"
import Lessons from "@/components/Lessons"
import Translator from "@/components/Translator"
import TestResult from "@/components/result/TestResult"
import Statistics from "@/components/Statistics"
import ClassStudents from "./class-students"
import { useStoreUser } from "@/components/Zustand"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import StudentCardList from "@/components/student/StudentCardList"
import { Box } from "@mui/material"

function MyDashboard() {
	const { userInfo } = useStoreUser()

	return (
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
	)
}

export default MyDashboard
