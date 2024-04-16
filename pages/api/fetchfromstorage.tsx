import { storage } from "../../components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import { ref, list, getDownloadURL, getMetadata } from "firebase/storage"
import { constants } from "@/components/constants/constants"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { imagePath = null } = req.query

	// Clerk auth check
	const { userId } = getAuth(req)

	if (!userId) {
		return res.status(401).json({ message: "Not authenticated" })
	}
	if (req.method === "GET") {
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

				res.status(200).json(urlsAndNames)
			} else {
				const imageRef = ref(storage, (constants.FIREBASE_STORAGE_TOPIC_IMAGE_PATH + "/" + imagePath) as string)
				const url = await getDownloadURL(imageRef)
				const metadata = await getMetadata(imageRef)
				res.status(200).json({ url, name: metadata.name })
			}
		} catch (error) {
			console.log("error", error)
			res.status(500).json({
				message: "Internal Server Error",
			})
		}
	} else {
		res.status(404).json({
			message: "Invalid HTTP method",
		})
	}
}
