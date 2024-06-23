import { NextRequest, NextResponse } from "next/server"
import { ref, uploadBytes } from "firebase/storage"
import { storage } from "@/components/firebaseX"
import { getAuth } from "@clerk/nextjs/server"

export async function POST(request: NextRequest) {
	const resp = await request.blob()
	const currentTime = new Date().getTime()
	const { userId } = getAuth(request)
	const uniqueFileName = `my-speech-${currentTime}-${userId}.mp3`
	const audioRef = ref(storage, `audios/${userId}/${uniqueFileName}`)

	try {
		const buffer = Buffer.from(await resp.arrayBuffer())
		await uploadBytes(audioRef, buffer)

		const url = `https://storage.googleapis.com/${audioRef.bucket}/${audioRef.fullPath}`
		return NextResponse.json(
			{
				message: "Audio file saved",
				filePath: url,
			},
			{ status: 200 }
		)
	} catch (error) {
		console.error("Error deleting the audio file:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
