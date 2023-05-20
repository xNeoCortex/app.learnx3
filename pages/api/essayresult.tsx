import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "../../components/firebaseX"

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const id = req.query.id
			const q = query(collection(db, "essayResult"), where("student_id", "==", id))
			const querySnapshot = await getDocs(q)

			const writingResult = querySnapshot.docs.map((doc) => ({
				...doc.data(),
				uid: doc.id,
			}))

			res.status(200).json(writingResult)
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
