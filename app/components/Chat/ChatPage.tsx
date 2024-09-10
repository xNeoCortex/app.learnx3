"use client"
import { createRef, useEffect, useState } from "react"
import AgoraRTC from "agora-rtc-sdk-ng"
import { useChatStore, useSuggestionsStore } from "../zustand"
import axios from "axios"
import { Box, Button, Stack, Typography } from "@mui/material"
import dynamic from "next/dynamic"
import { brandColors } from "../utils/brandColors"
import GradientText from "../elements/GradientText"
import { ChatMessage } from "./ChatMessage"
import AudioPlayer from "../elements/AudioReco"
import Translator from "../elements/Translator"
const UseAudioRecorder = dynamic(() => import("./UseAudioRecorder"), { ssr: false })

const rtc = {
	localAudioTrack: null,
	client: null,
}

export default function Chat() {
	const { messages } = useChatStore()
	const { suggestion, addSuggestion } = useSuggestionsStore()
	const [audioURL, setAudioURL] = useState<string | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isVideoCallActive, setIsVideoCallActive] = useState(false)

	const handleSuggestion = async () => {
		try {
			const { data } = await axios.post("/api/ai-suggestion", {
				prompt: JSON.stringify(messages),
			})
			addSuggestion(data.suggestionFromGPT)

			const { data: audioUrl } = await axios.post("/api/text-to-speech", {
				message: data.suggestionFromGPT,
			})
			setAudioURL(audioUrl.audioURL)
		} catch (error) {
			console.error("Error generating the audio file:", error)
			setError("Sorry, something went wrong. Please try again later.")
		}
	}

	const startVideoCall = async () => {
		try {
			rtc.client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" })
			await rtc.client.join("YOUR_AGORA_APP_ID", "test-channel", null)
			rtc.localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack()
			await rtc.client.publish([rtc.localAudioTrack])
			setIsVideoCallActive(true)
		} catch (error) {
			console.error("Error starting the video call:", error)
			setError("Sorry, something went wrong. Please try again later.")
		}
	}

	const endVideoCall = async () => {
		try {
			rtc.localAudioTrack.close()
			await rtc.client.leave()
			setIsVideoCallActive(false)
		} catch (error) {
			console.error("Error ending the video call:", error)
			setError("Sorry, something went wrong. Please try again later.")
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
					height: 140,
					justifyContent: "space-between",
					flexDirection: "column",
					gap: 1,
					borderTop: "1px solid white",
					paddingTop: "6px",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", gap: "6px", justifyContent: "flex-start", width: "100%" }}>
					{error ? (
						<Typography fontSize={12} color={"#ef233c"} fontWeight={"semibold"}>
							{error}
						</Typography>
					) : (
						<>
							{!suggestion && (
								<Button
									size="small"
									variant="outlined"
									onClick={handleSuggestion}
									sx={{
										textDecoration: "none",
										textTransform: "none",
										border: "2px solid #f4d35e",
										color: "#cda000",
										fontWeight: "semibold",
										maxWidth: "90px",
										width: "inherit",
										fontSize: "10px",
										" &:hover": { border: "1px solid #f4d35e", backgroundColor: "#f4d35e", color: "black" },
									}}
								>
									💡 Suggest
								</Button>
							)}

							<Box display={"flex"} width={"100%"}>
								<Translator text={suggestion} fontSize={10} flexDirection={"row"} iconColor={brandColors.lightPurple}>
									{audioURL && suggestion && <AudioPlayer audioSrc={audioURL} iconColor={brandColors.lightPurple} />}
									<Box display={"flex"} alignItems={"center"} height={"100%"} minWidth={150}>
										{suggestion && (
											<Typography fontSize={10} color={brandColors.black}>
												{suggestion}
											</Typography>
										)}
									</Box>
								</Translator>

				{/* Video Call Buttons */}
				{!isVideoCallActive ? (
					<Button
						size="small"
						variant="outlined"
						onClick={startVideoCall}
						sx={{
							textDecoration: "none",
							textTransform: "none",
							border: "2px solid #f4d35e",
							color: "#cda000",
							fontWeight: "semibold",
							maxWidth: "90px",
							width: "inherit",
							fontSize: "10px",
							" &:hover": { border: "1px solid #f4d35e", backgroundColor: "#f4d35e", color: "black" },
						}}
					>
						Start Video Call
					</Button>
				) : (
					<Button
						size="small"
						variant="outlined"
						onClick={endVideoCall}
						sx={{
							textDecoration: "none",
							</Box>
						</>
					)}
				</Box>

				<UseAudioRecorder />
			</Box>
		</Box>
	)
}
