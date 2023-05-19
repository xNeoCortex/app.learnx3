import { collection, addDoc, query, getDocs } from "firebase/firestore"
import { db } from "../../components/FirebaseX"

export default async function handler(req, res) {
	const { type } = req.query
	const body = req.body
	if (req.method === "POST") {
		try {
			const docRef = await addDoc(collection(db, type), body)
			res.status(200).json({ docRef })
		} catch (error) {
			console.log("error", error)
			res.status(500).json({
				message: "Internal Server Error",
			})
		}
	} else if (req.method === "GET") {
		const tests = []
		try {
			const q = query(collection(db, type))
			const querySnapshot = await getDocs(q)

			querySnapshot.forEach((doc) => {
				tests.push({
					...doc.data(),
					uid: doc.id,
				})
			})
			res.status(200).json(tests)
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
