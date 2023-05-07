import { query, collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseX"

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const body = req.body
      const docRef = await addDoc(collection(db, "curriculum"), body)

      res.status(200).json({ docRef })
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
