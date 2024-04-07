import { query, collection, where, getDocs } from "firebase/firestore"
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
		try {
			const id = req.query.id
			const q = query(collection(db, "testResult"), where("student_id", "==", id))
			const querySnapshot = await getDocs(q)

			const testResult = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				uid: doc.id,
			}))

			res.status(200).json(testResult)
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
