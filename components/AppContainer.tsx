import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import ClassAllocation from "./other/ClassAllocation"
import { useStoreUser } from "./zustand"

function AppContainer({ children }: any) {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()

	const navigateUser = () => {
		// if (id) setClassInfo(currentClass) // setClassInfo when a user is on that class -> this was implemented to fix admin navbar class info issue
		if (!userInfo?.role) return navigate("/auth/login")
		if (userInfo?.role === "teacher" && userInfo?.permit === true) {
			return navigate(`/home/teacher`)
		} else if (userInfo?.role === "student" && userInfo?.permit === true) {
			return navigate(`/home`)
		} else return <ClassAllocation />
	}

	useEffect(() => {
		navigateUser()
	}, [userInfo])

	return <Box sx={{ width: "100%" }}>{children}</Box>
}

export default AppContainer
