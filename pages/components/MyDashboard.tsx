import React from "react"
import Lessons from "./Components/Lessons"
import Statistics from "./Components/Statistics"
import ClassStudents from "./Student/ClassStudents"
import Navbar from "./Navbar"
import { useStoreUser } from "@/pages/zustand"
import Translator from "./Translator"
import TestResult from "./Assessment/TestResult"

function MyDashboard() {
  const { userInfo } = useStoreUser()

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flex: 2, flexDirection: "column" }}>
          {userInfo.role === "student" ? (
            <>
              <Lessons num={1} />
              <Translator />
              <TestResult />
            </>
          ) : userInfo.role === "teacher" || userInfo.role === "admin" ? (
            <>
              <Lessons num={1} />
              <Statistics displayGraphs={false} />
              <ClassStudents />
            </>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default MyDashboard
