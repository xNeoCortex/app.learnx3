"use client"
// pages/index.js
import { useChatStore, useSuggestionsStore } from "../zustand"
import axios from "axios"
import { Box, Button, Container, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
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

	return (
		<Box
			//@ts-ignore
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				height: "-webkit-fill-available",
				flex: 1,
				gap: 1,
				p: "10px",
				maxHeight: "100%",
				boxSizing: "border-box",
			}}
		>
			<Typography color={"white"} fontWeight={"bold"} fontSize={"small"}>
				Practice Chat
			</Typography>
			<Stack spacing={2} sx={{ alignSelf: "stretch", overflow: "auto", height: "100%" }}>
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
			{/* @ts-ignore */}
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					height: 180,
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
							width: "80px",
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
					{suggestion && <Typography fontSize={10}>{suggestion}</Typography>}
				</Box>

				<UseAudioRecorder />
			</Box>
		</Box>
	)
}
