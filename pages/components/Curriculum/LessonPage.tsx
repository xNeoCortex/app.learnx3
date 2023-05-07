import { Avatar, Box, Button, Container, Typography } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton"
import { WritingContainer } from "../Components/WritingContainer"
import { TestContainer } from "../Assessment/TestContainer"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { TestData } from "@/pages/data/TestData"
import { WritingData } from "@/pages/data/WritingData"
import { useQuery } from "react-query"

function LessonPage(props) {
  const { id } = useParams()
  const { fetchLessons } = ApiServices()
  const { data: lessonState, isLoading, isError } = useQuery(["lessons"], fetchLessons)

  const currentLesson = lessonState?.data.find((item) => item.id === id)
  const currentTest = TestData?.find(
    (item) => item.topic_id === currentLesson?.topic_id
  )
  const currentWriting = WritingData?.find(
    (item) => item.id === currentLesson?.topic_id
  )

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

  return (
    <Box display="flex" sx={{ position: "relative", width: "100%" }}>
      <Container
        style={{
          padding: "20px 10px",
          margin: 5,
          borderRadius: 23,
          color: "white",
          height: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          background: "rgba(226, 230, 251, 0.3)",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "left",
            justifyContent: "start",
            width: "100%",
            padding: "10px 20px",
            marginBottom: 1,
          }}
        >
          <Avatar
            src="/grammar-in-use.png"
            sx={{
              bgcolor: "grey",
              width: 200,
              height: "100%",
              borderRadius: "6px",
            }}
          />
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "start",
              alignItems: "flexStart",
              padding: "0px 30px",
            }}
          >
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
              Lesson {currentLesson?.lesson}
            </Typography>
            <h4
              style={{
                color: "#323331",
                fontWeight: 600,
                fontSize: 28,
                padding: 0,
                margin: 0,
                marginBottom: 10,
              }}
            >
              {currentLesson?.topic}
            </h4>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {["Class A", `${currentLesson?.level}`].map((item, index) => (
                <p
                  key={index}
                  style={{
                    fontWeight: 500,
                    padding: "3px 10px",
                    background: "white",
                    color: "rgb(50, 50, 93)",
                    border: "1px solid rgb(50, 50, 93)",
                    maxWidth: "191px",
                    borderRadius: 12,
                    marginRight: 10,
                    fontSize: "12px",
                  }}
                >
                  {item}
                </p>
              ))}
            </Box>
            <Typography
              sx={{
                padding: "10px 20px",
                minHeight: "70px",
                background: "white",
                marginTop: "25px",
                color: "black",
                flex: 1,
                borderRadius: 2,
                fontSize: "15px",
              }}
            >
              {currentLesson?.topic_description}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            padding: "10px",
          }}
        >
          <a href={currentLesson?.teach_material} target="_blank">
            <Button
              variant="contained"
              sx={{
                //   background: "#5f61c4",
                //   color: "white",
                margin: 1,
                textTransform: "none",
                padding: "5px 30px",
              }}
            >
              <MenuBookIcon style={{ marginRight: 8 }} />
              View Book
            </Button>
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href={`http://teleport.video/sakinah/yaseenavgani`}
          >
            <Button
              variant="outlined"
              sx={{
                margin: 1,
                textTransform: "none",
                padding: "5px 30px",
              }}
            >
              <VideocamIcon
                style={{
                  marginRight: 6,
                  // color: "#5f61c4"
                }}
              />
              Video Call
            </Button>
          </a>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            padding: "10px 10px 0px",
          }}
        >
          <h3
            style={{
              margin: "10px 10px 0px",
              fontWeight: 600,
              fontSize: 19,
              color: "#5f616a",
            }}
          >
            Assessments
          </h3>
        </Box>
        {currentWriting && (
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              margin: "10px 10px 0px",
            }}
          >
            <WritingContainer item={currentWriting} />
          </Box>
        )}
        {currentTest && (
          <Box
            sx={{
              display: "flex",
              alignItems: "start",
              justifyContent: "center",
              flexDirection: { xs: "column", sm: "row" },
              width: "100%",
              margin: "0px 10px ",
            }}
          >
            <TestContainer item={currentTest} />
          </Box>
        )}
        <BackButton />
      </Container>
    </Box>
  )
}

export default LessonPage
