import { Box, Button, CssBaseline, Typography } from "@mui/material"
import { TestData } from "../../data/TestData"
import { useParams } from "react-router-dom"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import { useState } from "react"
import BackButton from "../Components/BackButton"
import { auth } from "../../firebaseX"
import ApiPostServices from "@/pages/api/ApiPostServices"
import ErrorPage from "../Components/ErrorPage"
import { v4 as uuidv4 } from "uuid"
import LoadingPage from "../Components/LoadingPage"

function Test() {
  const { id } = useParams()
  const { submitTest } = ApiPostServices()
  const { mutate, isLoading, isError } = submitTest()
  const [score, setScore] = useState(0)
  const [show, setShow] = useState(false)
  const [answersX, setAnswers] = useState([])

  const currentTest = TestData.filter((test) => +test.topic_id === +id)
  const answers = answersX.map((answer) => answer.answer)
  const correctAnswers = currentTest.filter((item) =>
    answers.includes(item.answer)
  )

  const handleRadioChange = (e, id) => {
    const answerY = { id: id, answer: e.target?.value.trim() }

    if (!answersX.some((answer) => answer.id === answerY.id)) {
      // make sure ! is before answersX.some....., NOT answer.id !== answerY.id
      setAnswers((prevAnswer) => [...prevAnswer, answerY])
    } else {
      const newArary = answersX.filter((answer) => answer.id !== answerY.id)
      setAnswers([...newArary, answerY])
    }
  }

  function handleSubmit() {
    const score = (correctAnswers.length / answersX.length) * 100
    setShow(true)
    setScore(score)

    mutate({
      topic: currentTest[0].topic,
      topic_id: currentTest[0].topic_id,
      level: "intermediate",
      result: score,
      student_id: auth.currentUser.uid,
      student_name: auth.currentUser.displayName,
    })
  }

  if (isLoading) <LoadingPage />
  if (isError) <ErrorPage />

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
          {currentTest[0].topic}
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
          margin: 1,
        }}
      >
        {currentTest.map((test, index) => (
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
              background: "white",
              boxShadow:
                "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
            }}
          >
            <h3>{test.question}</h3>
            {show &&
              (answersX.map((item) => item.answer).includes(test.answer) ? (
                <h3 style={{ color: "green" }}>Correct Answer!</h3>
              ) : (
                <h3 style={{ color: "red" }}>Wrong Answer!</h3>
              ))}
            <FormControl>
              <RadioGroup
                onChange={(e) => handleRadioChange(e, test.id)}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue=""
                name="radio-buttons-group"
              >
                {test.choices.map((choice, index) => (
                  <FormControlLabel
                    key={index}
                    value={choice}
                    control={<Radio />}
                    label={choice}
                  />
                ))}
              </RadioGroup>
            </FormControl>
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
                Correct Answer: <strong> {test.answer}</strong>
              </Typography>
            )}
            {show && (
              <Typography
                sx={{
                  mb: 1,
                  border: "2px solid #ffee32",
                  borderRadius: 2,
                  p: 1,
                  background: "#ffee325e",
                }}
              >
                {" "}
                {test.explanation}
              </Typography>
            )}
          </Box>
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
          style={{ margin: 15 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      )}
    </Box>
  )
}

export default Test
