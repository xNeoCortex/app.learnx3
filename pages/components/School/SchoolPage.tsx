import ApiServices from "@/pages/api/ApiServices"
import { useStoreUser } from "@/pages/zustand"
import { Grid } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router-dom"
import TeacherList from "../Teacher/TeacherList"
import ErrorPage from "../Components/ErrorPage"
import LoadingPage from "../Components/LoadingPage"
import Navbar from "../Navbar"
import StudentList from "../Student/StudentList"
import AddClassPage from "./AddClassComponent"
import { useQuery } from "react-query"

function SchoolPage() {
  const navigate = useNavigate()
  const { userInfo } = useStoreUser()
  const { fetchAllStudents, fetchAllTeachers } = ApiServices()
  const { data, isLoading, isError } = useQuery(["students"], fetchAllStudents)

  const {
    data: teacherList,
    isLoading: isLoadingTeacher,
    isError: isErrorTeacher,
  } = useQuery(["teachers"], fetchAllTeachers)

  if (isLoading || isLoadingTeacher) return <LoadingPage />
  if (isError || isErrorTeacher) return <ErrorPage />

  if (userInfo.role === "admin") {
    return (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Navbar />
        <AddClassPage />
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} sm={6}>
            <TeacherList data={teacherList?.data} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <StudentList data={data?.data} />
          </Grid>
        </Grid>
      </div>
    )
  } else navigate("/error")
}
export default SchoolPage
