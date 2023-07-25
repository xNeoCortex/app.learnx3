import React, { useState, useEffect } from "react"
import Speech from "speak-tts"
import VolumeUpIcon from "@mui/icons-material/VolumeUp"
import { IconButton } from "@mui/material"

const TextToSpeechButton: React.FC<{
	text: string
	personType?: "female" | "male" | "child"
	buttonSize?: string | number
	color?: "string"
}> = ({
	personType = "female",
	text = "Hello world, how are you doing? I am ok, actually amazing!",
	buttonSize = "40px",
	color = "rgb(128, 146, 245)",
}) => {
	const [voices, setVoices] = useState([])
	const [speaking, setSpeaking] = useState(false)
	const [speechX, setSpeechX] = useState(null)

	const SpeakingPerson = {
		female: {
			voice: "Microsoft Libby Online (Natural) - English (United Kingdom)",
			lang: "en-GB",
		},
		male: {
			voice: "Microsoft Guy Online (Natural) - English (United States)",
			lang: "en-US",
		},
		child: {
			voice: "Microsoft Maisie Online (Natural) - English (United Kingdom)",
			lang: "en-GB",
		},
	}

	const handleSpeak = () => {
		if (!speaking) {
			speechX
				.speak({
					text,
					queue: false,
					listeners: {
						onstart: () => {
							setSpeaking(true)
						},
						onend: () => {
							setSpeaking(false)
						},
					},
				})
				.then((data) => {
					console.log("Success !", data)
				})
				.catch((e) => {
					console.error("An error occurred :", e)
				})
		} else {
			speechX.cancel()
			setSpeaking(false)
		}
	}

	useEffect(() => {
		const speech = new Speech()
		speech
			.init({
				volume: 0.5,
				lang: SpeakingPerson[personType].lang,
				voice: SpeakingPerson[personType].voice,
				rate: 1,
				pitch: 1,
				splitSentences: true,
			})
			.then((data) => {
				// console.log("Speech is ready, voices are available", data.voices)
				setVoices(data.voices)
			})
			.catch((e) => {
				console.error("An error occured while initializing : ", e)
			})
		setSpeechX(speech)
	}, [text])

	return (
		<IconButton onClick={handleSpeak}>
			<VolumeUpIcon sx={{ color: speaking ? color : "grey", fontSize: buttonSize }} />
		</IconButton>
	)
}

export default TextToSpeechButton
