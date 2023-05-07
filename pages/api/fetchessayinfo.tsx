import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseX"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query
    try {
      const docRef = doc(db, "essayResult", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const essayData = docSnap.data()
        res.status(200).json(essayData)
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
