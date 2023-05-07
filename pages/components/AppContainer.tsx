import { Box } from "@mui/system"
import React, { useCallback, useEffect, useState } from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline, Grid } from "@mui/material"
import { Outlet, useNavigate } from "react-router-dom"
import Sidebar from "./sidebar"
import { useStoreTemporary, useStoreUser } from "@/pages/zustand"
import ApiServices from "@/pages/api/ApiServices"
import ClassAllocation from "./Components/ClassAllocation"
import ErrorPage from "./Components/ErrorPage"
import { useQuery } from "react-query"

const theme = createTheme()

function AppContainer(props: any) {
  const navigate = useNavigate()
  const { userInfo } = useStoreUser()
  const { fetchClasses } = ApiServices()
  const {
    data: classList,
    isLoading,
    isError,
  } = useQuery(["classList"], fetchClasses)
  const { classInfo, setClassInfo } = useStoreTemporary()

  const matchedTeacherClass = classList?.data.find((c) =>
    c.teachers.includes(userInfo.uid)
  )

  const matchedStudentClass = classList?.data.find((c) =>
    c.students.includes(userInfo.uid)
  )

  const navigateUser = () => {
    if (userInfo.role === "teacher" && userInfo.permit === true) {
      matchedTeacherClass && setClassInfo(matchedTeacherClass)
      return (
        matchedTeacherClass && navigate(`class/${matchedTeacherClass?.docId}`)
      )
    } else if (userInfo.role === "student") {
      matchedStudentClass && setClassInfo(matchedStudentClass)
      return (
        matchedStudentClass && navigate(`class/${matchedStudentClass?.docId}`)
      )
    } else if (userInfo.role === "admin") {
      return navigate("/")
    }
  }

  useEffect(() => {
    navigateUser()
  }, [isLoading, userInfo])

  if (
    (userInfo.role === "teacher" && !matchedTeacherClass) ||
    (userInfo.role === "student" && !matchedStudentClass)
  ) {
    return <ClassAllocation />
  }

  if (isError) return <ErrorPage />

  return (
    <Grid sx={{ width: "100%" }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            height: "100vh",
          }}
        >
          <Sidebar classId={classInfo?.docId} />
          <Box
            style={{
              background: "#5f6ac40a",
              padding: "20px",
              borderRadius: 5,
              maxWidth: "none",
              minHeight: "calc(100vh - 0px)",
              width: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </ThemeProvider>
    </Grid>
  )
}

export default AppContainer
