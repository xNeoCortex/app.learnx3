import React from "react"
import ApiServices from "@/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { Box, Grid, Skeleton, Typography } from "@mui/material"
import ErrorPage from "@/errorpage"
import dayjs from "dayjs"
import { TopicType } from "@/types/types"
import { SnackbarX } from "../other/SnackbarX"
import CustomCard from "../other/CustomCard"

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
		//@ts-ignore
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
						? [1, 2, 3, 4, 5, 6].map((item) => (
								<Grid item xs={6} sm={2} key={item}>
									<Skeleton variant="rounded" sx={{ minHeight: "200px" }} />
								</Grid>
						  ))
						: topics?.data.length > 0 &&
						  topics?.data
								?.sort((a: TopicType, b: TopicType) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
								.slice(0, 6)
								.map((topicObject: TopicType, index: number) => {
									const imageX = topicImages?.data?.find(
										({ name }: { name: string }) => name === topicObject?.imagePath
									)
									return (
										<Grid item xs={6} sm={3} lg={2} key={index}>
											<CustomCard
												title={topicObject.topic}
												link={`/speak/${topicObject.lessonId}`}
												image={imageX?.url}
												category={topicObject.category}
												createdById={topicObject.createdById}
											/>
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
