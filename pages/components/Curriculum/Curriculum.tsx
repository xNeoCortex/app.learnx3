import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useQuery, useQueryClient, useMutation } from "react-query"
import {
  Box,
  Button,
  CardMedia,
  Chip,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import ApiPostServices from "@/pages/api/ApiPostServices"

function Curriculum() {
  const queryClient = useQueryClient()
  const { fetchCurriculum } = ApiServices()
  const { addCurriculum } = ApiPostServices()
  const [open, setOpen] = useState(false)
  const [curName, setCurName] = useState("")

  const {
    data: curriculumList,
    isLoading,
    isError,
  } = useQuery(["curriculumList"], fetchCurriculum)

  const { mutate } = useMutation((body) => addCurriculum(body), {
    onSuccess: () => queryClient.invalidateQueries("curriculumList"),
  })

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
          <Button sx={{ m: "20px 0px" }} onClick={() => setOpen(!open)}>
            Create Curriculum
          </Button>
          {open && (
            <Box
              sx={{
                m: "0px 0px 40px",
                display: "flex",
                justifyContent: "center",
                width: "fit-content",
              }}
            >
              <TextField
                id="outlined-basic"
                label="Curriculum name"
                variant="outlined"
                value={curName}
                onChange={(e) => setCurName(e.target.value)}
              />
              <Button
                disabled={curName.length === 0}
                sx={{ marginLeft: 2, m: 1 }}
                variant="contained"
                onClick={() => (
                  curName.length > 0 &&
                    //@ts-ignore
                    mutate({
                      curriculum_name: curName,
                      level: "b1",
                    }),
                  setOpen(false)
                )}
              >
                Save
              </Button>
            </Box>
          )}
          {curriculumList?.data.map((c, index) => (
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
                <Link to={`/class-curriculum/${c.curriculum_id}`}>
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
