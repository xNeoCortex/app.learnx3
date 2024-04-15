// Home.jsx
import React from "react"
import Head from "next/head"
import { Box, CssBaseline } from "@mui/material"
import LoadingPage from "@/components/LoadingPage"
import MyDashboard from "./home"
import TeacherDashboard from "./home/teacher"
import ErrorPage from "./error"
import { useStoreUser } from "@/components/zustand"
import useUserDetails from "@/components/hooks/userDetails"

export default function Home() {
	const { isLoading, error } = useUserDetails()
	const { userInfo } = useStoreUser()

	if (isLoading) {
		return (
			<Box sx={{ width: "100vw", height: "100vh" }}>
				<LoadingPage />
			</Box>
		)
	}

	if (error) {
		return <ErrorPage />
	}

	return (
		<>
			<Head>
				<title>LearnX3</title>
				<meta name="description" content="English Language teaching platform" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CssBaseline />
			<>{userInfo && (userInfo.role === "student" ? <MyDashboard /> : <TeacherDashboard />)}</>
		</>
	)
}
