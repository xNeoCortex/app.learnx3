import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton"
import { TestContainer } from "../Assessment/TestContainer"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import HelperFuncitons from "@/pages/helpers/helperFuncitons"
import { useQuery } from "react-query"
import { useState } from "react"

function ReadingPage() {
  const { lessonId } = useParams()
  const { fetchOneLesson, fetchAssessment } = ApiServices()
  const { capitalizeFirstLetter, setEnglishLevel } = HelperFuncitons()

  const { data: article } = useQuery(["readingArticle"], () =>
    fetchAssessment("readingArticle")
  )

  const {
    data: lessonState,
    isLoading,
    isError,
  } = useQuery([`lesson-${lessonId}`], () => fetchOneLesson(lessonId))

  const lessonArticle = article?.data?.filter((item) =>
    lessonState?.data.article.includes(item.uid)
  )[0]

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
              Lesson {lessonState?.data?.lesson_number}
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
              {capitalizeFirstLetter(lessonState?.data?.topic)}
            </h4>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <p
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
                Class A
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
                  marginRight: 10,
                  fontSize: "12px",
                }}
              >
                {setEnglishLevel(lessonState?.data?.level)}
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
                  marginRight: 10,
                  fontSize: "12px",
                }}
              >
                {lessonState?.data?.category}
              </p>
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
              {/* {currentLesson?.topic_description} */}
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
          {/* <a href={lessonState?.data?.link} target="_blank"> */}
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
          {/* </a> */}
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
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            background: "#f4eee3",
            color: "#404040",
            borderRadius: 3,
            width: "100%",
            padding: "30px 40px",
          }}
        >
          <h3> 📝 {lessonArticle.topic}!</h3>

          <p
            style={{ color: "black" }}
            dangerouslySetInnerHTML={{
              __html: lessonArticle?.text.replace(/\n/g, "<br /> <br />"),
            }}
          />
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
        {lessonState?.data.assessments.length && (
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
            {lessonState?.data.assessments?.map((test) => (
              <TestContainer
                link={`/test/true-false/${test}`}
                topic={lessonState?.data.topic}
                category={lessonState?.data.category}
                level={lessonState?.data.level}
                test={test}
              />
            ))}
          </Box>
        )}
        <BackButton />
      </Container>
    </Box>
  )
}

export default ReadingPage
