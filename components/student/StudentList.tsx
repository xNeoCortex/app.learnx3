import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Avatar, Button, Typography } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import Link from "next/link"
import DeleteComponent from "../DeleteComponent"
import { useStoreUser } from "../zustand"
import { UserType } from "@/types/types"
import { SnackbarX } from "../other/SnackbarX"
import CustomAvatar from "../elements/CustomAvatar"

const StudentList = React.memo(({ data }: { data: UserType[] }) => {
	const [open, setOpen] = React.useState(false)
	const { userInfo } = useStoreUser()

	return (
		<Box sx={{ marginTop: "0px" }}>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message="Student has been successfully deleted!"
			/>

			<TableContainer component={Paper} sx={TableContainerStyle}>
				<CssBaseline />
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							sx={{
								background: "rgb(95, 106, 196)",
								borderRadius: "12px",
								color: "white",
							}}
						>
							<TableCell sx={TableCellStyle}>Students ({data?.length})</TableCell>
							<TableCell sx={TableCellStyle}>Performance</TableCell>
							<TableCell sx={TableCellStyle}>Profile</TableCell>
							{userInfo.role == "admin" && <TableCell sx={TableCellStyle}>Delete</TableCell>}{" "}
						</TableRow>
					</TableHead>
					<TableBody>
						{data?.length > 0 &&
							data
								?.sort((a, b) => {
									if (a.name > b.name) return 1
									if (a.name < b.name) return -1
									return 0
								})
								?.map((student, index) => (
									<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell
											component="th"
											scope="student"
											style={{
												display: "flex",
												alignItems: "center",
											}}
										>
											<CustomAvatar
												image={student?.image}
												gender={student?.gender}
												style={{ width: "35px", height: "35px", marginRight: 1.5 }}
											/>

											<p>{student.name}</p>
										</TableCell>
										<TableCell>
											<Typography
												style={{
													fontWeight: "600",
													padding: "3px 10px",
													background: "white",
													color:
														student.performance == "Struggling"
															? "rgb(226, 109, 128)"
															: student.performance == "Doing Great"
															? "#5fc497"
															: "#41b6ff",
													border:
														student.performance == "Struggling"
															? "2px solid rgb(226, 109, 128)"
															: student.performance == "Doing Great"
															? "2px solid #5fc497"
															: "2px solid #41b6ff",
													borderRadius: "12px",
													fontSize: "13px",
													width: "100%",
													maxWidth: "130px",
													textAlign: "center",
												}}
											>
												{student?.performance}
											</Typography>
										</TableCell>
										<TableCell>
											<Link href={`/student/${student.uid}`}>
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
										{userInfo.role == "admin" && (
											<TableCell>
												<DeleteComponent
													collectionName="students"
													invalidateCache="students"
													itemId={student?.uid}
													setOpen={setOpen}
												/>
											</TableCell>
										)}
									</TableRow>
								))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
})

export default StudentList

const TableCellStyle = { color: "white", fontWeight: "600", fontSize: "15px" }

const TableContainerStyle = {
	margin: "10px 10px 10px 0px",
	width: "100%",
	boxShadow: "none",
	maxHeight: "600px",
}
