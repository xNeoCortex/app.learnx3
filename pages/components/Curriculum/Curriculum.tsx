import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery } from "react-query"
import {
  Box,
  Button,
  CardMedia,
  Chip,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import CreateLesson from "./CreateLesson"
import CreateCurriculum from "./CreateCurriculum"
import BackButton from "../Components/BackButton"
import CreateAssessment from "./CreateAssessment"

function Curriculum() {
  const { fetchAllCurriculum } = ApiServices()
  const [open, setOpen] = useState(false)
  const [openLesson, setOpenLesson] = useState(false)
  const [openTest, setOpenTest] = useState(false)

  // Fetch curriculum
  const {
    data: curriculumList,
    isLoading,
    isError,
  } = useQuery(["curriculumList"], fetchAllCurriculum)

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

  return (
    <Box sx={{ marginTop: "20px", width: "100%" }}>
      <CssBaseline />
      <BackButton />

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
          <Box sx={{ display: "flex", mb: 3, mt: 3 }}>
            {!openLesson && !openTest && (
              <CreateCurriculum open={open} setOpen={setOpen} />
            )}
            {!open && !openTest && (
              <CreateLesson open={openLesson} setOpen={setOpenLesson} />
            )}
            {!open && !openLesson && (
              <CreateAssessment open={openTest} setOpen={setOpenTest} />
            )}
          </Box>
          {!open &&
            !openLesson &&
            !openTest &&
            curriculumList?.data.map((c, index) => (
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
                  backgroundColor: "rgba(255, 139, 79, 0.07)",
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
                      color: "black",
                      fontWeight: 600,
                      fontSize: 18,
                      padding: 0,
                      maxWidth: 400,
                    }}
                  >
                    {c.curriculum_name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={c.level}
                    variant="outlined"
                    style={{
                      color: "rgb(255, 139, 79)",
                      background: "transparent",
                      margin: "5px 10px 5px 0px",
                      border: "1px solid rgb(255, 139, 79)",
                      borderRadius: "0.75rem",
                      padding: "0px 2px",
                      fontSize: 12,
                    }}
                  />
                  <Chip
                    label={`60 min`}
                    variant="outlined"
                    style={{
                      color: "rgb(255, 139, 79)",
                      background: "transparent",
                      border: "1px solid rgb(255, 139, 79)",
                      margin: "5px 20px 5px 0px",
                      borderRadius: "0.75rem",
                      padding: "0px 2px",
                      fontSize: 12,
                    }}
                  />
                  <Link to={`/class-curriculum/${c.uid}`}>
                    <Button
                      style={{
                        background: "darkorange",
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
