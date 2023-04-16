import {
  Avatar,
  Box,
  Button,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material"
import { useParams, useNavigate } from "react-router-dom"
import ExplainAI from "../ExplainAI"
import BackButton from "../Components/BackButton"
import { doc, getDoc, updateDoc } from "firebase/firestore"
import { db } from "../../../firebaseX"
import { useEffect, useState } from "react"
import LoadingPage from "../LoadingPage"
import { useStoreUser } from "../../../zustand"

function GradeWritingPage(props) {
  const { id } = useParams()
  const { userInfo } = useStoreUser()
  const navigate = useNavigate()
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [mark, setMark] = useState(null)
  const [successMessage, setSuccessMessage] = useState(false)

  const docRef = doc(db, "essayResult", id)

  const submitFeedback = async () => {
    try {
      const response = await updateDoc(docRef, {
        result: mark,
        feedback: feedback,
      })
      setFeedback("")
      setMark(null)
      setSuccessMessage(true)
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  const fetchEssay = async () => {
    setLoading(true)
    try {
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        setStudent(docSnap.data())
        setLoading(false)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!")
        navigate("/error")
      }
    } catch (error) {
      console.log("error :>> ", error)
    }
  }

  useEffect(() => {
    fetchEssay()
  }, [])

  if (loading) return <LoadingPage />

  return (
    <Box display="flex" sx={{ position: "relative", width: "100%" }}>
      <div
        style={{
          padding: "20px 10px",
          flex: 2,
          margin: 5,
          borderRadius: 23,
          color: "white",
          height: "100%",
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          background: "rgb(255, 244, 232)",
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
            src="/pupil-avatar.png"
            sx={{ bgcolor: "grey", width: 100, height: 100 }}
          />
          <Box
            display="flex"
            alignItems="center"
            flexDirection="column"
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
              alignItems: "flexStart",
              padding: "0px 30px",
            }}
          >
            <h4
              style={{
                color: "#323331",
                fontWeight: 600,
                fontSize: 18,
                padding: 0,
                margin: 0,
                marginBottom: 15,
              }}
            >
              {student?.student_name || "No student name"}
            </h4>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {["Class A", `${student?.level}`].map((item, index) => (
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
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              padding: "10px",
              background: "#bdbdbd33",
              marginBottom: "10px",
              width: "100%",
              borderRadius: 2,
              color: "black",
            }}
          >
            <Typography
              sx={{
                fontSize: 16,
                fontWeight: 600,
                padding: "5px 10px",
                width: "fit-content",
                mb: "10px",
              }}
            >
              Essay Topic: {student?.topic}
            </Typography>
            <Typography
              sx={{
                padding: "0px 10px",
              }}
            >
              {student?.essay}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: "10px",
              background: "#bdbdbd33",
              marginBottom: "10px",
              width: "100%",
              borderRadius: 2,
              minHeight: "200px",
              color: "black",
            }}
          >
            {student?.result?.length > 0 ? (
              <>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 600,
                    padding: "5px 10px",
                    width: "fit-content",
                    mb: "10px",
                  }}
                >
                  Feedback from your Teacher
                </Typography>
                <Typography
                  sx={{
                    padding: "0px 10px",
                  }}
                >
                  <p
                    dangerouslySetInnerHTML={{
                      __html: student?.feedback.replace(/\n/g, "<br />"),
                    }}
                  />
                </Typography>
                <Typography
                  sx={{
                    padding: "0px 10px",
                    marginTop: 5,
                    fontSize: 16,
                    fontWeight: 600,
                  }}
                >
                  Your mark is {student?.result}/100
                </Typography>
              </>
            ) : (
              <Typography
                sx={{
                  fontSize: 19,
                  fontWeight: 600,
                  padding: "5px 10px",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                No feedback yet
              </Typography>
            )}
          </Box>
          {userInfo.role == "admin" ||
            (userInfo.role == "teacher" && (
              <>
                <Box sx={{ width: "100%" }}>
                  <ExplainAI
                    prompt={`You are english teacher. Check the essay of student with Intermediate level of english and give him detailed feedback on his mistakes. This is the essay ${student?.essay}. Suggest on which topic a student should focus to improve his weakness based on his essay. Also, give student grade out of 100%.`}
                    buttonTitle="Get Feedback and Grade"
                    bg="#bdbdbd33"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    align: "center",
                    marginTop: "10px",
                    width: "100%",
                    borderRadius: 2,
                    gap: 1,
                  }}
                >
                  <TextareaAutosize
                    onChange={(e) => setFeedback(e.target.value)}
                    aria-label="empty textarea"
                    placeholder="Write your feedback here..."
                    value={feedback}
                    style={{
                      width: "100%",
                      borderRadius: "6px",
                      padding: "10px 20px",
                      minHeight: "85px",
                      border: "1px solid #bdbdbd",
                      color: "black",
                      background: "white",
                    }}
                  />
                  <Box>
                    <TextField
                      sx={{
                        marginBottom: 1,
                        width: "100%",
                        background: "white",
                      }}
                      id="outlined-basic"
                      type="number"
                      label="Mark"
                      variant="outlined"
                      value={mark}
                      onChange={(e) => setMark(e.target.value)}
                    />
                    <Button
                      disabled={feedback?.length < 1 || mark?.length < 1}
                      onClick={submitFeedback}
                      variant="contained"
                      sx={{ width: "100%", background: "rgb(95, 97, 196)" }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Box>
                {successMessage && (
                  <Box
                    sx={{
                      background: "rgb(95, 196, 151)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "8px",
                      padding: "20px",
                      width: "100%",
                      marginTop: 2,
                    }}
                  >
                    <Typography
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        fontWeight: "semibold",
                        fontSize: "16px",
                        color: "white",
                      }}
                    >
                      You have successfully submitted your feedback!
                    </Typography>
                  </Box>
                )}
              </>
            ))}
        </Box>

        <BackButton />
      </div>
    </Box>
  )
}

export default GradeWritingPage
