"use client"
import { capitalize, Typography } from "@mui/material"
import { Box } from "@mui/system"
import React from "react"
import ApiServices from "../api/ApiServices"
import { useQuery } from "@tanstack/react-query"

const SpeakingInfo = ({ topic = "", imagePath }: { topic: string; imagePath: string }) => {
	const { fetchAiImages } = ApiServices()

	const { data: topicImages } = useQuery({
		queryKey: [`topicImages-${imagePath}`],
		queryFn: () => fetchAiImages(imagePath),
		refetchOnWindowFocus: false,
	})

	return (
		<Box
			//@ts-ignore
			sx={BoxWrapperStyle}
		>
			<Box
				display="flex"
				flexDirection="column"
				sx={{
					display: "flex",
					width: "100%",
					justifyContent: "space-between",
					alignItems: "flexStart",
					padding: "20px",
				}}
			>
				<Typography
					sx={{
						color: "black",
						fontWeight: "500",
						fontSize: "19px",
						padding: "1px",
						margin: "1px",
						marginBottom: "1px",
					}}
				>
					Topic 📚
				</Typography>
				<Typography
					sx={{
						color: "white",
						fontWeight: "600",
						fontSize: "44px",
						padding: "1px",
						margin: "1px",
						marginBottom: "10px",
						background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						width: "fit-content",
					}}
				>
					{capitalize(topic)}
				</Typography>
			</Box>
			<Box
				sx={{
					width: "300px",
					height: "200px",
					backgroundImage: `url(${topicImages?.data.url || "/mobile-book.svg"})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					boxShadow: "20px 0px 15px white inset ",
					borderColor: "white",
				}}
			/>
		</Box>
	)
}

export default SpeakingInfo

const BoxWrapperStyle = {
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	width: "100%",
	borderRadius: "8px",
	overflow: "hidden",
	position: "relative",
	background: "white",
	maxHeight: 200,
}
