import { doc, getDoc } from "firebase/firestore"
import { db } from "../../components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Clerk auth check
	const { userId } = getAuth(req)

	if (!userId) {
		return res.status(401).json({ message: "Not authenticated" })
	}

	if (req.method === "GET") {
		const { studentId } = req.query

		try {
			const docRef = doc(db, "students", studentId as string)
			const docSnap = await getDoc(docRef)

			if (docSnap.exists()) {
				const studentData = docSnap.data()
				res.status(200).json(studentData)
			} else {
				res.status(404).json({ message: "Student not found" })
			}
		} catch (error) {
			console.error("Error getting student data: ", error)
			res.status(500).json({ message: "Internal server error" })
		}
	} else {
		res.status(405).json({ message: "Method not allowed" })
	}
}
