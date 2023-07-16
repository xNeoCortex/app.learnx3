import React from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Box, CssBaseline, Grid } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "../api/ApiServices"
import ImgMediaCard from "@/components/other/Card"
import CreateAiLesson from "@/components/dashboard/CreateAiLesson"
import ErrorPage from "../error"
import dayjs from "dayjs"

function index() {
	const { apiRequest } = ApiServices()
	const {
		data: topics,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["lessonByAiTopics"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonByAiTopics" }),
		refetchOnWindowFocus: false,
	})

	console.log("topics :>> ", topics)

	if (isError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Box sx={{ marginTop: "20px", width: "100%" }}>
					<CreateAiLesson />
					<Grid container spacing={2}>
						{topics?.data
							.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
							.map((x) => (
								<Grid item xs={12} sm={3} lg={2}>
									<ImgMediaCard title={x.topic} link={`/speak/${x.lessonId}`} />
								</Grid>
							))}
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default index
