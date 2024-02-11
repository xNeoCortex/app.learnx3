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
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/pages/errorpage"
import { useQuery } from "@tanstack/react-query"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { UserType } from "@/types/types"

export default function StudentsResult() {
	const { apiRequest } = ApiServices()
	const [selectedLesson, setSelectedLesson] = React.useState(1)

	// fetch student data
	const { data, isLoading, isError } = useQuery({
		queryKey: ["students"],
		queryFn: () => apiRequest("GET", null, { collectionName: "students" }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	// fetch test data
	const {
		data: testResult,
		isLoading: isLoadingT,
		isError: isErrorT,
	} = useQuery({
		queryKey: ["testResult"],
		queryFn: () => apiRequest("GET", null, { collectionName: "testResult" }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const studentList = data?.data

	if (isLoading || isLoadingT) return <LoadingPage />
	if (isError || isErrorT) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher"]}>
			<SidebarContainer>
				<Box sx={{ marginTop: "0px" }}>
					<Typography
						style={{
							margin: "10px 10px 10px 0px",
							fontWeight: 600,
							fontSize: 19,
							color: "#5f616a",
						}}
					>
						Students Results
					</Typography>
					<TableContainer
						component={Paper}
						style={{
							margin: "10px 10px 10px 0px",
							width: "calc(100%)",
							boxShadow: "none",
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
									<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15 }}>
										Students ({studentList?.length})
									</TableCell>
									<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15, textAlign: "center" }}>
										# of Tests
									</TableCell>
									<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15, textAlign: "center" }}>
										Average grade
									</TableCell>
									<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15, textAlign: "center" }}>
										Points
									</TableCell>
									<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15, textAlign: "center" }}>
										Profile
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{studentList?.length > 0 &&
									studentList
										?.sort((a: UserType, b: UserType) => {
											if (a.name > b.name) return 1
											if (a.name < b.name) return -1
											return 0
										})
										?.map((student: UserType, index: number) => (
											<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
												<TableCell
													component="th"
													scope="student"
													style={{
														display: "flex",
														alignItems: "center",
													}}
												>
													<Avatar
														src={student?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
														sx={{
															width: 35,
															height: 35,
															border: "2px solid rgb(95, 106, 196)",
															marginRight: 1.5,
															bgcolor: "white",
														}}
													/>
													<p>{student.name}</p>
												</TableCell>
												<TableCell>
													<StudentResult
														testResults={testResult?.data}
														studentId={student.uid}
														assessmentType="numOfTests"
														selectedLesson={selectedLesson}
													/>
												</TableCell>
												<TableCell>
													<StudentResult
														testResults={testResult?.data}
														studentId={student.uid}
														assessmentType="averageGrade"
														selectedLesson={selectedLesson}
													/>
												</TableCell>
												<TableCell>
													<StudentResult
														testResults={testResult?.data}
														studentId={student.uid}
														assessmentType="points"
														selectedLesson={selectedLesson}
													/>
												</TableCell>
												<TableCell sx={{ textAlign: "center" }}>
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
											</TableRow>
										))}
							</TableBody>
						</Table>
					</TableContainer>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

const StudentResult = React.memo(({ testResults, studentId, assessmentType }: any) => {
	const testResultArray: number[] = testResults
		?.filter(({ student_id }: { student_id: string }) => student_id === studentId)
		?.map(({ result }: { result: number | string }) => result)

	const sumResult = testResultArray?.reduce((acc: number, curr: number) => acc + curr, 0)
	const averageGrade = sumResult / testResultArray?.length

	return (
		<Typography
			sx={{
				background:
					Number(assessmentType === "averageGrade" ? averageGrade : sumResult) >= 70
						? "rgb(87, 204, 153)"
						: Number(assessmentType === "averageGrade" ? averageGrade : sumResult) >= 40
						? "#ffff3f"
						: Number(assessmentType === "averageGrade" ? averageGrade : sumResult) >= 0
						? "#ff595e"
						: "rgb(222, 226, 230)",
				p: 1,
				m: 0,
				borderRadius: "6px",
				textAlign: "center",
				fontSize: 14,
			}}
		>
			{assessmentType === "averageGrade" && (averageGrade ? Math.round(+averageGrade) + " / 100" : "-")}
			{assessmentType === "points" && (sumResult ? Math.round(+sumResult) : "-")}
			{assessmentType === "numOfTests" && (testResultArray ? testResultArray?.length : "0")}
		</Typography>
	)
})
