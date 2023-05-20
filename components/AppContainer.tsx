import React, { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import ErrorPage from "./ErrorPage"
import ClassAllocation from "./other/ClassAllocation"
import { useStoreTemporary, useStoreUser } from "./zustand"
import LoadingPage from "./LoadingPage"

function AppContainer({ children }: any) {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()
	const { fetchClasses } = ApiServices()
	const { data: classList, isLoading, isError } = useQuery(["classList"], fetchClasses)
	const { setClassInfo } = useStoreTemporary()

	const matchedTeacherClass = classList?.data.find((c) => c?.teachers.includes(userInfo?.uid))
	const matchedStudentClass = classList?.data.find((c) => c?.students.includes(userInfo?.uid))

	const navigateUser = () => {
		if (!userInfo?.role) return navigate("/auth/login")
		if (userInfo?.role === "teacher" && userInfo?.permit === true) {
			matchedTeacherClass && setClassInfo(matchedTeacherClass)
			return matchedTeacherClass && navigate(`/classes/${matchedTeacherClass?.uid}`)
		} else if (userInfo?.role === "student") {
			matchedStudentClass && setClassInfo(matchedStudentClass)
			return matchedStudentClass && navigate(`/classes/${matchedStudentClass?.uid}`)
		}
	}

	useEffect(() => {
		navigateUser()
	}, [isLoading, userInfo])

	if (isError) return <ErrorPage />
	if (isLoading) {
		return <LoadingPage />
	}

	if (
		(userInfo?.role === "teacher" && !matchedTeacherClass) ||
		(userInfo?.role === "student" && !matchedStudentClass)
	) {
		return <ClassAllocation />
	} else {
		return <Box sx={{ width: "100%" }}>{children}</Box>
	}
}

export default AppContainer
