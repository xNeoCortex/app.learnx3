"use client"
import axios from "axios"
import { useState } from "react"
import { Recorder } from "vmsg"
import useSpeakAI from "./SpeakAI"
import { Bars } from "react-loading-icons"
import MicIcon from "@mui/icons-material/Mic"
import { Box, Button, Input } from "@mui/material"
import RecorderAudio from "./RecorderAudio"
import { useRecorderPermission } from "./useRecorderPermission"

const recorder = new Recorder({
	wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
})

const UseAudioRecorder = () => {
	const { Speak } = useSpeakAI()
	const [isRecording, setIsRecording] = useState(false)
	const [myFilePath, setMyFilePath] = useState("")
	const [status, setStatus] = useState<"error" | "loading" | "success">("success")
	const [speakingLoading, setSpeakingLoading] = useState(false)

	const [audioURL, setAudioURL] = useState("")
	const recorder = useRecorderPermission("audio")

	const startRecording = async () => {
		setStatus("loading")
		recorder.startRecording()
	}

	const stopRecording = async () => {
		await recorder.stopRecording()
		let blob = await recorder.getBlob()
		setAudioURL(URL.createObjectURL(blob))
		console.log("URL.createObjectURL(blob) :>> ", URL.createObjectURL(blob))
		const { data } = await axios.post("/api/save-audio", blob)

		setMyFilePath(data.filePath)
		Speak(data.filePath)
		setStatus("success")

		// const recordFn = async () => {
		// 	setStatus("loading")
		// 	setSpeakingLoading(false)

		// 	if (isRecording) {
		// 		try {
		// 			const blob = await recorder.stopRecording()
		// 			const { data } = await axios.post("/api/save-audio", blob)

		// 			if (data.filePath) {
		// 				setMyFilePath(data.filePath)
		// 				await Speak(data.filePath)
		// 			} else {
		// 				setStatus("error")
		// 			}
		// 		} catch (e) {
		// 			console.error(e)
		// 			setStatus("error")
		// 		} finally {
		// 			setIsRecording(false)
		// 			setStatus("success")
		// 		}
		// 	} else {
		// 		setSpeakingLoading(true)
		// 		try {
		// 			await recorder.initAudio()
		// 			await recorder.initWorker()
		// 			recorder.startRecording()
		// 			setIsRecording(true)
		// 			setStatus("success")
		// 		} catch (e) {
		// 			console.error("Error initializing recorder:", e)
		// 			setStatus("error")
		// 		}
		// 	}
	}
	return (
		//@ts-ignore
		<Box sx={{ display: "flex", gap: 2 }}>
			{/* {status === "error" && (
			<Box display="flex" justifyContent="center" alignItems="center" color="red" fontSize="xl">
				Failed to generate audio
			</Box>
		)} */}

			<Input
				sx={{ border: "1px solid grey" }}
				type="text"
				value={audioURL}
				onChange={(e) => setAudioURL(e.target.value)}
			/>
			{<audio controls src={audioURL} />}
			<Button
				sx={{
					backgroundColor: "black",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "50px",
					height: "60px",
					borderRadius: "50%",
				}}
				// disabled={status === "loading"}
				onClick={status === "loading" ? stopRecording : startRecording}
			>
				{status === "loading" ? "stopRecording" : "startRecording"}
				{/* {speakingLoading ? (
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
					)} */}
			</Button>
		</Box>
	)
}
export default UseAudioRecorder
