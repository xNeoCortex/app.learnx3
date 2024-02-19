import { doc, getDoc } from "firebase/firestore"
import { db } from "../../../components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const { id } = req.query

		try {
			const docRef = doc(db, "lessonByAi", id as string)
			const docSnap = await getDoc(docRef)

			console.log(docSnap.exists())
			if (docSnap.exists()) {
				const lessonData = docSnap.data()
				res.status(200).json(lessonData)
			} else {
				res.status(404).json({ message: "Lesson not found" })
			}
		} catch (error) {
			console.error("Error getting student data: ", error)
			res.status(500).json({ message: "Internal server error" })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}
