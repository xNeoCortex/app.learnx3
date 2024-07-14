"use client"
import { Box, Typography } from "@mui/material"
import AudioPlayer from "../elements/AudioReco"
import { brandColors } from "../utils/brandColors"
import Translator from "../elements/Translator"

export function ChatMessage({
	message,
}: {
	message: {
		role: string
		content: string
		voice?: string | undefined
	}
}) {
	return (
		<Box
			//@ts-ignore
			sx={{
				alignSelf: message.role === "user" ? "flex-end" : "flex-start",
				borderWidth: "0.5px",
				p: 1,
				maxWidth: "90%",
				backgroundColor: message.role === "user" ? brandColors.lightGrey : brandColors.lighterPurple,
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
						color: brandColors.chatTextColor,
					}}
				>
					{message.content}
				</Typography>
			)}
			<Translator text={message?.content} flexDirection="column" fontSize={11}>
				{message?.voice && (
					<Box>
						<AudioPlayer audioSrc={message?.voice} />{" "}
					</Box>
				)}
			</Translator>
		</Box>
	)
}
