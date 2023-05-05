import {
  Box,
  Button,
  CardMedia,
  CssBaseline,
  Grid,
  Typography,
} from "@mui/material"
import React from "react"
import { Link } from "react-router-dom"
import { TestData } from "../../data/TestData"

function EnglishTest(props) {
  const uniqueTests = TestData.filter(
    (obj, index) =>
      TestData.findIndex((item) => item.topic_id === obj.topic_id) === index
  )

  return (
    <Box sx={{ marginTop: "20px", flexGrow: 1 }}>
      <CssBaseline />
      <h3
        style={{
          margin: 10,
          marginBottom: 20,
          fontWeight: 600,
          fontSize: 19,
          color: "#5f616a",
        }}
      >
        Multiple Choice Questions
      </h3>
      <Grid container spacing={2}>
        {uniqueTests.map((test, index) => (
          <Grid item xs={4} key={index}>
            <Box
              sx={{
                height: "100%",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                boxShadow:
                  "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
              }}
            >
              <CardMedia
                component="img"
                height="194"
                image="/test_imag.png"
                alt="test image"
              />

              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  justifyContent: "space-between",
                  padding: "10px 20px",
                  alignItems: "end",
                  fontSize: 14,
                  fontWeight: 600,
                  color: "rgb(50, 50, 93)",
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: "14px" }}>
                  {test?.topic.length < 40
                    ? test?.topic.split(" ")[0].slice(0, 1).toUpperCase() +
                      test?.topic.slice(1)
                    : test?.topic.split(" ")[0].slice(0, 1).toUpperCase() +
                      test?.topic.slice(1, 40) +
                      "..."}
                </Typography>
                <Link to={`/test/${test.topic_id}`}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{
                      background: "#0092e4",
                      boxShadow: "none",
                      fontWeight: 600,
                    }}
                  >
                    Start
                  </Button>
                </Link>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

export default EnglishTest
