import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
	const resp = await request.blob()

	const currentTime = new Date().getTime()

	try {
		const buffer = Buffer.from(await resp.arrayBuffer())
		const filePath = path.join(process.cwd(), "public/audios", `my-speech.mp3`)

		await fs.promises.writeFile(filePath, buffer)

		return NextResponse.json(
			{
				message: "Audio file saved",
				filePath: `audios/my-speech.mp3`
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error deleting the audio file:", error)
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
