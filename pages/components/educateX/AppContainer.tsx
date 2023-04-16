import { Box } from "@mui/system"
import React from "react"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { CssBaseline, Grid } from "@mui/material"
import { Outlet } from "react-router-dom"
import Sidebar from "./Sidebar"
import Navbar from "./Navbar"

const theme = createTheme()

function AppContainer(props: any) {
  return (
    <Grid sx={{ width: "100%" }}>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            height: "100vh",
          }}
        >
          <Sidebar />
          <Box
            style={{
              background: "#5f6ac40a",
              padding: "20px",
              borderRadius: 5,
              maxWidth: "none",
              minHeight: "calc(100vh - 0px)",
              // margin: "5px 10px 10px 5px",
              width: "100%",
              overflowY: "scroll",
              overflowX: "hidden",
            }}
          >
            <Outlet />
          </Box>
        </Grid>
      </ThemeProvider>
    </Grid>
  )
}

export default AppContainer
