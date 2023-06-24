import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Avatar, Button, IconButton } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import Link from "next/link"
import SnackbarX from "../other/SnackbarX"
import DeleteComponent from "../DeleteComponent"
import { useStoreUser } from "../zustand"

export default function StudentList({ data }) {
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
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Students ({data?.length})</TableCell>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Performance</TableCell>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Profile</TableCell>
							{userInfo.role == "admin" && (
								<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>Delete</TableCell>
							)}{" "}
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
								?.map((row, index) => (
									<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
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
										<TableCell>
											<Link href={`/student/[id]`} as={`/student/${row.uid}`}>
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
													itemId={row?.uid}
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
}
