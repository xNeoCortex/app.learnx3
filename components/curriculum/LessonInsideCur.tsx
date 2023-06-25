import { Box, Grid, Typography, capitalize, CardMedia, Button } from "@mui/material"
import Link from "next/link"
import React from "react"
import sortByCategory from "../helpers/sortByCategory"
import MyTooltip from "../other/MyTooltip"
import { lessonColors } from "../utils/lessonColors"
import { lessonIcons } from "../utils/lessonIcons"
import { lessonImages } from "../utils/lessonImages"

function LessonInsideCur({ data, curriculumData }) {
	return (
		<Grid item xs={4}>
			{/* <MyTooltip
				content={
					<Grid container spacing={2}>
						{data?.lessonItems?.map((lesson) => (
							<SmallLessonCard lessonInfo={lesson} />
						))}
					</Grid>
				}
			> */}
			<Link href={`/curriculum/${curriculumData.uid}?lesson=${data.lessonNumber}`} style={{ width: "100%" }}>
				<Box
					sx={{
						background: "white",
						border: "1px solid black",
						p: "10px",
						borderRadius: 2,
						cursor: "pointer",
						"&:hover": {
							boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.43) 0px 3px 6px;",
							border: "none",
							// backgroundColor: "rgba(95, 106, 196, 0.6)",
							// color: "white",
						},
					}}
				>
					<Typography sx={{ color: "rgb(50, 50, 93)", fontWeight: 600 }}>📗 Lesson {data.lessonNumber}</Typography>
					<Box sx={{ mt: 1 }}>
						{data?.lessonItems?.sort(sortByCategory).map(({ category, topic }, index) => (
							<Typography
								key={index}
								noWrap
								sx={{ fontSize: 12, mb: 1, p: "3px 10px", borderRadius: 1, background: lessonColors[category] }}
							>
								{lessonIcons[category]} {capitalize(category)}: {topic}
							</Typography>
						))}
					</Box>
				</Box>
				<Box></Box>
			</Link>
			{/* </MyTooltip> */}
		</Grid>
	)
}

export default LessonInsideCur

function SmallLessonCard({ lessonInfo }) {
	return (
		<Grid item xs={12} sm={6} sx={{ width: 130 }}>
			<Link href={`/curriculum/${lessonInfo.category}/${lessonInfo.uid}`}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
						borderRadius: "10px",
						padding: "10px 20px 20px",
						position: "relative",
						height: "100%",
						minHeight: 150,
						backgroundColor: lessonColors[lessonInfo.category],
						boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
					}}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							flexDirection: "column",
						}}
					>
						<Box
							sx={{
								color: "#c270c8",
								background: "transparent",
								border: "1px solid #c270c8",
								margin: "5px",
								borderRadius: "0.75rem",
								fontSize: "10px",
								position: "absolute",
								fontWeight: "bold",
								top: 4,
								left: 4,
								p: "5px 10px",
							}}
						>
							{lessonInfo?.category}
						</Box>
						<CardMedia
							component="img"
							image={lessonImages[lessonInfo?.category]}
							alt="test image"
							sx={{ width: 70, mb: 1, height: 70, objectFit: "contain" }}
						/>
						<Typography
							sx={{
								color: "rgb(50, 50, 93)",
								fontWeight: 600,
								fontSize: 12,
								padding: 0,
								textAlign: "center",
							}}
						>
							{capitalize(lessonInfo?.topic)}
						</Typography>
					</Box>
					<Button
						style={{
							color: "#5f61c4",
							margin: "10px 15px 0px",
							textTransform: "none",
						}}
					>
						View
					</Button>
				</Box>
			</Link>
		</Grid>
	)
}
