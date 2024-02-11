"use client"
import React, { memo } from "react"
import { Box, capitalize, CssBaseline, Typography } from "@mui/material"
import { QuestionsType } from "@/types/GeneratedLessonType"

const SpeakQuiz = memo(
	({
		test,
		show,
		index,
		handleSelect,
	}: {
		test: QuestionsType
		show: boolean
		index: number
		handleSelect: (
			item: {
				option: string
				correct: boolean
			},
			index: number
		) => void
	}) => {
		const abc = ["A", "B", "C", "D"]
		return (
			<Box
				key={index}
				mb="10px"
				borderRadius="10px"
				sx={{
					display: "flex",
					flex: 1,
					flexDirection: "column",
					background: show ? (test?.response?.correct ? "#06d6a021" : "#ef233c26") : "transparent",
					border: show ? (test?.response?.correct ? "2px solid #06d6a0" : "2px solid #ef233c") : "transparent",
					p: show ? 1 : 0,
					boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
				}}
			>
				<CssBaseline />
				<Typography fontWeight="bolder" sx={{ color: "white", fontSize: 18 }}>{`${index + 1}. ${
					test?.question
				}`}</Typography>
				<Box>
					{test?.options?.map((item, key) => (
						<Typography
							key={key}
							onClick={() => handleSelect(item, index)}
							sx={{
								cursor: "pointer",
								border: test?.response?.option == item?.option ? "3px solid #90e0ef" : "1px solid #90e0ef",
								borderRadius: 2,
								color: "#e1e1e1",
								width: "100%",
								margin: "20px 20px 0px 0px",
								fontSize: 16,
								p: 2,
								textAlign: "start",
								background: test?.response?.option == item?.option ? "rgb(144 224 239 / 30%)" : "transparent",
							}}
						>
							{abc[key]}. {capitalize(item?.option)}
						</Typography>
					))}
				</Box>
				{show && (
					<Typography
						sx={{
							mt: 2,
							mb: 1,
							border: "2px solid #06d6a0",
							borderRadius: 2,
							p: 1,
							background: "#06d6a0",
							color: "black",
						}}
					>
						Correct Answer: <strong> {capitalize(test?.options?.find((item) => item.correct)?.option || "")}</strong>
					</Typography>
				)}
			</Box>
		)
	}
)

export default SpeakQuiz
