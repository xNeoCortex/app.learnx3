import React from "react"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import SnackbarX from "@/components/other/SnackbarX"
import { Box, Grid, Skeleton, Typography } from "@mui/material"
import ErrorPage from "../ErrorPage"
import ImgMediaCard from "../other/Card"
import dayjs from "dayjs"

function DashboardTopics(props) {
	const [open, setOpen] = React.useState(false)

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
	if (isError) return <ErrorPage />

	return (
		<>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message="You have successfully cancelled your sessions!"
			/>

			<Typography
				style={{
					margin: "0px 10px 10px 0px",
					fontWeight: 600,
					fontSize: 19,
					color: "#5f616a",
				}}
			>
				{topics?.data.length > 0 ? "Recent topics" : "No recent topics"}
			</Typography>
			{
				<Grid container spacing={2}>
					{isLoading
						? [1, 2, 3, 4, 5].map((item) => (
								<Skeleton key={item} variant="rounded" sx={{ margin: "10px", width: "320px", minHeight: "150px" }} />
						  ))
						: topics?.data.length > 0 &&
						  topics.data
								?.sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
								.slice(0, 4)
								.map((x, index) => (
									<Grid item xs={6} sm={6} lg={3} key={index}>
										<ImgMediaCard title={x.topic} link={`/speak/${x.lessonId}`} />
									</Grid>
								))}
				</Grid>
			}
		</>
	)
}

export default DashboardTopics
