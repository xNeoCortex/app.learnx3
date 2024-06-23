import { NextRequest, NextResponse } from "next/server"
import axios from "axios"
import { createClient } from "@deepgram/sdk"

const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY ?? "")

export async function POST(request: NextRequest) {
	try {
		const { myFilePath } = await request.json()

		console.log("myFilePath :>> ", myFilePath)

		// Ensure the request to Deepgram has the correct Content-Type header
		const response = await axios.post(
			"https://api.deepgram.com/v1/listen",
			{
				url: myFilePath,
				options: {
					model: "nova-2",
					smart_format: true,
				},
			},
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Token ${process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY}`,
				},
			}
		)

		if (response.status !== 200) {
			throw new Error(`Deepgram API error: ${response.statusText}`)
		}

		const data = response.data

		return NextResponse.json(
			{
				text: data.results.channels[0].alternatives[0].transcript ?? "No transcription available",
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error generating the audio file:", error)
		return NextResponse.json({ message: error }, { status: 500 })
	}
}
