import React, { useCallback } from "react"
import ErrorPage from "@/errorpage"
import ApiServices from "@/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { Box, Skeleton, Typography } from "@mui/material"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import LoadingPage from "../LoadingPage"
import { TestResultType, UserType } from "@/types/types"
import CustomAvatar from "../elements/CustomAvatar"
import { brandColors } from "../utils/brandColors"

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

	if (isErrorStudents || isError) return <ErrorPage />

	return (
		<Box
			//@ts-ignore
			sx={BoxWrapperStyle}
		>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							sx={{
								background: brandColors.lighterGrey,
							}}
						>
							<TableCell
								sx={{
									color: brandColors.black,
									fontWeight: "600",
									fontSize: "16px",
									borderBottom: "0.2px solid white",
								}}
							>
								Student Leaderboard (Top 10)
							</TableCell>
							<TableCell
								sx={{
									color: brandColors.black,
									fontWeight: "600",
									fontSize: "16px",
									borderBottom: "0.2px solid white",
								}}
							>
								🏆 Points
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{isLoadingStudents || isLoading ? (
							<Box sx={{ display: "flex", flexDirection: "column", margin: "10px", width: "100%" }}>
								{[1, 2, 3, 4, 5].map((item) => (
									<Skeleton key={item} variant="rounded" sx={{ height: "70px", margin: "5px" }} />
								))}
							</Box>
						) : (
							students?.data?.length > 0 &&
							sortStudentsByPerformance(students?.data)
								?.slice(0, 10)
								?.map(
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
												<CustomAvatar
													gender={student?.gender}
													image={student?.image}
													style={{ marginRight: 1.5, width: "30px", height: "30px" }}
												/>
												<Typography sx={{ mr: 1, fontSize: "14px" }}>{student.name} </Typography>
												{index === 0 && <span> 👑</span>}
											</TableCell>
											<TableCell sx={{ borderBottom: "none" }}>
												<Typography sx={TextStyle}>⭐️ {student.score}</Typography>
											</TableCell>
										</TableRow>
									)
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

const BoxWrapperStyle = {
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	maxHeight: { xs: "245px", sm: "428px" },
	width: "100%",
	margin: "0px 10px 10px 0px",
	borderRadius: "8px",
	overflow: "scroll",
	position: "relative",
	background: "white",
}
