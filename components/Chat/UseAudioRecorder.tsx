import axios from "axios"
import { useState } from "react"
//@ts-ignore
import * as vmsg from "vmsg"
import useSpeakAI from "./SpeakAI"
import { Bars } from "react-loading-icons"
import MicIcon from "@mui/icons-material/Mic"
import { Box, Button } from "@mui/material"

const recorder = new vmsg.Recorder({
	wasmURL: "https://unpkg.com/vmsg@0.3.0/vmsg.wasm",
})

const UseAudioRecorder = () => {
	const { Speak } = useSpeakAI()
	const [isRecording, setIsRecording] = useState(false)
	const [myFilePath, setMyFilePath] = useState("")
	const [status, setStatus] = useState<"error" | "loading" | "success">("success")
	const [speakingLoading, setSpeakingLoading] = useState(false)

	const record = async () => {
		setStatus("loading")
		setSpeakingLoading(false)

		if (isRecording) {
			try {
				if (myFilePath) {
					await fetch("/api/delete-audio", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ filePath: myFilePath }),
					})
				}
				const blob = await recorder.stopRecording()
				const { data } = await axios.post("/api/save-audio", blob)

				if (data.filePath) {
					setMyFilePath(data.filePath)
					await Speak(data.filePath)
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
			} finally {
				setStatus("success")
			}
		}
	}

	return (
		//@ts-ignore
		<Box sx={{ display: "flex", gap: 10 }}>
			{status === "error" && (
				<Box display="flex" justifyContent="center" alignItems="center" color="red" fontSize="xl">
					Failed to generate audio
				</Box>
			)}
			<Box display="flex" gap={10}>
				<Button
					sx={{
						backgroundColor: "black",
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						width: "70px",
						height: "70px",
						padding: 2,
						borderRadius: "50%",
						"&:hover": {
							backgroundColor: isRecording ? "red" : "black",
							color: "white",
						},
					}}
					disabled={status === "loading" || isRecording}
					onClick={record}
				>
					{speakingLoading ? (
						<Bars
							style={{
								width: "35px",
								height: "35px",
								padding: 0,
								margin: 0,
								color: "white",
							}}
						/>
					) : (
						<MicIcon
							style={{
								width: "40px",
								height: "40px",
								padding: 0,
								margin: 0,
								color: "white",
							}}
						/>
					)}
				</Button>
			</Box>
		</Box>
	)
}

export default UseAudioRecorder
