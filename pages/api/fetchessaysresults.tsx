import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "../../components/firebaseX"

export default async function handler(req, res) {
	if (req.method === "GET") {
		const essayResult = []
		try {
			const querySnapshot = await getDocs(collection(db, "essayResult"))

			querySnapshot.forEach((doc) => {
				essayResult.push({
					...doc.data(),
					uid: doc.id,
				})
			})
			res.status(200).json(essayResult)
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
