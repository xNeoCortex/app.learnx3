import OpenAI from "openai"
import fs from "fs"
import path from "path"
import os from "os"
import { NextRequest, NextResponse } from "next/server"
import axios from "axios"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: NextRequest) {
	let tempFilePath
	try {
		const { myFilePath } = await request.json()

		// Fetch the audio file from the provided URL
		const response = await axios.get(myFilePath, { responseType: "arraybuffer" })

		// Save the fetched audio file to a temporary file
		tempFilePath = path.join(os.tmpdir(), `temp-audio-${Date.now()}.mp3`)
		fs.writeFileSync(tempFilePath, Buffer.from(response.data), "binary")

		// Validate file extension
		const fileName = path.basename(tempFilePath)
		const extension = path.extname(fileName).toLowerCase()
		if (![".mp3", ".mp4", ".mpeg", ".mpga", ".oga", ".ogg", ".wav", ".webm"].includes(extension)) {
			throw new Error("Unsupported audio format")
		}

		// Read the file to verify its content
		const fileContent = fs.readFileSync(tempFilePath)
		console.log(`File size: ${fileContent.length} bytes`)

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
		if (tempFilePath && fs.existsSync(tempFilePath)) {
			fs.unlinkSync(tempFilePath)
		}

		// Return a more informative error message
		return NextResponse.json({ message: error, tempFilePath }, { status: 500 })
	}
}
