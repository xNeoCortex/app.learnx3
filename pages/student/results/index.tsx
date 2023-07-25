import * as React from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { Avatar, Button, IconButton, Typography } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import Link from "next/link"
import { useClassInfo, useStoreUser } from "@/components/zustand"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import { useQuery } from "@tanstack/react-query"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"

export default function StudentsResult() {
	const { classInfo } = useClassInfo()
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

	const studentList = data?.data.filter(({ uid }) => classInfo?.students?.includes(uid))

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
					<Box>
						{[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
							<Button
								key={item}
								onClick={() => setSelectedLesson(item)}
								style={{
									background: selectedLesson === item ? "#5f6ac4" : "white",
									color: selectedLesson !== item ? "#5f6ac4" : "white",
									border: "1px solid #5f6ac4",
									boxShadow: "none",
									padding: "5px 12px ",
									margin: "8px 8px 8px 0px",
									textTransform: "none",
								}}
							>
								Lesson {item}
							</Button>
						))}
					</Box>
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
										Vocabulary
									</TableCell>
									<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15, textAlign: "center" }}>
										Reading
									</TableCell>
									<TableCell style={{ color: "white", fontWeight: 600, fontSize: 15, textAlign: "center" }}>
										Profile
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{studentList?.length > 0 &&
									studentList
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
													style={{
														display: "flex",
														alignItems: "center",
													}}
												>
													<Avatar
														src={row?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
														sx={{
															width: 35,
															height: 35,
															border: "2px solid rgb(95, 106, 196)",
															marginRight: 1.5,
															bgcolor: "white",
														}}
													/>
													<p>{row.name}</p>
												</TableCell>
												<TableCell>
													<StudentResult
														testResults={testResult?.data}
														studentId={row.uid}
														assessmentType="vocabulary"
														selectedLesson={selectedLesson}
													/>
												</TableCell>
												<TableCell>
													<StudentResult
														testResults={testResult?.data}
														studentId={row.uid}
														assessmentType="reading"
														selectedLesson={selectedLesson}
													/>
												</TableCell>
												<TableCell sx={{ textAlign: "center" }}>
													<Link href={`/student/${row.uid}`}>
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

const StudentResult = React.memo(({ testResults, studentId, assessmentType, selectedLesson }: any) => {
	const testIds = {
		vocabulary: [
			"sQTFslvLMFV8AjkuJyYf",
			"Jn8ZRLWo876UrqsjKhLh",
			"C5ecvF6oa1VL89OD5SQr",
			"R0oi6K3UA0aaGb5SATMO",
			"yPxzGGTXKqQvmP5SnI5p",
		],
		reading: [
			"L5mRhi3DfjyRh2H8zFeh",
			"rvOHfoEiaR7hEDAgbzGw",
			"CZZZ32RIugyTxcxPD4pN",
			"hqdGxafPOGaKaLIgPUaR",
			"ULfB3AIxDFESajsH86v2",
		],
	}

	const gradeResult = testResults
		.filter(({ student_id }) => student_id === studentId)
		.filter(({ lesson_number }) => lesson_number === selectedLesson)
		.find(({ assessment_id }) => testIds[assessmentType].includes(assessment_id))?.result

	console.log("gradeResult :>> ", typeof gradeResult)
	return (
		<Typography
			sx={{
				background:
					Number(gradeResult) >= 70
						? "rgb(87, 204, 153)"
						: Number(gradeResult) >= 40
						? "#ffff3f"
						: Number(gradeResult) >= 0
						? "#ff595e"
						: "rgb(222, 226, 230)",
				p: 1,
				m: 0,
				borderRadius: "6px",
				textAlign: "center",
				fontSize: 14,
			}}
		>
			{typeof gradeResult === "number" || typeof gradeResult === "string" ? Math.round(+gradeResult) : "-"}
		</Typography>
	)
})
