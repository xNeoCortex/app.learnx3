import ApiServices from "@/pages/api/ApiServices"
import { useStoreUser } from "@/pages/zustand"
import { Grid } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import TeacherList from "../Components/TeacherList"
import ErrorPage from "../ErrorPage"
import LoadingPage from "../LoadingPage"
import Navbar from "../Navbar"
import StudentList from "../Teacher/StudentList"
import AddClassPage from "./AddClassComponent"

function SchoolPage() {
  const navigate = useNavigate()
  const { userInfo } = useStoreUser()
  const { fetchAllStudents, fetchAllTeachers } = ApiServices()
  const { data, isLoading, isError } = fetchAllStudents()
  const {
    data: teacherList,
    isLoading: isLoadingTeacher,
    isError: isErrorTeacher,
  } = fetchAllTeachers()

  if (isLoading || isLoadingTeacher) return <LoadingPage />
  if (isError || isErrorTeacher) return <ErrorPage />

  if (userInfo.role === "admin") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <AddClassPage />
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TeacherList data={teacherList} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StudentList data={data} />
          </Grid>
        </Grid>
      </div>
    )
  } else navigate("/error")
}
export default SchoolPage
