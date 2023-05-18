import { doc, getDoc } from "firebase/firestore"
import { db } from "../../components/firebaseX"

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { studentId } = req.query

		try {
			const docRef = doc(db, "students", studentId)
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
