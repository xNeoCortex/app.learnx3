// pages/api/generate-audio.js
import OpenAI from "openai"
import { NextResponse } from "next/server"
import { getAuth } from "@clerk/nextjs/server"
import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "@/components/firebaseX"

const openai = new OpenAI({
	apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
})

export async function POST(request: any) {
	const { message } = await request.json()

	if (!message) {
		return NextResponse.json({ message: "Message is required" }, { status: 400 })
	}
	try {
		const mp3 = await openai.audio.speech.create({
			model: "tts-1",
			voice: "alloy",
			input: message,
		})

		const buffer = Buffer.from(await mp3.arrayBuffer())
		const currentTime = new Date().getTime()
		const { userId } = getAuth(request)
		const uniqueFileName = `ai-speech-${currentTime}-${userId}.mp3`
		const audioRef = ref(storage, `audios/${userId}/${uniqueFileName}`)

		await uploadBytes(audioRef, buffer)
		const audioURL = await getDownloadURL(audioRef)

		return NextResponse.json(
			{
				audioURL,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
