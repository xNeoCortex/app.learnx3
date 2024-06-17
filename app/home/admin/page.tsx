"use client"

import React from "react"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/api/ApiServices"
import { Box, Grid, Typography } from "@mui/material"
import ErrorPage from "@/errorpage"
import StudentList from "@/components/student/StudentList"
import LoadingPage from "@/components/LoadingPage"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import TeacherList from "@/components/teacher/TeacherList"

function AdminPage() {
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
		<ProtectedRoute permitArray={["admin"]}>
			<SidebarContainer>
				<Box sx={{ display: "flex", flexDirection: "column" }}>
					<Typography sx={{ fontSize: "22px", p: 1, fontWeight: "bolder" }}>Manage Students and Teachers</Typography>
					<Grid container spacing={4}>
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
	)
}
export default AdminPage
