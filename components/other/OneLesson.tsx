import React from "react"
import { Box, Button, Chip, Typography } from "@mui/material"
import Link from "next/link"

function OneLesson({ lesson }) {
	return (
		<Box
			style={{
				boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
				padding: "10px 20px",
				flex: 2,
				minWidth: "320px",
				maxWidth: "320px",
				margin: "20px 20px 10px 0px",
				marginTop: "15px",
				borderRadius: "8px",
				color: "white",
				maxHeight: "250px",
				display: "flex",
				justifyContent: "space-between",
				flexDirection: "column",
				position: "relative",
				background: "rgb(95 106 196 / 3%)",
			}}
		>
			<Box
				style={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "row",
					height: "100%",
				}}
			>
				<Box width="100%">
					<Typography
						style={{
							color: "rgb(50, 50, 93)",
							fontWeight: 600,
							fontSize: 14,
							padding: 0,
							marginBottom: 5,
						}}
					>
						Lesson {lesson.lesson}
					</Typography>
					<Typography
						style={{
							color: "rgb(50, 50, 93)",
							fontWeight: 500,
							fontSize: 18,
							padding: "0px 5px 0px 0px",
							marginBottom: 5,
							overflow: "hidden",
						}}
					>
						{lesson?.topic.length < 25
							? lesson?.topic.split(" ")[0].slice(0, 1).toUpperCase() + lesson?.topic.slice(1)
							: lesson?.topic.split(" ")[0].slice(0, 1).toUpperCase() + lesson?.topic.slice(1, 25) + "..."}
					</Typography>
					<Box display="flex" alignItems="center" marginTop="10px" justifyContent="space-between">
						<Box>
							<Chip
								label={lesson.level}
								variant="outlined"
								style={{
									color: "rgb(50, 50, 93)",
									background: "transparent",
									margin: "5px 10px 5px 0px",
									border: "1px solid rgb(50, 50, 93)",
									borderRadius: "0.75rem",
									fontSize: 12,
								}}
							/>
							<Chip
								label="60 min"
								variant="outlined"
								style={{
									color: "rgb(50, 50, 93)",
									background: "transparent",
									border: "1px solid rgb(50, 50, 93)",
									margin: "5px 10px 5px 0px",
									borderRadius: "0.75rem",
									padding: "0px 2px",
									fontSize: 12,
								}}
							/>
						</Box>
						<Link href={`/curriculum`}>
							{/* <Link href={`/curriculum/[categoryId}]/[id]`} as={`/curriculum/${lesson.category}/${lesson.uid}`}> */}
							<Button
								variant="contained"
								sx={{
									padding: "2px 10px",
									textTransform: "none",
									background: "rgb(95, 106, 196)",
								}}
							>
								Open
							</Button>
						</Link>
					</Box>
				</Box>
				<img
					style={{
						color: "aqua",
						height: 60,
						position: "absolute",
						top: -20,
						right: "15px",
						zIndex: 999,
					}}
					src="../book.svg"
					alt="book"
				/>
			</Box>
		</Box>
	)
}

export default OneLesson
