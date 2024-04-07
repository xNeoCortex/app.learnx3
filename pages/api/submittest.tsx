import { collection, addDoc } from "firebase/firestore"
import { db } from "../../components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Clerk auth check
	const { userId } = getAuth(req)

	if (!userId) {
		return res.status(401).json({ message: "Not authenticated" })
	}

	if (req.method === "POST") {
		const body = req.body
		try {
			const docRef = await addDoc(collection(db, "testResult"), body)
			res.status(200).json({ docRef })
		} catch (error) {
			res.status(500).json({
				message: "Internal Error",
			})
		}
	} else {
		res.status(404).json({
			message: "Invalid HTTP method",
		})
	}
}
