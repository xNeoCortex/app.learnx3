import React, { memo } from "react"
import { Box, Typography } from "@mui/material"
import CardWrapper from "../elements/CardWrapper"
import { TopicContentType } from "@/types/generatedLessonType"

const FlashCardsBanner = memo(({ lesson }: { lesson: TopicContentType }) => {
	return (
		<CardWrapper background="#fff6c9">
			<Box
				sx={{
					background: "#fff6c9",
					height: "100%",
					width: "100%",
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					alignItems: "center",
				}}
			>
				<Typography variant="h5" fontWeight="bolder" sx={{ color: "black", m: 1, textAlign: "center" }}>
					Learn with Flashcards
					<Typography>
						Learn {lesson?.vocabularies?.length} words about <b>{lesson?.topic}</b>
					</Typography>
				</Typography>
				<img src={"/flash-cards-2.png"} alt="book" style={{ width: "80%", aspectRatio: 1 }} />
			</Box>
		</CardWrapper>
	)
})

export default FlashCardsBanner
