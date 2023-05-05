import ApiServices from "@/pages/api/ApiServices"
import {
  Box,
  Button,
  CardMedia,
  Chip,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material"
import { Link } from "react-router-dom"
import ErrorPage from "../Components/ErrorPage"
import LoadingPage from "../Components/LoadingPage"

function Curriculum() {
  const { fetchLessons } = ApiServices()
  const { data: lessonState, isLoading, isError } = fetchLessons()

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

  return (
    <Box sx={{ marginTop: "20px", width: "100%" }}>
      <CssBaseline />
      <h3
        style={{
          margin: 10,
          marginBottom: 20,
          fontWeight: 600,
          fontSize: 19,
          color: "#5f616a",
        }}
      >
        Class Curriculum
      </h3>

      <Grid container>
        <Grid
          item
          xs={12}
          style={{
            padding: 10,
            margin: "0px 0px 30px",
          }}
        >
          {lessonState.map((lesson, index) => (
            <Box
              key={index}
              sx={{
                margin: "auto",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 3,
                backgroundColor: "rgba(226, 230, 251, 0.3)",
                boxShadow:
                  "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: "60px", marginRight: "15px" }}>
                  <CardMedia
                    component="img"
                    image="/book.svg"
                    alt="test image"
                  />
                </Box>
                <Typography
                  sx={{
                    marginRight: 5,
                    color: "rgb(50, 50, 93)",
                    fontWeight: 600,
                    fontSize: 16,
                    padding: 0,
                    maxWidth: 400,
                  }}
                >
                  Lesson {lesson.lesson}:{" "}
                  {lesson.topic.split(" ")[0].slice(0, 1).toUpperCase() +
                    lesson.topic.slice(1)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={lesson.level}
                  variant="outlined"
                  style={{
                    color: "rgb(50, 50, 93)",
                    background: "transparent",
                    margin: "5px 10px 5px 0px",
                    border: "1px solid rgb(50, 50, 93)",
                    borderRadius: "0.75rem",
                    padding: "0px 2px",
                    fontSize: 12,
                  }}
                />
                <Chip
                  label={`60 min`}
                  variant="outlined"
                  style={{
                    color: "rgb(50, 50, 93)",
                    background: "transparent",
                    border: "1px solid rgb(50, 50, 93)",
                    margin: "5px 20px 5px 0px",
                    borderRadius: "0.75rem",
                    padding: "0px 2px",
                    fontSize: 12,
                  }}
                />
                <Link to={`/class-curriculum/${lesson.id}`}>
                  <Button
                    style={{
                      background: "#5f61c4",
                      color: "white",
                      margin: "0px 15px",
                      padding: "5px 30px",
                      textTransform: "none",
                      fontWeight: "bold",
                    }}
                  >
                    View
                  </Button>
                </Link>
              </Box>
            </Box>
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Curriculum
