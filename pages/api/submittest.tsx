import { collection, addDoc } from "firebase/firestore"
import { db } from "../../components/firebaseX"

export default async function handler(req, res) {
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
