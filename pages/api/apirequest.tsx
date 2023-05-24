import { collection, addDoc, query, getDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore"
import { db } from "../../components/firebaseX"

export default async function handler(req, res) {
	const { collectionName, uid = null, role = null } = req.query
	const body = req.body
	if (req.method === "POST") {
		try {
			const docRef = await addDoc(collection(db, collectionName), body)
			res.status(200).json({ docRef })
		} catch (error) {
			res.status(500).json({
				message: "Internal Server Error",
			})
		}
	} else if (req.method === "GET") {
		try {
			if (uid) {
				const docRef = doc(db, collectionName, uid)
				const docSnap = await getDoc(docRef)

				if (docSnap.exists()) {
					const curriculumData = docSnap.data()
					res.status(200).json(curriculumData)
				} else {
					res.status(404).json({ message: "Document not found" })
				}
			} else {
				const docsArray = []
				const q = query(collection(db, collectionName))
				const querySnapshot = await getDocs(q)

				querySnapshot.forEach((doc) => {
					docsArray.push({
						...doc.data(),
						uid: doc.id,
					})
				})
				res.status(200).json(docsArray)
			}
		} catch (error) {
			console.log("error", error)
			res.status(500).json({
				message: "Internal Server Error",
			})
		}
	} else if (req.method === "PATCH") {
		try {
			if (role === "admin" || true) {
				const docRef = await updateDoc(doc(db, collectionName, uid), body)
				res.status(200).json({ docRef })
			} else {
				res.status(403).json({ message: "You do not have authority to do this action." })
			}
		} catch (error) {
			console.log("error", error)
			res.status(500).json({
				message: "Internal Server Error",
			})
		}
	} else if (req.method === "DELETE") {
		try {
			if (role === "admin" || true) {
				const docRef = await deleteDoc(doc(db, collectionName, uid))
				res.status(200).json({ docRef })
			} else {
				res.status(403).json({ message: "You do not have authority to do this action." })
			}
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
