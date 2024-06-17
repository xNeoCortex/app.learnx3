import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"

export async function POST(request: any) {
	const { filePath } = await request.json()

	try {
		const fullPath = path.join(process.cwd(), "public", filePath)

		await fs.promises.unlink(fullPath)

		return NextResponse.json({ message: "Audio file deleted" }, { status: 200 })
	} catch (error) {
		console.error("Error deleting the audio file:", error)
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		)
	}
}
