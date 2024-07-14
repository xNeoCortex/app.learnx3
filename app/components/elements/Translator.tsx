"use client"
import { useState } from "react"
import { Box, IconButton, Typography } from "@mui/material"
import axios from "axios"
import GTranslateIcon from "@mui/icons-material/GTranslate"
import { brandColors } from "../utils/brandColors"
import { TailSpin } from "react-loading-icons"

export default function Translator({
	text,
	fontSize,
	fontColor,
	iconColor,
	flexDirection,
	translateIconWidth,
	children,
}: {
	text: string
	fontSize?: number | string
	fontColor?: string
	iconColor?: string
	translateIconWidth?: string | number
	flexDirection?: "row" | "column"
	children: any
}) {
	const [targetLanguage, setTargetLanguage] = useState("Russian")
	const [translatedText, setTranslatedText] = useState("")
	const [propText, setPropText] = useState("")
	const [loading, setLoading] = useState(false)

	const handleTranslate = async () => {
		setLoading(true)
		setPropText(text)
		try {
			const response = await axios.post("/api/translate", { text, targetLanguage })
			const data = response.data
			setTranslatedText(data.translatedText)
			setLoading(false)
		} catch (error) {
			console.error("Error translating text:", error)
			setLoading(false)
			setTranslatedText("Failed to translate text")
		}
	}

	return (
		<Box
			//@ts-ignore
			display={text ? "flex" : "none"}
			flexDirection={flexDirection ?? "column"}
			gap={"4px"}
			mt={"6px"}
			maxWidth={"100%"}
		>
			<Box display={"flex"} alignItems={"center"} maxWidth={"100%"} flex={4}>
				<IconButton onClick={handleTranslate}>
					<GTranslateIcon
						sx={{
							color: iconColor ?? "#060634",
							width: translateIconWidth ?? "22px",
							height: translateIconWidth ?? "22px",
						}}
					/>
				</IconButton>
				{children}
			</Box>
			<Box
				display={"flex"}
				flexDirection={flexDirection ?? "row"}
				gap={1}
				maxWidth={"100%"}
				flex={translatedText ? 3 : 0}
				padding={"0px 2px"}
			>
				{loading ? (
					<TailSpin style={{ width: "20px" }} stroke={brandColors.darkBlue} />
				) : (
					translatedText && (
						<Box
							display={propText !== text ? "none" : "flex"}
							width={"100%"}
							alignItems={"center"}
							justifyContent={"center"}
							border={"1px solid #E0E0E0"}
							borderRadius={"8px"}
							bgcolor={"#F9F9F9"}
							padding={"4px 8px"}
						>
							<Typography fontSize={fontSize ?? "inherit"} color={fontColor ?? brandColors.darkerGrey}>
								{translatedText}
							</Typography>
						</Box>
					)
				)}
			</Box>
		</Box>
	)
}
