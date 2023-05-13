import { Box, Button, CardMedia } from "@mui/material"
import { Link } from "react-router-dom"

export const TestContainer = ({ link, test, category, topic, level }) => {
  return (
    <Box
      sx={{
        margin: 2,
        borderRadius: "10px",
        mb: 2,
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        background: "white",
        boxShadow:
          "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
      }}
    >
      <CardMedia
        component="img"
        sx={{
          height: "60px",
          width: "150px",
          objectFit: "cover",
          margin: " 10px",
          borderRadius: "10px",
        }}
        image="/test_imag.png"
        alt="test image"
      />

      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
          padding: "10px 20px",
          alignItems: "center",
          fontSize: 14,
          fontWeight: 600,
          color: "rgb(50, 50, 93)",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <h3 style={{ width: "auto", marginRight: "20px" }}>
            {" "}
            {test.topic || topic}{" "}
          </h3>
          <p
            style={{
              fontWeight: 500,
              padding: "3px 10px",
              background: "white",
              color: "rgb(50, 50, 93)",
              border: "1px solid rgb(50, 50, 93)",
              maxWidth: "191px",
              borderRadius: 12,
              fontSize: "12px",
              marginRight: 12,
            }}
          >
            {test.type || test.question_type || level}
          </p>
          <p
            style={{
              fontWeight: 500,
              padding: "3px 10px",
              background: "white",
              color: "rgb(50, 50, 93)",
              border: "1px solid rgb(50, 50, 93)",
              maxWidth: "191px",
              borderRadius: 12,
              fontSize: "12px",
            }}
          >
            {category}
          </p>
        </Box>
        <Link to={link}>
          <Button
            variant="contained"
            size="small"
            sx={{
              background: "#0092e4",
              boxShadow: "none",
              fontWeight: 600,
            }}
          >
            Start
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
