import { Box, Button, Chip, CssBaseline, Typography } from "@mui/material"
import { TestData } from "../../data/TestData"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import BackButton from "../Components/BackButton"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../Components/ErrorPage"
import LoadingPage from "../Components/LoadingPage"
import { useMutation, useQuery, useQueryClient } from "react-query"
import ApiServices from "@/pages/api/ApiServices"
import { auth } from "../../firebaseX"

function TrueFalseQuiz() {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const [score, setScore] = useState(0)
  const [show, setShow] = useState(false)
  const [answers, setAnswers] = useState([])

  const { submitTest } = ApiPostServices()
  const { fetchOneAssessment } = ApiServices()

  // Submit assessment on database
  const { mutate, isLoading, isError } = useMutation(
    (body) => submitTest(body),
    { onSuccess: () => queryClient.invalidateQueries("testResult") }
  )

  // Get assessment data from database
  const {
    data: reading_quiz,
    isLoading: isLoadingQuiz,
    isError: isErrorQuiz,
  } = useQuery(["readingAssessment"], () =>
    fetchOneAssessment({ db_collection: "readingAssessment", id: id })
  )

  function handleSelect(response, index) {
    const newAnswers = [...answers]
    const answer = newAnswers[index]
    answer.response = response
    setAnswers(newAnswers)
  }

  function handleSubmit() {
    const correctAnswers = answers.filter(
      (item) => item.response === item.answer
    )
    const score = (correctAnswers?.length / answers?.length) * 100

    setShow(true)
    setScore(score)
    //@ts-ignore
    mutate({
      topic: reading_quiz?.data.topic,
      level: reading_quiz?.data.level,
      lesson_number: reading_quiz?.data.lesson_number,
      assessment_type: reading_quiz?.data.question_type,
      result: score,
      assessment_id: reading_quiz?.data.uid,
      student_id: auth.currentUser.uid,
      student_name: auth.currentUser.displayName,
    })
  }

  useEffect(() => {
    setAnswers(reading_quiz?.data?.questions)
  }, [isLoadingQuiz])

  if (isLoading || isLoadingQuiz) <LoadingPage />
  if (isError || isErrorQuiz) <ErrorPage />

  return (
    <Box sx={{ marginTop: "20px", flexGrow: 1 }}>
      <CssBaseline />
      <Box
        sx={{
          background: "#bdbdbd33",
          margin: "15px ",
          padding: "1px 0px",
          borderRadius: 3,
          position: "relative",
        }}
      >
        <Typography
          sx={{
            margin: "15px 15px 0px",
            marginBottom: "10px",
            fontWeight: 600,
            fontSize: "19px",
            color: "rgb(50, 50, 93)",
          }}
        >
          {reading_quiz?.data?.topic}
        </Typography>
        <Typography sx={{ margin: "0px 15px 15px" }}>
          {" "}
          Please answer the following questions within 5 minutes.{" "}
        </Typography>
        <BackButton />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 2,
          padding: 4,
          background: "#f4eee3",
          color: "#404040",
          borderRadius: 3,
        }}
      >
        <h3>📝 {reading_quiz?.data?.topic} </h3>
        <p
          style={{ color: "black" }}
          dangerouslySetInnerHTML={{
            __html: reading_quiz?.data?.text?.replace(/\n/g, "<br /> <br />"),
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: 1,
          mt: 5,
        }}
      >
        <h3 style={{ margin: 12 }}>❓ Questions </h3>
        {reading_quiz?.data?.questions.map((test, index) => (
          <ReadingQuiz
            key={index}
            show={show}
            test={test}
            index={index}
            handleSelect={handleSelect}
          />
        ))}
      </Box>
      {show && (
        <Typography
          sx={{
            flex: 1,
            margin: "0px 15px",
            mb: 1,
            border: "2px solid #3c096c",
            borderRadius: 3,
            p: 1,
            background: "#e0aaff",
            textAlign: "center",
            fontWeight: 600,
          }}
        >
          You scored {score}% out of 100%
        </Typography>
      )}
      {!show && (
        <Button
          variant="contained"
          style={{
            margin: 15,
            minWidth: 200,
            background: "rgb(95, 106, 196)",
          }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </Box>
  )
}

export default TrueFalseQuiz

const ReadingQuiz = ({ test, show, index, handleSelect }) => {
  return (
    <Box
      key={index}
      mb="10px"
      m={1}
      p={2}
      borderRadius="10px"
      sx={{
        display: "flex",
        flex: 1,
        margin: 1,
        flexDirection: "column",
        background: show
          ? test?.response === test?.answer
            ? "#d8f3dc"
            : "#ffccd578"
          : "white",
        boxShadow:
          "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
      }}
    >
      <CssBaseline />
      <h4>{test.question}</h4>
      <Box>
        {[
          { label: "True", boolean: true },
          { label: "False", boolean: false },
          { label: "Don't know", boolean: null },
        ].map((item) => (
          <Chip
            onClick={() => handleSelect(item.boolean, index)}
            sx={{
              width: "fit-content",
              margin: "20px 20px 0px 0px",
              fontWeight: "bolder",
              background:
                test.response === item.boolean ? "#5d5fc4b5" : "white",
            }}
            label={item.label}
            color="secondary"
            variant="outlined"
          />
        ))}
      </Box>
      {show && (
        <Typography
          sx={{
            mt: 2,
            mb: 1,
            border: "2px solid #06d6a0",
            borderRadius: 2,
            p: 1,
            background: "#06d6a021",
          }}
        >
          Correct Answer:{" "}
          <strong> {test.answer === true ? "True" : "False"}</strong>
        </Typography>
      )}
    </Box>
  )
}
