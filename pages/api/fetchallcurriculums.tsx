import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "../../components/FirebaseX"

export default async function handler(req, res) {
	if (req.method === "GET") {
		const curriculum = []
		try {
			const q = query(collection(db, "curriculum"))
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				curriculum.push({
					...doc.data(),
					uid: doc.id,
				})
			})
			res.status(200).json(curriculum)
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
