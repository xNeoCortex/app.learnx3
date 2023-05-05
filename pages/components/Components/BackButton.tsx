import { Box, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

function BackButton() {
  const navigate = useNavigate()

  return (
    <Box sx={{ position: "absolute", top: 20, right: 10 }}>
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        style={{
          borderRadius: 20,
          color: "black",
          background: "white",
          width: 100,
          fontWeight: 600,
          boxShadow: "none",
          marginRight: 20,
        }}
      >
        Back
      </Button>
    </Box>
  )
}

export default BackButton
