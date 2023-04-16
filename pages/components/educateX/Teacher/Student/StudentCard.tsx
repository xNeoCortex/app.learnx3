import { Avatar, Box, Button } from "@mui/material"
import { Link } from "react-router-dom"

function StudentCard({ details }) {
  return (
    <div
      style={{
        padding: "20px 10px",
        width: 200,
        marginRight: 20,
        borderRadius: 23,
        color: "white",
        height: 250,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        background: "#e0e1f1",
        marginBottom: 20,
      }}
    >
      <Avatar
        src="/pupil-avatar.png"
        sx={{ bgcolor: "grey", width: 70, height: 70 }}
      />

      <Box display="flex" alignItems="center" flexDirection="column">
        <h5
          style={{
            color: "#323331",
            fontWeight: 600,
            fontSize: 16,
            padding: 0,
            margin: 0,
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          {details.name}
        </h5>
        <p
          style={{
            color:
              details.performance == "Struggling"
                ? "rgb(226, 109, 128)"
                : details.performance == "Doing Great"
                ? "#5fc497"
                : "#41b6ff",
            fontWeight: 600,
            padding: "3px 10px",
            background: "white",
            border:
              details.performance == "Struggling"
                ? "2px solid rgb(226, 109, 128)"
                : details.performance == "Doing Great"
                ? "2px solid #5fc497"
                : "2px solid #41b6ff",
            borderRadius: 12,
            marginBottom: 15,
            fontSize: "13px",
          }}
        >
          {details.performance}
        </p>
      </Box>
      <Box display="flex" alignItems="center" flexDirection="column">
        <Link to={`/student/${details.id}`} state={{ student: details }}>
          <Button
            variant="contained"
            style={{
              borderRadius: 20,
              color: "black",
              background: "white",
              width: 100,
              boxShadow: "none",
              textTransform: "none",
            }}
          >
            View
          </Button>
        </Link>
      </Box>
    </div>
  )
}

export default StudentCard
