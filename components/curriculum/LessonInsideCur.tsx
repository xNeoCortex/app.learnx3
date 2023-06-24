import { Box, Grid, Typography, capitalize, CardMedia, Button, Chip } from "@mui/material"
import Link from "next/link"
import React from "react"
import MyTooltip from "../other/MyTooltip"
import { lessonColors } from "../utils/colors"

function LessonInsideCur({ data, curriculumData }) {
	return (
		<Grid item xs={3}>
			<MyTooltip
				content={
					<Grid container spacing={2}>
						{data?.lessonItems?.map((lesson) => (
							<SmallLessonCard lessonInfo={lesson} />
						))}
					</Grid>
				}
			>
				<Link href={`/curriculum/${curriculumData.uid}?lesson=${data.lessonNumber}`} style={{ width: "100%" }}>
					<Box
						sx={{
							border: "1px solid black",
							p: "4px 10px",
							borderRadius: 2,
							cursor: "pointer",
							"&:hover": { backgroundColor: "rgba(95, 106, 196, 0.9)", color: "white" },
						}}
					>
						<Typography>📗 Lesson {data.lessonNumber}</Typography>
					</Box>
				</Link>
			</MyTooltip>
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
							{lessonInfo.category}
						</Box>
						<CardMedia
							component="img"
							image={
								lessonInfo.category == "vocabulary"
									? "/vocabulary-image.png"
									: lessonInfo.category == "reading"
									? "/e-book.svg"
									: lessonInfo.category == "writing"
									? "/pencil_2.png"
									: "/holding-speaker.png"
							}
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
							{capitalize(lessonInfo.topic)}
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
