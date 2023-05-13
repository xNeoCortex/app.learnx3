import { Avatar, Box, Button, Container, Grid, Typography } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton"
import { WritingContainer } from "../Components/WritingContainer"
import { TestContainer } from "../Assessment/TestContainer"
import MenuBookIcon from "@mui/icons-material/MenuBook"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { TestData } from "@/components/data/TestData"
import { WritingData } from "@/components/data/WritingData"
import { lessonsX } from "@/components/data/CurriculumDataX"
import HelperFuncitons from "@/components/helpers/helperFuncitons"
import { useQuery } from "react-query"
import { useState } from "react"

function VocabularyPage() {
  const { lessonId } = useParams()
  const { fetchOneLesson, fetchAssessment } = ApiServices()
  const { capitalizeFirstLetter, setEnglishLevel } = HelperFuncitons()

  const { data } = useQuery(["vocabularyCards"], () =>
    fetchAssessment("vocabularyCards")
  )

  const {
    data: lessonState,
    isLoading,
    isError,
  } = useQuery(["lesson"], () => fetchOneLesson(lessonId))

  const Vocabulary_1 = data?.data?.filter((item) =>
    lessonState?.data.vocabulary_cards.includes(item.uid)
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
            background: "white",
            borderRadius: 3,
            width: "100%",
          }}
        >
          <h3 style={{ color: "black", margin: "20px 80px" }}>
            {" "}
            📒 Words of the day!
          </h3>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              background: "white",
              borderRadius: 3,
              width: "100%",
            }}
          >
            {Vocabulary_1?.vocabularies?.map((word) => (
              <VocabularyCards
                word={word}
                capitalizeFirstLetter={capitalizeFirstLetter}
              />
            ))}
          </Box>
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
                link={`/test/word-building/${test}`}
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

const VocabularyCards = ({ word, capitalizeFirstLetter }) => {
  const [open, setOpen] = useState(null)

  return (
    <Box
      sx={{
        background: "#ffd60a",
        "&:hover": {
          // background: "#023047",
          transform: "scale(1.03)",
          transition: "all 0.3s ease-in-out",
        },
        borderRadius: 2,
        m: 2,
        p: 2,
        width: "100%",
        height: "250px",
        maxWidth: 300,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
      }}
    >
      <div
        onClick={() => setOpen(null)}
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          color: "black",
          cursor: "pointer",
        }}
      >
        X
      </div>
      <Box
        sx={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h3 style={{ height: "fit-content", color: "black" }}>{word.word}</h3>
      </Box>
      {["definition", "example"].map(
        (item) =>
          open === item && (
            <p
              style={{
                background: "white",
                color: "black",
                textAlign: "center",
                marginBottom: 2,
                borderRadius: 3,
                padding: 6,
              }}
            >
              {word[item]}
            </p>
          )
      )}
      {["synonyms", "antonyms"].map(
        (item) =>
          open === item && (
            <p
              style={{
                background: "white",
                color: "black",
                textAlign: "center",
                marginBottom: 2,
                borderRadius: 3,
                padding: 6,
              }}
            >
              {word[item].map((item) => {
                return <p>{item}</p>
              })}
            </p>
          )
      )}

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          mt: 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {["definition", "synonyms", "antonyms", "example"].map((item) => (
          <Button
            onClick={() => setOpen(item)}
            sx={{
              fontSize: 12,
              width: "fit-content",
              margin: "3px",
              border: open === item && "1px solid white",
              fontWeight: open === item && "bolder",
              color: "black",
            }}
          >
            {capitalizeFirstLetter(item)}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default VocabularyPage
