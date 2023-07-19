import React from "react"
import { Box, Chip, CssBaseline, Typography } from "@mui/material"

function SpeakQuiz({ test, show, index, handleSelect }) {
	console.log("test :>> ", test)
	return (
		<Box
			key={index}
			mb="10px"
			p={2}
			borderRadius="10px"
			sx={{
				display: "flex",
				flex: 1,
				margin: "10px 2px",
				flexDirection: "column",
				background: show ? (test?.response?.correct ? "#d8f3dc" : "#ffccd578") : "white",
				boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
			}}
		>
			<CssBaseline />
			<h4>{`${index + 1}. ${test.question}`}</h4>
			<Box>
				{test?.options?.map((item, key) => (
					<Chip
						key={key}
						onClick={() => handleSelect(item, index)}
						sx={{
							border: "1px solid rgb(95, 106, 196)",
							borderRadius: 2,
							color: "rgb(95, 106, 196)",
							width: "fit-content",
							margin: "20px 20px 0px 0px",
							fontWeight: "bolder",
							background: test?.response?.option == item?.option ? "#5d5fc4b5" : "white",
						}}
						label={item?.option}
						variant="outlined"
					/>
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
						background: "#06d6a021",
					}}
				>
					Correct Answer: <strong> {test?.options.find((item) => item?.correct)?.option}</strong>
				</Typography>
			)}
		</Box>
	)
}

export default SpeakQuiz
