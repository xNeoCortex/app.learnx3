import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, Button } from "@mui/material"
import { Link } from "react-router-dom"
import ExplainAI from "../ExplainAI"
import { BarChart } from "../Components/BarChart"
import LoadingPage from "../Components/LoadingPage"
import ErrorPage from "../Components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "react-query"

export default function WritingResult({ id }) {
  const { fetchEssayResults } = ApiServices()
  const {
    data: writingResult,
    isLoading,
    isError,
  } = useQuery("essayResult", fetchEssayResults, {
    select: (data) => {
      const filteredEssays = data?.data.filter((item) => item.student_id === id)
      if (filteredEssays.length > 0) {
        return filteredEssays
      } else {
        return []
      }
    },
  })

  // Title
  const title = ["Topic", "Writing Mark", "Feedback "]

  // Student performance data for AI
  const studentPerformance = writingResult?.map(
    (item) =>
      `{Student scored + ${item.result} out of 100 in ${item.topic}} in essay exam`
  )

  const studentResult = writingResult?.map((item) => item.result)
  const writingTopics = writingResult?.map((item) => item.topic)

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

  return (
    <Box sx={{ marginTop: "0px", display: "flex", padding: 0 }}>
      <TableContainer
        component={Paper}
        style={{
          margin: "10px",
          width: "calc(100%)",
          boxShadow: "none",
          // maxHeight: "600px",
        }}
      >
        <CssBaseline />
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              style={{
                background: "rgb(95, 106, 196)",
                borderRadius: 12,
                color: "white",
              }}
            >
              {title.map((item, index) => (
                <TableCell
                  key={index}
                  style={{
                    color: "white",
                    fontWeight: 600,
                    fontSize: 15,
                    margin: "auto",
                    textAlign: "center",
                  }}
                  //
                >
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {writingResult?.length > 0 &&
              writingResult?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    style={{ padding: 10, height: 63, textAlign: "center" }}
                  >
                    {row.topic}
                  </TableCell>
                  <TableCell
                    style={{
                      padding: 10,
                      height: 63,
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 600,
                        padding: "3px 10px",
                        background: "white",
                        color:
                          +row?.result <= 50
                            ? "rgb(226, 109, 128)"
                            : +row?.result <= 70
                            ? "#5fc497"
                            : "#41b6ff",
                        border:
                          +row?.result <= 50
                            ? "2px solid rgb(226, 109, 128)"
                            : +row?.result <= 70
                            ? "2px solid #5fc497"
                            : "2px solid #41b6ff",
                        borderRadius: 12,
                        fontSize: "13px",
                        width: "100%",
                        maxWidth: "70px",
                        textAlign: "center",
                        margin: "auto",
                      }}
                    >
                      {row?.result !== null ? +row?.result : "N/A"}
                    </p>
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    //
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      height: 63,
                      textAlign: "center",
                    }}
                  >
                    <Link to={`/grade-writing/${row?.docId}`}>
                      <Button
                        variant="contained"
                        size="small"
                        sx={{
                          background: "rgb(95, 106, 196)",
                          fontWeight: 600,
                        }}
                      >
                        View
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <Box
          sx={{
            padding: "15px",
            margin: "10px",
            marginTop: "50px",
            flex: 1,
            borderRadius: 2,
            background: "rgba(95, 106, 196, 0.03)",
          }}
        >
          <BarChart dataProp={studentResult} labelsProp={writingTopics} />
        </Box>
        <Box sx={{ mt: 3 }}>
          <ExplainAI
            prompt={`Explain how the student performed on his english essays based on the following data ${studentPerformance}. Suggest on which topic he should focus to improve his weakness and how to improve it.`}
            buttonTitle="Explain me data"
            bg="white"
          />
        </Box>
      </TableContainer>
    </Box>
  )
}
