import { query, collection, getDocs } from "firebase/firestore"
import { db } from "../../components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"
import { UserType } from "@/types/types"
import { getAuth } from "@clerk/nextjs/server"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Clerk auth check
	const { userId } = getAuth(req)

	if (!userId) {
		return res.status(401).json({ message: "Not authenticated" })
	}
	if (req.method === "GET") {
		const students: UserType[] &
			{
				uid: string
			}[] = []
		try {
			const q = query(collection(db, "students"))
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				students.push({
					...doc.data(),
					uid: doc.id,
				})
			})
			res.status(200).json(students)
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
