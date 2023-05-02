import { Avatar, Box } from "@mui/material"
import { useParams } from "react-router-dom"
import ExerciseResult from "../ExerciseResult"
import BackButton from "../../Components/BackButton"
import LoadingPage from "../../LoadingPage"
import WritingResult from "../../Writing/WritingResult"
import ApiServices from "../../../../api/ApiServices"
import ErrorPage from "../../ErrorPage"

function StudentProfile() {
  const { id } = useParams()

  const { fetchStudentData } = ApiServices()
  const { data, isLoading, isError } = fetchStudentData(id)

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

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
          background: "rgb(224, 225, 241)",
          boxSizing: "border-box",
          width: "100%",
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
              {data?.name}
            </h4>
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              {["Class A", "English Intermediate"].map((item, index) => (
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
                    fontSize: 12,
                  }}
                >
                  {item}
                </p>
              ))}
              <p
                style={{
                  fontWeight: 500,
                  padding: "3px 10px",
                  background: "white",
                  fontSize: 12,
                  color:
                    data?.performance == "Struggling"
                      ? "rgb(226, 109, 128)"
                      : data?.performance == "Doing Great"
                      ? "#5fc497"
                      : "#41b6ff",
                  border:
                    data?.performance == "Struggling"
                      ? "1px solid rgb(226, 109, 128)"
                      : data?.performance == "Doing Great"
                      ? "1px solid #5fc497"
                      : "1px solid #41b6ff",
                  maxWidth: "191px",
                  borderRadius: 12,
                  marginRight: 10,
                }}
              >
                {data?.performance}
              </p>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            margin: "10px",
          }}
        >
          <Box
            sx={{
              padding: "2px",
              background: "white",
              margin: "10px",
              flex: 1,
              borderRadius: 2,
            }}
          >
            <ExerciseResult id={id} />
          </Box>
          <Box
            sx={{
              padding: "2px",
              background: "white",
              margin: "10px",
              flex: 1,
              borderRadius: 2,
            }}
          >
            <WritingResult id={id} />
          </Box>
        </Box>
        {/* <Box
          sx={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: { xs: "column", sm: "row" },
            width: "100%",
            margin: "10px",
          }}
        >
          <Box
            sx={{
              padding: "15px",
              background: "white",
              margin: "10px",
              flex: 1,
              borderRadius: 2,
            }}
          >
            <BarChart dataProp={[100, 66, 77, 44, 100]} />
          </Box>
        </Box> */}
        <BackButton />
      </div>
    </Box>
  )
}

export default StudentProfile
