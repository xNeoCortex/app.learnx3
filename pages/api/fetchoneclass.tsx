import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebaseX"

export default async function handler(req, res) {
  if (req.method === "GET") {
    const id = req.query.id
    try {
      const docRef = doc(db, "classes", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const classData = docSnap.data()
        res.status(200).json(classData)
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
