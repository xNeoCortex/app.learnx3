import React from "react"
import { useRouter } from "next/router"
import { useStoreUser } from "@/pages/zustand"
import AppContainer from "@/components/AppContainer"
import Navbar from "@/components/Navbar"
import Lessons from "@/components/Lessons"
import Translator from "@/components/Translator"
import TestResult from "@/components/result/TestResult"
import Statistics from "@/components/Statistics"
import ClassStudents from "./class-students"

function MyDashboard() {
	const { userInfo } = useStoreUser()
	const {
		query: { id },
	} = useRouter()

	return (
		<AppContainer>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Navbar />
				<div style={{ display: "flex" }}>
					<div style={{ display: "flex", flex: 2, flexDirection: "column" }}>
						{userInfo.role === "student" ? (
							<>
								<Lessons num={1} />
								<Translator />
								<TestResult />
							</>
						) : userInfo.role === "teacher" || userInfo.role === "admin" ? (
							<>
								<Lessons num={1} />
								<Statistics displayGraphs={false} />
								<ClassStudents />
							</>
						) : null}
					</div>
				</div>
			</div>
		</AppContainer>
	)
}

export default MyDashboard
