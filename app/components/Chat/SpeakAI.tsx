import { useChatStore, useStoreFilePath, useSuggestionsStore } from "../zustand"
import axios from "axios"

function useSpeakAI() {
	const { setAiFilePath } = useStoreFilePath()
	const { messages, addMessage } = useChatStore()
	const { addSuggestion } = useSuggestionsStore()

	let messageFromGPT = []
	async function Speak(myFilePath: string) {
		// Delete the previous AI audio file
		try {
			// if (aiFilePath) {
			// 	await fetch("/api/delete-audio", {
			// 		method: "POST",
			// 		headers: {
			// 			"Content-Type": "application/json"
			// 		},
			// 		body: JSON.stringify({ filePath: aiFilePath })
			// 	})
			// }

			setAiFilePath(null)

			// Generate text from the recorded audio - Whisper
			const { data } = await axios.post(
				"/api/speech-to-text",
				{
					myFilePath,
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			const voiceText = await data.text

			// Add the user message to the chat
			messageFromGPT = [...messages, { role: "user", content: voiceText }]
			addMessage(messageFromGPT)
			addSuggestion("")

			// Get message from ChatGPT and generate audio from the text
			const response = await axios.post(
				"/api/ai-speech",
				{
					messages: messageFromGPT,
					currentTime: new Date().getTime(),
				},
				{
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (response.status === 200) {
				const { data } = await response
				setAiFilePath(data.filePath)
				addMessage([
					...messageFromGPT,
					{
						role: "assistant",
						content: data.messageFromGPT,
					},
				])
			} else {
				console.error("Failed to generate audio")
				setAiFilePath(null)
			}
		} catch (e) {
			setAiFilePath(null)
			console.log("error", e)
		}
	}

	return {
		Speak,
	}
}

export default useSpeakAI
