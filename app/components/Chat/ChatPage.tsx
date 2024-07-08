"use client"
import { createRef, useEffect } from "react"
import { useChatStore, useSuggestionsStore } from "../zustand"
import axios from "axios"
import { Box, Button, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { brandColors } from "../utils/brandColors"
import GradientText from "../elements/GradientText"
import { ChatMessage } from "./ChatMessage"
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
				width: "100%",
				boxSizing: "border-box",
				backgroundColor: "#f5f5f7",
				transition: "all 0.3s ease-in-out",
			}}
		>
			<Typography color={"white"} fontWeight={"bold"} fontSize={"small"}>
				<GradientText text="AI English Practice Room" />{" "}
				<span
					style={{
						background: brandColors.lightPurple,
						marginLeft: 4,
						borderRadius: "4px",
						padding: "1px 8px",
						fontWeight: 500,
					}}
				>
					Beta
				</span>
			</Typography>
			<Box sx={{ width: "100%", overflow: "scroll", height: "100%", maxHeight: 500 }}>
				<Stack
					ref={chatsRef}
					spacing={2}
					sx={{ alignSelf: "stretch", overflowY: "scroll", height: "100%", maxHeight: "100%", mt: "0px" }}
				>
					{messages?.slice(1).map(
						(
							message: {
								role: string
								content: string
								voice?: string | undefined
							},
							index: number
						) => (
							<ChatMessage key={index} message={message} />
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
							border: "2px solid #f4d35e",
							color: "#cda000",
							fontWeight: "semibold",
							fontSize: "10px",
							" &:hover": { border: "1px solid #f4d35e", backgroundColor: "#f4d35e", color: "black" },
						}}
					>
						💡 Suggest
					</Button>
					{suggestion && (
						<Typography fontSize={10} color={brandColors.black}>
							{suggestion}
						</Typography>
					)}
				</Box>

				<UseAudioRecorder />
			</Box>
		</Box>
	)
}
