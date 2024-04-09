import React from "react"
import Head from "next/head"
import { Box, CssBaseline } from "@mui/material"
import userDetails from "@/components/hooks/userDetails"
import { useStoreUser } from "@/components/zustand"
import LoadingPage from "@/components/LoadingPage"
import MyDashboard from "./home"
import TeacherDashboard from "./home/teacher"
import ErrorPage from "./error"

export default function Home() {
	const { userInfo } = useStoreUser()
	const { isLoading, error } = userDetails()

	if (isLoading && !userInfo)
		return (
			<Box sx={{ width: "100vw", height: "100vh" }}>
				<LoadingPage />
			</Box>
		)

	if (error) return <ErrorPage />

	return (
		<>
			<Head>
				<title>LearnX3</title>
				<meta name="description" content="English Language teaching platform" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CssBaseline />
			<>
				{userInfo?.role === "student" ? (
					<MyDashboard />
				) : userInfo?.role === "teacher" || userInfo?.role === "admin" ? (
					<TeacherDashboard />
				) : (
					<ErrorPage />
				)}
			</>
		</>
	)
}
