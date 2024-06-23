"use client"
import axios from "axios"
import { useState } from "react"
import { Recorder } from "vmsg"
import useSpeakAI from "./SpeakAI"
import { Bars } from "react-loading-icons"
import MicIcon from "@mui/icons-material/Mic"
import { Box, Button } from "@mui/material"
import { ref, uploadBytes } from "firebase/storage"
import { storage } from "../firebaseX"
import { useStoreUser } from "../zustand"
import { getDownloadURL } from "firebase/storage"

const recorder = new Recorder({
	wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
})

const UseAudioRecorder = () => {
	const { Speak } = useSpeakAI()
	const [isRecording, setIsRecording] = useState(false)
	const [myFilePath, setMyFilePath] = useState("")
	const [status, setStatus] = useState<"error" | "loading" | "success">("success")
	const [speakingLoading, setSpeakingLoading] = useState(false)
	const { userInfo } = useStoreUser()

	const recordFn = async () => {
		setStatus("loading")
		setSpeakingLoading(false)

		if (isRecording) {
			try {
				const blob = await recorder.stopRecording()

				const currentTime = new Date().getTime()
				const uniqueFileName = `my-speech-${currentTime}-${userInfo.uid}.mp3`
				const audioRef = ref(storage, `audios/${userInfo.uid}/${uniqueFileName}`)

				const buffer = Buffer.from(await blob.arrayBuffer())
				await uploadBytes(audioRef, buffer)
				const storageURL = await getDownloadURL(audioRef)

				if (storageURL) {
					setMyFilePath(storageURL)
					await Speak(storageURL)
				} else {
					setStatus("error")
				}
			} catch (e) {
				console.error(e)
				setStatus("error")
			} finally {
				setIsRecording(false)
				setStatus("success")
			}
		} else {
			setSpeakingLoading(true)
			try {
				await recorder.initAudio()
				await recorder.initWorker()
				recorder.startRecording()
				setIsRecording(true)
				setStatus("success")
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
					backgroundColor: "black",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "50px",
					height: "60px",
					borderRadius: "50%",
					"&:hover": {
						backgroundColor: isRecording ? "red" : "black",
						color: "white",
					},
				}}
				disabled={status === "loading"}
				onClick={recordFn}
			>
				{speakingLoading ? (
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
