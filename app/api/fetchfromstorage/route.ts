import { storage } from "@/components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import { ref, list, getDownloadURL, getMetadata } from "firebase/storage"
import { constants } from "@/components/constants/constants"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const imagePath = request.nextUrl.searchParams.get("imagePath")
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		if (!imagePath) {
			const imageRef = ref(storage, constants.FIREBASE_STORAGE_TOPIC_IMAGE_PATH)
			const result = await list(imageRef)
			const urlsAndNames = await Promise.all(
				result.items.map(async (itemRef) => {
					const url = await getDownloadURL(itemRef)
					const metadata = await getMetadata(itemRef)
					return { url, name: metadata.name }
				})
			)

			return NextResponse.json(urlsAndNames, { status: 200 })
		} else {
			const imageRef = ref(storage, (constants.FIREBASE_STORAGE_TOPIC_IMAGE_PATH + "/" + imagePath) as string)
			const url = await getDownloadURL(imageRef)
			const metadata = await getMetadata(imageRef)
			return NextResponse.json({ url, name: metadata.name }, { status: 200 })
		}
	} catch (error) {
		console.error("Error getting documents:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
