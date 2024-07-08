"use client"
import { useEffect, useState } from "react"
import useSpeakAI from "./SpeakAI"
import { Bars, TailSpin } from "react-loading-icons"
import MicIcon from "@mui/icons-material/Mic"
import { Box, Button } from "@mui/material"
import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebaseX"
import { useStoreUser } from "../zustand"
import { getDownloadURL } from "firebase/storage"
import { brandColors } from "../utils/brandColors"
import { useReactMediaRecorder } from "react-media-recorder"

const UseAudioRecorder = () => {
	const { Speak } = useSpeakAI()
	const [isRecording, setIsRecording] = useState(false)
	const [avatarSpeaking, setAvatarSpeaking] = useState(false)
	const [status, setStatus] = useState<"error" | "loading" | "success">("success")
	const [speakingLoading, setSpeakingLoading] = useState(false)
	const { userInfo } = useStoreUser()
	const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({ audio: true })

	useEffect(() => {
		const uploadAudio = async () => {
			const currentTime = new Date().getTime()
			if (mediaBlobUrl) {
				const blob = await fetch(mediaBlobUrl).then((r) => r.blob())
				const uniqueFileName = `my-speech-${currentTime}-${userInfo.uid}`
				const audioRef = ref(storage, `audios/${userInfo.uid}/${uniqueFileName}`)
				await uploadBytes(audioRef, blob)
				const storageURL = await getDownloadURL(audioRef)
				setAvatarSpeaking(true)
				await Speak(storageURL)
			}
		}

		if (!isRecording && mediaBlobUrl) {
			uploadAudio()
			setTimeout(() => {
				setAvatarSpeaking(false)
			}, 7000)
		}
	}, [mediaBlobUrl])

	const recordFn = async () => {
		setStatus("loading")
		setSpeakingLoading(false)

		if (isRecording) {
			try {
				stopRecording()
				setIsRecording(false)
				setStatus("success")
			} catch (e) {
				console.error(e)
				setStatus("error")
			}
		} else {
			setSpeakingLoading(true)
			try {
				startRecording()
				setIsRecording(true)
				setStatus("success")

				// Automatically stop recording after 30 seconds
				setTimeout(() => {
					stopRecording()
					setIsRecording(false)
					setSpeakingLoading(false)
					setStatus("success")
				}, 30000)
			} catch (e) {
				console.error("Error initializing recorder:", e)
				setStatus("error")
			}
		}
	}

	return (
		//@ts-ignore
		<Box sx={{ display: "flex", gap: 2 }}>
			{status === "error" && (
				<Box display="flex" justifyContent="center" alignItems="center" color="red" fontSize="xl">
					Failed to generate audio
				</Box>
			)}

			<Button
				sx={{
					backgroundColor: brandColors.darkerBlue,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "30px",
					height: "60px",
					borderRadius: "50%",
					transition: "all 0.3s",
					border: "1px solid white",
					"&:hover": {
						backgroundColor: isRecording ? "red" : brandColors.lightPurple,
						color: "white",
					},
				}}
				disabled={status === "loading" || avatarSpeaking}
				onClick={recordFn}
			>
				{avatarSpeaking ? (
					<TailSpin />
				) : speakingLoading ? (
					<Bars
						style={{
							width: "25px",
							height: "25px",
							padding: 0,
							margin: 0,
							color: "white",
						}}
					/>
				) : (
					<MicIcon
						style={{
							width: "25px",
							height: "25px",
							padding: 0,
							margin: 0,
							color: "white",
						}}
					/>
				)}
			</Button>
		</Box>
	)
}

export default UseAudioRecorder
