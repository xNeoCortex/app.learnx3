import React from "react"
import { useQuery } from "react-query"
import Link from "next/link"
import {
	Avatar,
	Box,
	Button,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from "@mui/material"
import Paper from "@mui/material/Paper"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import { useStoreTemporary, useStoreUser } from "@/components/Zustand"

function GradeWritingList() {
	const { userInfo } = useStoreUser()
	const { sidebarWidth, classInfo } = useStoreTemporary()

	const { fetchEssayResults } = ApiServices()
	const { data, isLoading, isError } = useQuery("essayResult", fetchEssayResults)

	const notGraded = data?.data.filter((item) => item.result === null)

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<div
			style={{
				overflowY: "scroll",
				overflow: "hidden",
				width: `calc(100vw - ${sidebarWidth}px)`,
				marginTop: "40px",
			}}
		>
			<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }}>
				<h3
					style={{
						margin: 10,
						fontWeight: 600,
						fontSize: 19,
						color: "#5f616a",
					}}
				>
					Submitted essays
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
						{notGraded.length} essays to mark
					</Button>
				</h3>
			</Box>
			<div style={{ display: "flex", flexDirection: "column" }}>
				<Grid container>
					<Grid item xs={12}>
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
												style={{
													color: "white",
													fontWeight: 600,
													fontSize: 15,
												}}
												//
											>
												Student Name
											</TableCell>
											<TableCell
												style={{
													color: "white",
													fontWeight: 600,
													fontSize: 15,
												}}
											>
												Essay Topic
											</TableCell>
											<TableCell
												style={{
													color: "white",
													fontWeight: 600,
													fontSize: 15,
												}}
											>
												Class
											</TableCell>
											<TableCell
												style={{
													color: "white",
													fontWeight: 600,
													fontSize: 15,
												}}
											></TableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{notGraded.length > 0 &&
											notGraded
												.filter((item) => {
													if (userInfo.role === "teacher") {
														return classInfo?.students?.includes(item.student_id)
													} else if (userInfo.role === "admin") {
														return true
													} else {
														return null
													}
												})
												?.sort((a, b) => {
													if (a.name > b.name) return 1
													if (a.name < b.name) return -1
													return 0
												})
												?.map((row, index) => (
													<TableRow
														key={index}
														sx={{
															"&:last-child td, &:last-child th": { border: 0 },
														}}
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
															<p>{row.student_name}</p>
														</TableCell>
														<TableCell>
															<p
																style={{
																	fontWeight: 600,
																	padding: "3px 10px",
																	background: "white",
																	color: "#41b6ff",
																	border: "2px solid #41b6ff",
																	borderRadius: 12,
																	fontSize: "13px",
																	width: "fit-content",
																	textAlign: "center",
																}}
															>
																{row?.topic}
															</p>
														</TableCell>
														<TableCell>Class A</TableCell>
														<TableCell>
															<Link href={`/grade-writing/${row?.uid}`}>
																<Button
																	style={{
																		background: "#5f6ac4",
																		color: "white",
																		boxShadow: "none",
																		padding: "0px",
																		textTransform: "none",
																	}}
																>
																	Mark
																</Button>
															</Link>
														</TableCell>
													</TableRow>
												))}
									</TableBody>
								</Table>
							</TableContainer>
						</Box>
					</Grid>
				</Grid>
			</div>
		</div>
	)
}

export default GradeWritingList
