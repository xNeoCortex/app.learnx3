import React from "react"
import ErrorPage from "@/components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { Box, Button, Avatar, Typography } from "@mui/material"
import Link from "next/link"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import LoadingPage from "../LoadingPage"

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

	function getStudentTotalScore(studentId) {
		const studentTestResults = testResults?.data?.filter(({ student_id }) => student_id === studentId)
		const totalScore = studentTestResults?.reduce((acc, curr) => acc + curr.result, 0)
		return Math.round(totalScore)
	}

	function sortStudentsByPerformance(students) {
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
	}

	if (isLoadingStudents || isLoading) return <LoadingPage />
	if (isErrorStudents || isError) return <ErrorPage />

	return (
		<Box
			sx={{
				boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
				maxHeight: { xs: "245px", sm: "450px" },
				height: "100%",
				width: "100%",
				margin: "0px 10px 10px 0px",
				borderRadius: "8px",
				overflow: "scroll",
				position: "relative",
				background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
			}}
		>
			<TableContainer component={Paper}>
				<Table aria-label="simple table">
					<TableHead>
						<TableRow
							style={{
								background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
								borderRadius: 12,
								color: "white",
							}}
						>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 16 }}>Student Leaderboard</TableCell>
							<TableCell style={{ color: "white", fontWeight: 600, fontSize: 16 }}>🏆 Points</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{students?.data?.length > 0 &&
							sortStudentsByPerformance(students?.data)?.map((row, index) => (
								<TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
									<TableCell
										component="th"
										scope="row"
										style={{
											display: "flex",
											alignItems: "center",
											borderBottom: "none",
										}}
									>
										<Typography sx={{ mr: 1 }} variant="body2">
											{index + 1}
										</Typography>
										<Avatar
											src={row?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
											sx={{
												width: 30,
												height: 30,
												border: "2px solid rgb(95, 106, 196)",
												marginRight: 1.5,
												bgcolor: "white",
											}}
										/>
										<Typography sx={{ mr: 1, fontSize: "15px" }}>{row.name} </Typography>
										{index === 0 && <span> 👑</span>}
									</TableCell>
									<TableCell sx={{ borderBottom: "none" }}>
										<p
											style={{
												// fontWeight: 600,
												color: "#1d243d",
												padding: "0px",
												borderRadius: 12,
												fontSize: 15,
												width: "100%",
												maxWidth: "130px",
												textAlign: "start",
											}}
										>
											⭐️ {row.score}
										</p>
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}

export default StudentRanking
