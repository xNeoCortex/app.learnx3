import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { createTheme } from "@mui/material/styles"
import { Box } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import ErrorPage from "./ErrorPage"
import ClassAllocation from "./other/ClassAllocation"
import { useStoreTemporary, useStoreUser } from "./zustand"

function AppContainer({ children }: any) {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()
	const { fetchClasses } = ApiServices()
	const { data: classList, isLoading, isError } = useQuery(["classList"], fetchClasses)
	const { classInfo, setClassInfo } = useStoreTemporary()

	const matchedTeacherClass = classList?.data.find((c) => c?.teachers.includes(userInfo?.uid))
	const matchedStudentClass = classList?.data.find((c) => c?.students.includes(userInfo?.uid))

	console.log("AppContainer userInfo :>> ", userInfo)
	const navigateUser = () => {
		if (userInfo?.role === "teacher" && userInfo?.permit === true) {
			matchedTeacherClass && setClassInfo(matchedTeacherClass)
			return matchedTeacherClass && navigate(`classes/${matchedTeacherClass?.uid}`)
		} else if (userInfo?.role === "student") {
			matchedStudentClass && setClassInfo(matchedStudentClass)
			return matchedStudentClass && navigate(`classes/${matchedStudentClass?.uid}`)
		} else if (userInfo?.role === "admin") {
			return
		} else {
			return navigate("/error")
		}
	}

	useEffect(() => {
		navigateUser()
	}, [isLoading, userInfo])

	if (
		(userInfo?.role === "teacher" && !matchedTeacherClass) ||
		(userInfo?.role === "student" && !matchedStudentClass)
	) {
		return <ClassAllocation />
	}

	if (isError) return <ErrorPage />

	return <Box sx={{ width: "100%" }}>{children}</Box>
}

export default AppContainer
