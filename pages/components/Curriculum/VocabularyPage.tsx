import { useQuery } from "react-query"
import { Box, Container, Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import BackButton from "../Components/BackButton"
import { TestContainer } from "../Assessment/TestContainer"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import HelperFuncitons from "@/pages/helpers/helperFuncitons"
import { LessonIntro } from "./LessonIntro"
import { VocabularyCard } from "./VocabularyCard"

export default function VocabularyPage() {
  const { lessonId } = useParams()
  const { fetchOneLesson, fetchAssessment } = ApiServices()
  const { capitalizeFirstLetter } = HelperFuncitons()

  const {
    data,
    isLoading: isLoadingData,
    isError: isErrorData,
  } = useQuery(["vocabularyCards"], () => fetchAssessment("vocabularyCards"))

  const {
    data: lessonState,
    isLoading,
    isError,
  } = useQuery(["lesson"], () => fetchOneLesson(lessonId))

  const Vocabulary_1 = data?.data?.filter((item) =>
    lessonState?.data.vocabulary_cards.includes(item.uid)
  )[0]

  if (isLoading || isLoadingData) return <LoadingPage />
  if (isError || isErrorData) return <ErrorPage />

  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        width: "100%",
      }}
    >
      <Container
        sx={{
          padding: "20px 5px",
          color: "white",
          height: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        <LessonIntro lessonState={lessonState} image="/vocabulary-image.png" />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "column",
            justifyContent: "center",
            background: "white",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            borderRadius: 3,
            width: "100%",
            p: "20px 0px",
          }}
        >
          <h3 style={{ color: "black", margin: "10px 30px" }}>
            {" "}
            📒 Words of the day!
          </h3>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              borderRadius: 3,
              width: "100%",
            }}
          >
            {Vocabulary_1?.vocabularies?.map((word) => (
              <VocabularyCard
                word={word}
                capitalizeFirstLetter={capitalizeFirstLetter}
              />
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "center",
            width: "100%",
            padding: "10px 10px 0px",
            background: "rgba(226, 230, 251, 0.3)",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
            borderRadius: 3,
            p: "20px 0px",
            mt: 3,
          }}
        >
          <h3
            style={{
              padding: "0px 20px",
              color: "rgb(50, 50, 93)",
              fontWeight: 600,
              fontSize: 19,
              width: "100%",
            }}
          >
            Assessments
          </h3>

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
        </Box>
      </Container>
      <BackButton />
    </Box>
  )
}
