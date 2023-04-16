import React from "react"
import { useStore, useStoreUser, useStoreTemporary } from "../../../zustand"
import SnackbarX from "./SnackbarX"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../../firebaseX"
import OneLesson from "./OneLesson"

function Lessons(props) {
  const [open, setOpen] = React.useState(false)
  const { lessonState, setLessonState } = useStore((state) => state)
  const { sidebarWidth } = useStoreTemporary()

  // fetch upcoming sessions for the current user and add them to session[]
  async function fetchData() {
    const lessons = []
    try {
      const q = query(
        collection(db, "lessons"),
        where("level", "==", "Intermediate")
      )
      const querySnapshot = await getDocs(q)

      querySnapshot.forEach((doc) => {
        lessons.push({ ...doc.data(), docId: doc.id })
      })

      setLessonState(lessons)
    } catch (error) {
      console.log("error", error)
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <SnackbarX
        open={open}
        setOpen={setOpen}
        backgroundColor="#32a676"
        message="You have successfully cancelled your sessions!"
      />

      {
        <>
          {/* <h3
            style={{
              margin: 10,
              fontWeight: 600,
              fontSize: 19,
              color: "#5f616a",
            }}
          >
            Lessons
          </h3> */}
          <div
            style={{
              marginTop: 50,
              display: "flex",
              overflowX: "scroll",
              overflowY: "hidden",
              boxSizing: "border-box",
              width: `calc(100vw - ${sidebarWidth}px)`,
            }}
          >
            {lessonState?.length > 0 &&
              lessonState
                ?.sort((a, b) => {
                  if (a.name > b.name) return 1
                  if (a.name < b.name) return -1
                  return 0
                })
                .map((lesson, index) => <OneLesson lesson={lesson} />)}
          </div>
        </>
      }
    </>
  )
}

export default Lessons
