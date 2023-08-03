import React from "react"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Grid } from "@mui/material"
import ErrorPage from "@/components/ErrorPage"
import Navbar from "@/components/Navbar"
import StudentList from "@/components/student/StudentList"
import AddClassPage from "@/components/school/AddClassComponent"
import LoadingPage from "@/components/LoadingPage"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import TeacherList from "@/components/teacher/TeacherList"
import AppContainer from "@/components/AppContainer"

function SchoolPage() {
	const { fetchAllStudents, fetchAllTeachers } = ApiServices()

	const {
		data: studentList,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["students"],
		queryFn: fetchAllStudents,
		refetchOnWindowFocus: false,
	})

	const {
		data: teacherList,
		isLoading: isLoadingTeacher,
		isError: isErrorTeacher,
	} = useQuery({ queryKey: ["teachers"], queryFn: fetchAllTeachers, refetchOnWindowFocus: false })

	if (isLoading || isLoadingTeacher)
		return (
			<Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<LoadingPage />
			</Box>
		)
	if (isError || isErrorTeacher) return <ErrorPage />

	return (
		<AppContainer>
			<ProtectedRoute permitArray={["admin"]}>
				<SidebarContainer>
					<Box style={{ display: "flex", flexDirection: "column" }}>
						<AddClassPage studentList={studentList} teacherList={teacherList} />
						<Grid container spacing={4} sx={{ mt: 2 }}>
							<Grid item xs={12} sm={6}>
								<TeacherList data={teacherList?.data} />
							</Grid>
							<Grid item xs={12} sm={6}>
								<StudentList data={studentList?.data} />
							</Grid>
						</Grid>
					</Box>
				</SidebarContainer>
			</ProtectedRoute>
		</AppContainer>
	)
}
export default SchoolPage
