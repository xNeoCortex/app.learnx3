import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Avatar, Button } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import { Link } from "react-router-dom"
import LoadingPage from "../LoadingPage"
import ApiServices from "../../../api/ApiServices"

export default function StudentList() {
  const [studentsList, setStudentsList] = React.useState([])
  const [loading, setLoading] = React.useState(false)
  const { fetchAllStudents } = ApiServices()

  React.useEffect(() => {
    fetchAllStudents(setLoading, setStudentsList)
  }, [])

  if (loading) return <LoadingPage />

  return (
    <Box sx={{ marginTop: "0px" }}>
      <TableContainer
        component={Paper}
        style={{
          margin: "10px",
          width: "calc(100%)",
          boxShadow: "none",
          maxHeight: "600px",
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
              <TableCell
                style={{ color: "white", fontWeight: 600, fontSize: 15 }}
                //
              >
                Student Name
              </TableCell>
              <TableCell
                style={{ color: "white", fontWeight: 600, fontSize: 15 }}
              >
                Performance
              </TableCell>
              <TableCell
                style={{ color: "white", fontWeight: 600, fontSize: 15 }}
              >
                Class
              </TableCell>
              <TableCell
                style={{ color: "white", fontWeight: 600, fontSize: 15 }}
              ></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsList?.length > 0 &&
              studentsList
                ?.sort((a, b) => {
                  if (a.name > b.name) return 1
                  if (a.name < b.name) return -1
                  return 0
                })
                ?.map((row, index) => (
                  <TableRow
                    key={row.docId}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      //
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Avatar
                        src="/pupil-avatar.png"
                        sx={{
                          width: 35,
                          height: 35,
                          border: "2px solid rgb(95, 106, 196)",
                          marginRight: 1.5,
                        }}
                      />
                      <p>{row.name}</p>
                    </TableCell>
                    <TableCell>
                      <p
                        style={{
                          fontWeight: 600,
                          padding: "3px 10px",
                          background: "white",
                          color:
                            row.performance == "Struggling"
                              ? "rgb(226, 109, 128)"
                              : row.performance == "Doing Great"
                              ? "#5fc497"
                              : "#41b6ff",
                          border:
                            row.performance == "Struggling"
                              ? "2px solid rgb(226, 109, 128)"
                              : row.performance == "Doing Great"
                              ? "2px solid #5fc497"
                              : "2px solid #41b6ff",
                          borderRadius: 12,
                          fontSize: "13px",
                          width: "100%",
                          maxWidth: "130px",
                          textAlign: "center",
                        }}
                      >
                        {row?.performance}
                      </p>
                    </TableCell>
                    <TableCell>Class A</TableCell>
                    <TableCell>
                      <Link to={`/student/${row.id}`} state={{ student: row }}>
                        <Button
                          style={{
                            background: "#5f6ac4",
                            color: "white",
                            boxShadow: "none",
                            padding: "0px",
                            textTransform: "none",
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
      </TableContainer>
    </Box>
  )
}
