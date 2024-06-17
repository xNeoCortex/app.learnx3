// pages/api/generate-audio.js
import OpenAI from "openai"
import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY
})

export async function POST(request: any) {
	const { messages, currentTime } = await request.json()

	try {
		const completion = await openai.chat.completions.create({
			messages: messages,
			model: "gpt-4o",
			temperature: 0.7,
			max_tokens: 300
		})

		const messageFromGPT = completion.choices[0].message.content || ""
		if (!messageFromGPT) {
			return NextResponse.json(
				{ message: "Failed to generate audio" },
				{ status: 400 }
			)
		}
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "alloy",
			input: messageFromGPT
		})

		const buffer = Buffer.from(await mp3.arrayBuffer())
		const filePath = path.join(
			process.cwd(),
			"public/audios",
			`speech-${currentTime}.mp3`
		)

		await fs.promises.writeFile(filePath, buffer)

		return NextResponse.json(
			{
				message: "Audio file saved",
				filePath: `audios/speech-${currentTime}.mp3`,
				messageFromGPT
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
