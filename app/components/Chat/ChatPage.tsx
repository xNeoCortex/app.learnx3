"use client"
import { useChatStore, useSuggestionsStore } from "../zustand"
import axios from "axios"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { brandColors } from "../utils/brandColors"
import GradientText from "../elements/GradientText"
import { createRef, useEffect } from "react"
const UseAudioRecorder = dynamic(() => import("./UseAudioRecorder"), { ssr: false })

export default function Chat() {
	const { messages } = useChatStore()
	const { suggestion, addSuggestion } = useSuggestionsStore()

	const handleSuggestion = async () => {
		const { data } = await axios.post("/api/ai-suggestion", {
			prompt: JSON.stringify(messages),
		})

		addSuggestion(data.suggestionFromGPT)
	}

	//scroll to bottom
	const chatsRef = createRef() as any

	const scrollToBottom = () => {
		// @ts-ignore
		chatsRef.current.scrollTop = chatsRef.current.scrollHeight
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	return (
		<Box
			//@ts-ignore
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				height: "100%",
				flex: 1,
				gap: 1,
				p: "10px",
				maxHeight: "100%",
				boxSizing: "border-box",
				backgroundColor: "black",
				transition: "all 0.3s ease-in-out",
			}}
		>
			<Typography color={"white"} fontWeight={"bold"} fontSize={"small"}>
				<GradientText text="AI English Practice Room" />
			</Typography>
			<Box sx={{ width: "100%", overflow: "scroll", height: "100%", maxHeight: 500 }}>
				<Stack
					ref={chatsRef}
					spacing={2}
					sx={{ alignSelf: "stretch", overflowY: "scroll", height: "100%", maxHeight: "100%", mt: "8px" }}
				>
					{messages?.slice(1).map(
						(
							message: {
								role: string
								content: string
							},
							index: number
						) => (
							<Box
								key={index}
								sx={{
									alignSelf: message.role === "user" ? "flex-end" : "flex-start",
									borderWidth: "0.5px",
									p: 1,
									maxWidth: "90%",
									backgroundColor: message.role === "user" ? "#f4d35e" : "#4361ee",
									minWidth: 150,
									borderRadius: "8px",
									boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
								}}
							>
								{message?.content && (
									<Typography
										fontSize={12}
										sx={{
											width: "fit-content",
											color: message.role === "user" ? "black" : "white",
										}}
									>
										{message.content}
									</Typography>
								)}
							</Box>
						)
					)}
				</Stack>
			</Box>
			{/* @ts-ignore */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: 90,
					justifyContent: "space-between",
					flexDirection: "column",
					gap: 1,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "flex-start", width: "100%" }}>
					<Button
						size="small"
						variant="outlined"
						onClick={handleSuggestion}
						sx={{
							textDecoration: "none",
							width: "90px",
							textTransform: "none",
							border: "1px solid #f4d35e",
							color: "#f4d35e",
							fontWeight: "semibold",
							fontSize: "10px",
							" &:hover": { border: "1px solid #f4d35e", backgroundColor: "#f4d35e", color: "black" },
						}}
					>
						💡 Suggest
					</Button>
					{suggestion && (
						<Typography fontSize={10} color={brandColors.lightGrey}>
							{suggestion}
						</Typography>
					)}
				</Box>

				<UseAudioRecorder />
			</Box>
		</Box>
	)
}
