import { Avatar, Box, Button, Typography } from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"

function Iam() {
  const [who, setWho] = React.useState("teacher")
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: `url(/bg1.jpg)`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          maxWidth: "650px",
          background: "#5f6ac40f",
          borderRadius: "8px",
          padding: 5,
          paddingTop: "20px",
          margin: "10px",
          marginBottom: "200px",
          overflow: "hidden",
        }}
      >
        <Typography sx={{ fontSize: 28, m: "auto", mb: 4, color: "black" }}>
          Hello, I am a{" "}
          <span style={{ textDecoration: "underline" }}>{who}</span>!
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Avatar
            onClick={() => setWho("teacher")}
            alt="Remy Sharp"
            src="/teacher-johny.png"
            sx={{
              cursor: "pointer",
              border: who === "teacher" ? "4px solid black" : "2px solid white",
              width: "180px",
              height: "180px",
              m: 1,
            }}
          />
          <Avatar
            sx={{
              cursor: "pointer",
              border: who === "student" ? "4px solid black" : "2px solid white",
              width: "180px",
              height: "180px",
              m: 1,
            }}
            onClick={() => setWho("student")}
            alt="Remy Sharp"
            src="/pupil-avatar.png"
          />
        </Box>
        <Link
          to={who === "teacher" ? "/user-info" : "/student-info"}
          style={{ margin: "15px auto 0px" }}
        >
          <Button
            variant="contained"
            style={{ background: "rgb(95, 106, 196)" }}
          >
            Next
          </Button>
        </Link>
      </Box>
    </div>
  )
}

export default Iam
