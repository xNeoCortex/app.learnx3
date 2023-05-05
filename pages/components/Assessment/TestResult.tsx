import React from "react"
import { Box } from "@mui/material"
import ExerciseResult from "./ExerciseResult"
import { useStoreUser } from "../../zustand"
import WritingResult from "../Writing/WritingResult"

function TestResult(props) {
  const { userInfo } = useStoreUser()

  return (
    <>
      <h3
        style={{
          margin: 10,
          marginTop: 25,
          fontWeight: 600,
          fontSize: 19,
          color: "#5f616a",
        }}
      >
        Assessment Results
      </h3>

      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "center",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "white",
            margin: "10px",
            flex: 1,
            borderRadius: 2,
          }}
        >
          <ExerciseResult id={userInfo?.uid} />
        </Box>
        <Box
          sx={{
            background: "white",
            margin: "10px",
            flex: 1,
            borderRadius: 2,
          }}
        >
          <WritingResult id={userInfo?.uid} />
        </Box>
      </Box>
    </>
  )
}

export default TestResult
