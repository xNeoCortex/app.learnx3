import React, { useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import ErrorPage from "./ErrorPage"
import ClassAllocation from "./other/ClassAllocation"
import { useClassInfo, useStoreUser } from "./zustand"
import LoadingPage from "./LoadingPage"

function AppContainer({ children }: any) {
	const {
		push: navigate,
		query: { id },
	} = useRouter()
	const { userInfo } = useStoreUser()
	const { fetchClasses } = ApiServices()
	const {
		data: classList,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["classList"],
		queryFn: fetchClasses,
		refetchOnWindowFocus: false,
	})
	const { setClassInfo } = useClassInfo()

	const matchedTeacherClass = classList?.data.find((c) => c?.teachers.includes(userInfo?.uid))
	const matchedStudentClass = classList?.data.find((c) => c?.students.includes(userInfo?.uid))
	const currentClass = classList?.data.find((c) => c.uid === id)

	const navigateUser = () => {
		if (id) setClassInfo(currentClass) // setClassInfo when a user is on that class -> this was implemented to fix admin navbar class info issue
		if (!userInfo?.role) return navigate("/auth/login")
		if (userInfo?.role === "teacher" && userInfo?.permit === true && matchedTeacherClass !== undefined) {
			setClassInfo(matchedTeacherClass)
			return navigate(`/classes/${matchedTeacherClass?.uid}`)
		} else if (userInfo?.role === "student" && matchedStudentClass) {
			setClassInfo(matchedStudentClass)
			return navigate(`/classes/${matchedStudentClass?.uid}`)
		}
	}

	useEffect(() => {
		navigateUser()
	}, [isLoading, userInfo])

	if (isError) return <ErrorPage />
	if (isLoading)
		return (
			<Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<LoadingPage />
			</Box>
		)

	if (
		(userInfo?.role === "teacher" && !matchedTeacherClass) ||
		(userInfo?.role === "student" && !matchedStudentClass)
	) {
		return <ClassAllocation />
	}

	return <Box sx={{ width: "100%" }}>{children}</Box>
}

export default AppContainer
