import { Box, Grid, Typography, capitalize, CardMedia, Button, Divider } from "@mui/material"
import Link from "next/link"
import React from "react"
import sortByCategory from "../helpers/sortByCategory"
import LessonCompleted from "../LessonCompleted"
import MyTooltip from "../other/MyTooltip"
import { lessonColors } from "../utils/lessonColors"
import { lessonIcons } from "../utils/lessonIcons"
import { lessonImages } from "../utils/lessonImages"
import { useStoreUser } from "../zustand"

function LessonInsideCur({ lessonData, curriculumData, matchClass }) {
	const { userInfo } = useStoreUser()

	return (
		<Grid item xs={12} sm={6} lg={4}>
			{/* <MyTooltip
				content={
					<Grid container spacing={2}>
						{lessonData?.lessonItems?.map((lesson) => (
							<SmallLessonCard lessonInfo={lesson} />
						))}
					</Grid>
				}
			> */}
			<Box
				sx={{
					background: "white",
					p: "10px",
					borderRadius: 2,
					boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",

					"&:hover": {
						boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.43) 0px 3px 6px;",
						border: "none",
					},
				}}
			>
				<Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
					<Typography sx={{ color: "rgb(50, 50, 93)", fontWeight: 600 }}>
						📗 Lesson {lessonData.lessonNumber}
					</Typography>
					<Link
						href={`/curriculum/${curriculumData.uid}?lesson=${lessonData.lessonNumber}`}
						style={{ width: "fit-content" }}
					>
						<Button
							sx={{
								textDecoration: "none",
								background: "rgb(95, 106, 196)",
								color: "white",
								textTransform: "none",
								m: 1,
								p: 0,
								"&:hover": {
									background: "rgba(95, 106, 196, 0.7)",
								},
							}}
						>
							View
						</Button>
					</Link>
				</Box>
				<Divider />
				<Box sx={{ mt: 1 }}>
					{lessonData?.lessonItems?.sort(sortByCategory).map(({ category, topic, uid }, index) => (
						<Box key={index} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
							<Typography
								key={index}
								noWrap
								sx={{
									fontSize: 12,
									mb: 1,
									p: "3px 10px",
									borderRadius: 1,
									background: lessonColors[category],
								}}
							>
								{lessonIcons[category]} {capitalize(category)}: {topic}
							</Typography>
							{userInfo.role == "teacher" && <LessonCompleted uid={uid} classInfo={matchClass} />}
						</Box>
					))}
				</Box>
			</Box>
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
