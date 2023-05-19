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

function MyDashboard() {
	const { userInfo } = useStoreUser()
	const {
		query: { id },
	} = useRouter()

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Navbar />
					<div style={{ display: "flex" }}>
						<div style={{ display: "flex", flex: 2, flexDirection: "column" }}>
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
						</div>
					</div>
				</div>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default MyDashboard
