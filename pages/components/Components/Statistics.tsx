import { Box, Grid } from "@mui/material"
import GppBadIcon from "@mui/icons-material/GppBad"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import { DoughnutChart } from "./DoughnutChart"
import { BarChart } from "./BarChart"
import ExplainAI from "../ExplainAI"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import { useLocation } from "react-router"
import LoadingPage from "./LoadingPage"
import ErrorPage from "./ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "react-query"

function Statistics({ displayGraphs }) {
  const location = useLocation()

  // find another solution -> no need to fetch all database just to see the length of students array
  const { fetchAllStudents } = ApiServices()
  const { data, isLoading, isError } = useQuery(["students"], fetchAllStudents)

  // Data to display
  const dataSet = [
    {
      name: "# of Students",
      color: "#e2e6fb4d",
      number: data?.data.length,
      icon: (
        <SchoolRoundedIcon
          style={{ width: 50, height: 50, color: "rgb(95, 97, 196)" }}
        />
      ),
    },
    {
      name: "Struggling",
      color: "rgb(255 139 79 / 7%)",
      number: 3,
      icon: <GppBadIcon style={{ width: 50, height: 50, color: "#ff8b4f" }} />,
    },
    {
      name: "Doing Well",
      color: "rgb(65 182 255 / 8%)",
      number: 2,
      icon: (
        <SkipPreviousIcon style={{ width: 50, height: 50, color: "#41b6ff" }} />
      ),
    },
    {
      name: "Doing Great",
      color: "rgb(94 196 151 / 8%)",
      number: 2,
      icon: (
        <ThumbUpAltIcon style={{ width: 50, height: 50, color: "#5fc497" }} />
      ),
    },
  ]
  const studentPerformance = dataSet.map(
    (item) => item.name + "=" + item.number
  )

  if (isLoading) return <LoadingPage />
  if (isError) return <ErrorPage />

  return (
    <Box sx={{ marginTop: "20px" }}>
      <h3
        style={{
          margin: 10,
          marginBottom: 20,
          fontWeight: 600,
          fontSize: 19,
          color: "#5f616a",
        }}
      >
        Class Statistics
      </h3>
      {location.pathname.includes("class-statistics") && (
        <Box
          sx={{
            display: "flex",
            marginLeft: "9px",
            marginBottom: "15px",
          }}
        >
          <ExplainAI
            prompt={`Explain how students in Class A performed on their english tests based on the following data ${studentPerformance}. Suggest on which topic a teacher should focus to help student improve their weakness.`}
            buttonTitle="Explain me data"
            bg="white"
          />
        </Box>
      )}

      <div
        style={{
          display: "flex",
          width: "calc(100% - 10px)",
        }}
      >
        {dataSet.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "20px 10px",
              //   width: 300,
              flex: 1,
              marginRight: 20,
              marginLeft: 10,
              color: "white",
              height: 100,
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
              flexDirection: "row",
              borderRadius: 10,
              boxShadow:
                "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
              background: item.color,
            }}
          >
            <Box sx={{ marginRight: 2, marginLeft: 1 }}>{item.icon}</Box>
            <div>
              <h2
                style={{
                  fontWeight: 600,
                  fontSize: 22,
                  color: "rgb(50, 51, 49)",
                }}
              >
                {item.number}
              </h2>
              <p style={{ fontSize: 15, color: "rgba(50, 51, 49, 0.8)" }}>
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
      {displayGraphs && (
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              padding: 10,
              margin: "40px 0px 30px",
            }}
          >
            <Box
              style={{
                margin: "auto",
                borderRadius: 10,
                padding: 45,
                boxShadow:
                  "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
              }}
            >
              <DoughnutChart dataClass={dataSet} />
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            style={{
              margin: "40px 0px 30px",
              padding: 10,
            }}
          >
            <Box
              style={{
                margin: "auto",
                display: "flex",
                alignItems: "center",
                height: "100%",
                width: "100%",
                padding: 15,
                borderRadius: 10,
                boxShadow:
                  "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
              }}
            >
              <BarChart
                dataProp={[10, 20, 40]}
                labelsProp={["Lesson 1", "Lesson 2", "Lesson 3"]}
              />
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  )
}

export default Statistics
