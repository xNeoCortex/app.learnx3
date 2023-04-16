import { Box, CircularProgress } from "@mui/material"
import React from "react"

function LoadingPage(props) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  )
}

export default LoadingPage
