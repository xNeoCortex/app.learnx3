import { memo, useState } from "react"
import { Box, Divider, IconButton, Typography } from "@mui/material"
import TextToSpeechButton from "./TextToSpeechButton"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"
import Translator from "../elements/Translator"
import { brandColors } from "../utils/brandColors"

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
				//@ts-ignore
				sx={{ ...BoxStyle, height: showSampleAnswer ? "fit-content" : 82 }}
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
								mr: 1,
								color: "white",
								fontWeight: 600,
								minWidth: "fit-content",
							}}
						>
							{index + 1}
						</Typography>
						<Translator text={item.question} flexDirection={"row"} iconColor={brandColors.iconGrey} fontSize={12}>
							<TextToSpeechButton text={item.question} buttonSize="25px" />
							<Typography sx={{ fontSize: 16, fontWeight: 500 }}> {item.question}</Typography>
						</Translator>
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
				<Divider color={"red"} />
				<Box width={"100%"} mt={2} fontSize={14}>
					<b> Sample answer</b>
				</Box>
				<Box display={"flex"} alignItems={"center"} width={"100%"}>
					<Translator text={item.sample_answer} flexDirection={"row"} iconColor={brandColors.iconGrey} fontSize={12}>
						<TextToSpeechButton personType="male" text={item.sample_answer} buttonSize="25px" />
						<Typography sx={{ fontSize: 14, fontWeight: 500, width: "100%" }}> {item.sample_answer}</Typography>
					</Translator>
				</Box>
			</Box>
		)
	}
)

export default EachQuestion

const BoxStyle = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	m: "5px 0px",
	padding: "15px",
	borderRadius: 2,
	color: "#323331",
	background: "white",
	boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
	transition: "height 0.5s ease-in-out",
	overflow: "hidden",
}
