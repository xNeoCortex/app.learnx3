import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "../../components/firebaseX"
import { TeacherType } from "@/types/types"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "GET") {
		const teachers: TeacherType[] &
			{
				uid: string
			}[] = []
		try {
			const q = query(collection(db, "teachers"))
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				teachers.push({
					...doc.data(),
					uid: doc.id,
				})
			})
			res.status(200).json(teachers)
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
