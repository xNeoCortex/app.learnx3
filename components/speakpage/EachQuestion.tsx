import { memo, useState } from "react"
import { Box, IconButton, Typography } from "@mui/material"
import TextToSpeechButton from "./TextToSpeechButton"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

const EachQuestion = memo(
	({
		item,
		index,
	}: {
		item: {
			question: string
			sample_answer: string
		}
		index: number
	}) => {
		const [showSampleAnswer, setShowSampleAnswer] = useState(false)
		return (
			<Box
				key={index}
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					m: "5px 0px",
					padding: "15px",
					borderRadius: 2,
					color: "#323331",
					background: "white",
					boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
					height: showSampleAnswer ? "fit-content" : 70,
					transition: "height 0.5s ease-in-out",
					overflow: "hidden",
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
						<Typography
							sx={{
								fontSize: 16,
								padding: "5px 10px",
								background: "#f48282",
								borderRadius: 2,
								width: "fit-content",
								mr: 2,
								color: "white",
								fontWeight: 600,
								minWidth: "fit-content",
							}}
						>
							{index + 1}
						</Typography>
						<Typography sx={{ fontSize: 16, fontWeight: 500 }}> {item.question}</Typography>
						<TextToSpeechButton text={item.question} buttonSize="25px" />
					</Box>
					{!showSampleAnswer ? (
						<IconButton onClick={() => setShowSampleAnswer(true)}>
							<ExpandMoreIcon />
						</IconButton>
					) : (
						<IconButton onClick={() => setShowSampleAnswer(false)}>
							<ExpandLessIcon />
						</IconButton>
					)}
				</Box>
				<Typography sx={{ fontSize: 16, fontWeight: 500, width: "100%", mt: 2 }}>
					{" "}
					<TextToSpeechButton personType="male" text={item.sample_answer} buttonSize="25px" />
					<b> Sample answer:</b> {item.sample_answer}
				</Typography>
			</Box>
		)
	}
)

export default EachQuestion
