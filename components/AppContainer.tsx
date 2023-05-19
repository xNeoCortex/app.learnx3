import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { useStoreTemporary, useStoreUser } from "./Zustand"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Box, CssBaseline, Grid } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import ErrorPage from "./ErrorPage"
import ClassAllocation from "./other/ClassAllocation"
import Sidebar from "./sidebar"

const theme = createTheme()

function AppContainer({ children }) {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()
	const { fetchClasses } = ApiServices()
	const { data: classList, isLoading, isError } = useQuery(["classList"], fetchClasses)
	const { classInfo, setClassInfo } = useStoreTemporary()

	const matchedTeacherClass = classList?.data.find((c) => c.teachers.includes(userInfo.uid))
	const matchedStudentClass = classList?.data.find((c) => c.students.includes(userInfo.uid))

	console.log("AppContainer userInfo :>> ", userInfo)
	const navigateUser = () => {
		if (userInfo.role === "teacher" && userInfo.permit === true) {
			matchedTeacherClass && setClassInfo(matchedTeacherClass)
			return matchedTeacherClass && navigate(`classes/${matchedTeacherClass?.uid}`)
		} else if (userInfo.role === "student") {
			matchedStudentClass && setClassInfo(matchedStudentClass)
			return matchedStudentClass && navigate(`classes/${matchedStudentClass?.uid}`)
		} else if (userInfo.role === "admin") {
			return navigate("/classes")
		} else {
			return navigate("error")
		}
	}

	console.log("appContainer userInfo:>> ", userInfo)

	useEffect(() => {
		navigateUser()
	}, [isLoading, userInfo])

	if ((userInfo.role === "teacher" && !matchedTeacherClass) || (userInfo.role === "student" && !matchedStudentClass)) {
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
					<Sidebar classId={classInfo?.uid} />
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
						{children}
					</Box>
				</Grid>
			</ThemeProvider>
		</Grid>
	)
}

export default AppContainer
