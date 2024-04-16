import React from "react"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { Box, Grid, Skeleton, Typography } from "@mui/material"
import ErrorPage from "../../pages/errorpage"
import ImgMediaCard from "../other/Card"
import dayjs from "dayjs"
import { TopicType } from "@/types/types"
import { SnackbarX } from "../other/SnackbarX"

function DashboardTopics() {
	const [open, setOpen] = React.useState(false)
	const { apiRequest, fetchAiImages } = ApiServices()

	const {
		data: topics,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["lessonByAiTopics"],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonByAiTopics" }),
		refetchOnWindowFocus: false,
	})
	const { data: topicImages, isError: isErrorImages } = useQuery({
		queryKey: ["topicImages"],
		queryFn: () => fetchAiImages(),
		refetchOnWindowFocus: false,
	})

	if (isError || isErrorImages) return <ErrorPage />

	return (
		<Box>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message="You have successfully cancelled your sessions!"
			/>

			<Typography sx={TextStyle}>{topics?.data.length > 0 ? "Recent topics" : "No recent topics"}</Typography>
			{
				<Grid container spacing={2}>
					{isLoading
						? [1, 2, 3, 4, 5].map((item) => (
								<Skeleton key={item} variant="rounded" sx={{ margin: "10px", width: "320px", minHeight: "150px" }} />
						  ))
						: topics?.data.length > 0 &&
						  topics.data
								?.sort((a: TopicType, b: TopicType) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
								.slice(0, 6)
								.map((topicObject: TopicType, index: number) => {
									const imageX = topicImages?.data?.find(
										({ name }: { name: string }) => name === topicObject?.imagePath
									)
									return (
										<Grid item xs={6} sm={3} lg={2} key={index}>
											<ImgMediaCard title={topicObject.topic} link={`/speak/${topicObject.lessonId}`} image={imageX} />
										</Grid>
									)
								})}
				</Grid>
			}
		</Box>
	)
}

export default DashboardTopics

const TextStyle = {
	margin: "0px 10px 10px 0px",
	fontWeight: "600",
	fontSize: "19px",
	color: "#5f616a",
}
