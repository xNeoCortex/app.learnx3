import { Box, Button, Grid } from "@mui/material"
import React, { useEffect } from "react"
import { useLocation } from "react-router-dom"
import { studentData } from "../../../data/Data"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import { useStoreTemporary } from "../../../zustand"
import StudentCard from "./Student/StudentCard"
import StudentList from "./StudentList"
import TableRowsIcon from "@mui/icons-material/TableRows"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ApiServices from "../../../api/ApiServices"

function ClassStudents() {
  const { sidebarWidth } = useStoreTemporary()
  const [alignment, setAlignment] = React.useState("grid")
  const location = useLocation()
  const [studentsList, setStudentsList] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  const { fetchAllStudents } = ApiServices()

  React.useEffect(() => {
    fetchAllStudents(setLoading, setStudentsList)
  }, [])

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment)
  }

  useEffect(() => {
    location.pathname.includes("class-students")
      ? setAlignment("row")
      : setAlignment("grid")
  }, [])

  return (
    <div
      style={{
        overflowY: "scroll",
        overflow: "hidden",
        width: `calc(100vw - ${sidebarWidth}px)`,
        marginTop: "40px",
      }}
    >
      <Box
        sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }}
      >
        <h3
          style={{
            margin: 10,
            fontWeight: 600,
            fontSize: 19,
            color: "#5f616a",
          }}
        >
          Class Students
          <Button
            style={{
              background: "#5f6ac4",
              color: "white",
              boxShadow: "none",
              padding: "1px 10px 0px",
              marginLeft: "10px",
              fontWeight: 600,
            }}
          >
            {studentData.length} Students
          </Button>
        </h3>
        <ToggleButtonGroup
          color="primary"
          value={alignment}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          <ToggleButton value="row" style={{ padding: "0px 5px", height: 35 }}>
            <TableRowsIcon />
          </ToggleButton>
          <ToggleButton value="grid" style={{ padding: "0px 5px", height: 35 }}>
            <ViewModuleIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      {alignment == "grid" ? (
        <div
          style={{
            display: "flex",
            flexWrap: "nowrap",
            overflowX: "scroll",
            marginBottom: 45,
            marginLeft: "10px",
          }}
        >
          {studentsList?.map((item, index) => (
            <div key={index}>
              <StudentCard details={item} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Grid container>
            <Grid item xs={12}>
              <StudentList />
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  )
}

export default ClassStudents
