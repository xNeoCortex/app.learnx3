import React from "react"
import { useQuery } from "react-query"
import ApiServices from "@/pages/api/ApiServices"
import { useStoreUser } from "@/pages/zustand"
import { Grid } from "@mui/material"
import TeacherList from "../components/teacher/TeacherList"
import ErrorPage from "../components/ErrorPage"
import Navbar from "../components/Navbar"
import StudentList from "../components/student/StudentList"
import AddClassPage from "../components/school/AddClassComponent"
import AppContainer from "@/components/AppContainer"
import { useRouter } from "next/router"
import LoadingPage from "@/components/LoadingPage"

function SchoolPage() {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()
	const { fetchAllStudents, fetchAllTeachers } = ApiServices()
	const { data: studentList, isLoading, isError } = useQuery(["students"], fetchAllStudents)

	const {
		data: teacherList,
		isLoading: isLoadingTeacher,
		isError: isErrorTeacher,
	} = useQuery(["teachers"], fetchAllTeachers)

	if (isLoading || isLoadingTeacher) return <LoadingPage />
	if (isError || isErrorTeacher) return <ErrorPage />

	if (userInfo.role === "admin") {
		return (
			<AppContainer>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Navbar />
					<AddClassPage />
					<Grid container spacing={4} sx={{ mt: 2 }}>
						<Grid item xs={12} sm={6}>
							<TeacherList data={teacherList?.data} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<StudentList data={studentList?.data} />
						</Grid>
					</Grid>
				</div>
			</AppContainer>
		)
	} else navigate("/error")
}
export default SchoolPage
