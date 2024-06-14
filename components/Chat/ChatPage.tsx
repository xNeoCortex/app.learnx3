// pages/index.js
import { useChatStore, useSuggestionsStore } from "../zustand"
import axios from "axios"
import { Box, Button, Container, Stack, Typography } from "@mui/material"

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
		<Container
			sx={{
				display: "flex",
				flexDirection: "column",
				gap: 2,
				p: 2,
				justifyContent: "space-between",
				height: "100%",
				flex: 1,
			}}
		>
			<Stack spacing={2} sx={{ alignSelf: "stretch", overflow: "auto", maxHeight: 500 }}>
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
								borderRadius: "lg",
								p: 1,
								width: "90%",
								backgroundColor: message.role === "user" ? "#f4d35e" : "#4361ee",
								boxShadow: "md",
								minWidth: 150,
							}}
						>
							{message?.content && (
								<Typography
									variant="body2"
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
			<Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
				<Button onClick={handleSuggestion} sx={{ p: 0, backgroundColor: "transparent" }}>
					💡
				</Button>

				<Typography variant="body2">{suggestion ? suggestion : "Click and get suggestion"}</Typography>
			</Box>
		</Container>
	)
}
