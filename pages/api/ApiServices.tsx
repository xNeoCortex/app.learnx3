import React from "react"
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore"
import { db } from "../firebaseX"

function ApiServices() {
  async function fetchStudentData(setLoading, setStudent, id) {
    setLoading(true)
    try {
      const docRef = doc(db, "students", id)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setLoading(false)
        setStudent(docSnap.data())
      } else {
        console.log("No such document!")
        return null
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  async function fetchAllStudents(setLoading, setStudentsList) {
    setLoading(true)
    try {
      const students = []
      const q = collection(db, "students")
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        students.push({ ...doc.data(), id: doc.id })
      })
      setStudentsList(students)
      setLoading(false)
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  async function fetchEssay(setLoading, setWritingResult, id) {
    const writingTest = []
    setLoading(true)
    try {
      const q = query(
        collection(db, "essayResult"),
        where("student_id", "==", id)
      )
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        writingTest.push({ ...doc.data(), docId: doc.id })
      })

      setWritingResult(writingTest)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
    }
  }

  async function fetchTestResult(setLoading, setTestResult, id) {
    const testData = []
    setLoading(true)
    try {
      const q = query(
        collection(db, "testResult"),
        where("student_id", "==", id)
      )
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        testData.push({ ...doc.data(), docId: doc.id })
      })

      setTestResult(testData)
      setLoading(false)
    } catch (error) {
      console.log("error", error)
    }
  }

  return {
    fetchStudentData,
    fetchAllStudents,
    fetchEssay,
    fetchTestResult,
  }
}

export default ApiServices
