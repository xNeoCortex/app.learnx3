import React from "react"
import Lessons from "../Components/Lessons"
import Navbar from "../Navbar"
import Translator from "../Translator"
import TestResult from "../Assessment/TestResult"

function StudentDashboard() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <div style={{ display: "flex", flex: 2, flexDirection: "column" }}>
          <Lessons num={1} />
          <Translator />
          <TestResult />
        </div>
      </div>
    </div>
  )
}

export default StudentDashboard
