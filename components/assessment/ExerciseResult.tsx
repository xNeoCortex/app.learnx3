import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CssBaseline from "@mui/material/CssBaseline"
import { Box } from "@mui/material"
import { BarChart } from "../other/BarChart"
import ErrorPage from "../ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import ExplainAI from "../ExplainAI"
import { useQuery } from "@tanstack/react-query"
import LoadingPage from "@/components/LoadingPage"

export default function ExerciseResult({ id }) {
	const { fetchTestResult } = ApiServices()
	const { data: testResult, isLoading, isError } = useQuery(["testResult"], () => fetchTestResult(id))

	// Titles
	const title = ["Test", "Topic", "Test Score"]

	// Student performance data for AI
	const studentPerformance = testResult?.data.map(
		(item) => `{Student scored + ${item.result} out of 100 in ${item.topic}}`
	)

	// Student performance data for AI
	const studentResult = testResult?.data.map((item) => item.result)
	const testTopics = testResult?.data.map((item) => item.topic)

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box sx={{ marginTop: "0px", display: "flex", padding: 0 }}>
			<TableContainer
				component={Paper}
				style={{
					margin: "10px",
					width: "calc(100%)",
					boxShadow: "none",
					// maxHeight: "600px",
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
							{title.map((item, index) => (
								<TableCell
									key={index}
									style={{
										color: "white",
										fontWeight: 600,
										fontSize: 15,
										margin: "auto",
										textAlign: "center",
									}}
									//
								>
									{item}
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{testResult?.data.length > 0 &&
							testResult?.data
								.sort((a, b) => {
									if (a.lessonName > b.lessonName) return 1
									if (a.lessonName < b.lessonName) return -1
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
												padding: 10,
												height: 63,
												textAlign: "center",
											}}
										>
											<p style={{ margin: "auto" }}>Test {index + 1}</p>
										</TableCell>
										<TableCell style={{ padding: 10, height: 63, textAlign: "center" }}>{row.topic}</TableCell>
										<TableCell
											style={{
												padding: 10,
												height: 63,
											}}
										>
											<p
												style={{
													fontWeight: 600,
													padding: "3px 10px",
													background: "white",
													color: row.result <= 50 ? "rgb(226, 109, 128)" : row.result <= 70 ? "#5fc497" : "#41b6ff",
													border:
														row.result <= 50
															? "2px solid rgb(226, 109, 128)"
															: row.result <= 70
															? "2px solid #5fc497"
															: "2px solid #41b6ff",
													borderRadius: 12,
													fontSize: "13px",
													width: "100%",
													maxWidth: "70px",
													textAlign: "center",
													margin: "auto",
												}}
											>
												{row?.result !== null ? Math.round(row?.result) : "N/A"}
											</p>
										</TableCell>
									</TableRow>
								))}
					</TableBody>
				</Table>
				<Box
					sx={{
						padding: "15px",
						background: "rgba(95, 106, 196, 0.03)",
						margin: "10px",
						marginTop: "50px",
						flex: 1,
						borderRadius: 2,
					}}
				>
					<BarChart dataProp={studentResult} labelsProp={testTopics} />
				</Box>
				<Box sx={{ mt: 3 }}>
					<ExplainAI
						prompt={`Explain how the student performed on his english tests based on the following data ${studentPerformance}. Suggest on which topic he should focus to improve his weakness and how to improve it.`}
						buttonTitle="Explain me data"
						bg="white"
					/>
				</Box>
			</TableContainer>
		</Box>
	)
}
