import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@deepgram/sdk"

const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY ?? "")

export async function POST(request: NextRequest) {
	try {
		const { myFilePath } = await request.json()

		// Ensure the request to Deepgram has the correct Content-Type header
		const { result, error } = await deepgram.listen.prerecorded.transcribeUrl(
			{
				url: myFilePath,
			},
			{
				model: "nova-2",
				smart_format: true,
			}
		)

		return NextResponse.json(
			{
				text: result?.results.channels[0].alternatives[0].transcript ?? "No transcription available",
				error,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: error }, { status: 500 })
	}
}
