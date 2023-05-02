import React from "react"
import { useStoreTemporary } from "../../../zustand"
import SnackbarX from "./SnackbarX"
import OneLesson from "./OneLesson"
import ErrorPage from "../ErrorPage"
import LoadingPage from "../LoadingPage"
import ApiServices from "@/pages/api/ApiServices"

function Lessons(props) {
  const [open, setOpen] = React.useState(false)
  const { sidebarWidth } = useStoreTemporary()

  // fetch upcoming sessions for the current user and add them to session[]
  const { fetchLessons } = ApiServices()
  const { data: lessonState, isLoading, isError } = fetchLessons()

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

  return (
    <>
      <SnackbarX
        open={open}
        setOpen={setOpen}
        backgroundColor="#32a676"
        message="You have successfully cancelled your sessions!"
      />

      {
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
              .map((lesson, index) => (
                <OneLesson lesson={lesson} index={index} />
              ))}
        </div>
      }
    </>
  )
}

export default Lessons
