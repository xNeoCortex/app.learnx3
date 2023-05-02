import { collection, query, where, doc } from "firebase/firestore"
import { db } from "../firebaseX"
import {
  useFirestoreDocument,
  useFirestoreDocumentData,
  useFirestoreQuery,
  useFirestoreQueryData,
} from "@react-query-firebase/firestore"

function ApiServices() {
  function fetchStudentData(id: string) {
    const docRef = doc(db, "students", id)
    const response = useFirestoreDocumentData(["student", id], docRef)
    return response
  }

  function fetchAllStudents(): any {
    const docRef = query(collection(db, "students"))
    const response = useFirestoreQueryData(["students"], docRef)
    return response
  }

  function fetchAllTeachers(): any {
    const docRef = query(collection(db, "teachers"))
    const response = useFirestoreQueryData(["teachers"], docRef)
    return response
  }

  function fetchEssayResults() {
    const docRef = query(
      collection(db, "essayResult"),
      where("result", "==", null)
    )

    const { data, isLoading, isError } = useFirestoreQuery(
      ["essayFeedbackResult"],
      docRef
    )
    const submittedEssays = []
    data?.docs?.map((doc) => {
      submittedEssays.push({ ...doc.data(), uid: doc.id })
    })
    return { submittedEssays, isLoading, isError }
  }

  function fetchEssayInfo(id: string) {
    const docRef = doc(db, "essayResult", id)

    const {
      data: essayInfo,
      isLoading,
      isError,
    } = useFirestoreDocument(["essayInfo", { id }], docRef)

    return { essayInfo, isLoading, isError }
  }

  function fetchStudentEssayResult(id: string) {
    const docRef = query(
      collection(db, "essayResult"),
      where("student_id", "==", id)
    )
    const { data, isLoading, isError } = useFirestoreQuery(
      ["essayResult", { id }],
      docRef
    )
    const writingResult = []
    data?.docs?.map((doc) => {
      writingResult.push({ ...doc.data(), uid: doc.id })
    })
    return { writingResult, isLoading, isError }
  }

  function fetchTestResult(id: string) {
    const docRef = query(
      collection(db, "testResult"),
      where("student_id", "==", id)
    )
    const { data, isLoading, isError } = useFirestoreQuery(
      ["testResult", { id }],
      docRef
    )
    const testResult = []
    data?.docs?.map((doc) => {
      testResult.push({ ...doc.data(), uid: doc.id })
    })
    return { testResult, isLoading, isError }
  }

  function fetchClasses() {
    const docRef = query(collection(db, "classes"))
    const { data, isLoading, isError } = useFirestoreQuery(["classes"], docRef)
    const classList = []
    data?.docs?.map((doc) => {
      classList.push({ ...doc.data(), uid: doc.id })
    })
    return { classList, isLoading, isError }
  }

  function fetchOneClass(id) {
    const docRef = query(collection(db, "classes"))
    const { data, isLoading, isError } = useFirestoreQuery(["classes"], docRef)
    const classList = []
    data?.docs?.map((doc) => {
      classList.push({ ...doc.data(), uid: doc.id })
    })
    const classInfo = classList.filter((item) => item.uid === id)[0]
    return { classInfo, isLoading, isError }
  }

  function fetchLessons() {
    const docRef = query(
      collection(db, "lessons"),
      where("level", "==", "Intermediate")
    )
    const response = useFirestoreQueryData(["lessons"], docRef)
    return response
  }

  return {
    fetchStudentData,
    fetchAllStudents,
    fetchAllTeachers,
    fetchStudentEssayResult,
    fetchEssayResults,
    fetchEssayInfo,
    fetchTestResult,
    fetchClasses,
    fetchOneClass,
    fetchLessons,
  }
}

export default ApiServices
