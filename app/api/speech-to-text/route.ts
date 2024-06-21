import OpenAI from "openai"
import fs from "fs"
import path from "path"
import os from "os"
import { NextResponse } from "next/server"
import axios from "axios"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: Request) {
	const { myFilePath } = await request.json()

	const response = await axios.get(myFilePath, { responseType: "arraybuffer" })
	const tempFilePath = path.join(os.tmpdir(), `temp-audio-${Date.now()}.mp3`)
	fs.writeFileSync(tempFilePath, Buffer.from(response.data), "binary")

	try {
		// Validate file extension
		const fileName = path.basename(tempFilePath) // Extract filename from URL
		const extension = path.extname(fileName).toLowerCase() // Get file extension
		if (![".mp3", ".mp4", ".mpeg", ".mpga", ".oga", ".ogg", ".wav", ".webm"].includes(extension)) {
			throw new Error("Unsupported audio format")
		}

		// Generate transcription using OpenAI
		const transcription = await openai.audio.transcriptions.create({
			file: fs.createReadStream(tempFilePath),
			model: "whisper-1",
		})

		// Clean up the temporary file
		fs.unlinkSync(tempFilePath)

		return NextResponse.json(
			{
				text: transcription.text,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		// Clean up the temporary file in case of an error
		if (fs.existsSync(tempFilePath)) {
			fs.unlinkSync(tempFilePath)
		}
		return NextResponse.json({ message: error }, { status: 500 })
	}
}
