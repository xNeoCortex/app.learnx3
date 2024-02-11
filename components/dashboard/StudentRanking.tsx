import React, { useCallback } from "react"
import ErrorPage from "@/pages/errorpage"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { Box, Avatar, Typography } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import LoadingPage from "../LoadingPage"
import { TestResultType, UserType } from "@/types/types"

function StudentRanking() {
	const { apiRequest } = ApiServices()
	const {
		data: testResults,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["testResult"],
		queryFn: () => apiRequest("GET", null, { collectionName: "testResult" }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const {
		data: students,
		isLoading: isLoadingStudents,
		isError: isErrorStudents,
	} = useQuery({
		queryKey: ["students"],
		queryFn: () => apiRequest("GET", null, { collectionName: "students" }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const getStudentTotalScore = useCallback(
		(studentId: string) => {
			const studentTestResults = testResults?.data?.filter(
				({ student_id }: { student_id: string }) => student_id === studentId
			)
			const totalScore = studentTestResults?.reduce((acc: number, curr: TestResultType) => acc + curr.result, 0)
			return Math.round(totalScore)
		},
		[testResults?.data]
	)

	const sortStudentsByPerformance = useCallback(
		(students: UserType[]) => {
			const sortedStudents = students?.sort((a, b) => {
				if (getStudentTotalScore(a.uid) > getStudentTotalScore(b.uid)) return -1
				if (getStudentTotalScore(a.uid) < getStudentTotalScore(b.uid)) return 1
				return 0
			})
			return sortedStudents.map((student) => {
				return {
					...student,
					score: getStudentTotalScore(student.uid),
				}
			})
		},
		[getStudentTotalScore, students]
	)

	if (isLoadingStudents || isLoading) return <LoadingPage />
	if (isErrorStudents || isError) return <ErrorPage />

	return (
		<Box sx={BoxWrapperStyle}>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							sx={{
								background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
								borderRadius: "12px",
								color: "white",
							}}
						>
							<TableCell sx={{ color: "white", fontWeight: "600", fontSize: "16px" }}>
								Student Leaderboard ({students?.data?.length})
							</TableCell>
							<TableCell sx={{ color: "white", fontWeight: "600", fontSize: "16px" }}>🏆 Points</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{students?.data?.length > 0 &&
							sortStudentsByPerformance(students?.data)?.map(
								(
									student: UserType & {
										score: number
									},
									index
								) => (
									<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
										<TableCell
											component="th"
											scope="row"
											sx={{
												display: "flex",
												alignItems: "center",
												borderBottom: "none",
											}}
										>
											<Typography sx={{ mr: 1 }} variant="body2">
												{index + 1}
											</Typography>
											<Avatar
												src={student?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
												sx={AvatarStyle}
											/>
											<Typography sx={{ mr: 1, fontSize: "14px" }}>{student.name} </Typography>
											{index === 0 && <span> 👑</span>}
										</TableCell>
										<TableCell sx={{ borderBottom: "none" }}>
											<Typography sx={TextStyle}>⭐️ {student.score}</Typography>
										</TableCell>
									</TableRow>
								)
							)}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default StudentRanking

const TextStyle = {
	color: "#1d243d",
	padding: "0px",
	borderRadius: "12px",
	fontSize: "15px",
	width: "100%",
	maxWidth: "130px",
	textAlign: "start",
}

const AvatarStyle = {
	width: 30,
	height: 30,
	border: "2px solid rgb(95, 106, 196)",
	marginRight: 1.5,
	bgcolor: "white",
}

const BoxWrapperStyle = {
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	maxHeight: { xs: "245px", sm: "450px" },
	width: "100%",
	margin: "0px 10px 10px 0px",
	borderRadius: "8px",
	overflow: "scroll",
	position: "relative",
	background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
}
