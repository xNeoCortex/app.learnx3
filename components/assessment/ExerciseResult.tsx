import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import CssBaseline from "@mui/material/CssBaseline"
import { Box, capitalize, Grid } from "@mui/material"
import { BarChart } from "../other/BarChart"
import ErrorPage from "../../pages/errorpage"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import LoadingPage from "@/components/LoadingPage"
import { TestResultType } from "@/types/types"

export default function ExerciseResult({ id }: { id: string }) {
	const { fetchTestResults } = ApiServices()
	const {
		data: testResult,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [`testResult-${id}`],
		queryFn: () => fetchTestResults(id),
		refetchOnWindowFocus: false,
	})

	// Titles
	const title = ["Test", "Topic", "Test Score"]

	// Student performance data for Charts
	const studentResult = testResult?.data.map((item: TestResultType) => item.result)
	const testTopics = testResult?.data.map((item: TestResultType) => item.topic.slice(0, 15) + "...")

	console.log("testResult?.data :>> ", testResult?.data)
	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Grid container spacing={2} sx={{ marginTop: "0px", display: "flex", padding: 0 }}>
			<Grid item xs={12} sm={6}>
				<TableContainer
					component={Paper}
					style={{
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
									.sort((a: TestResultType, b: TestResultType) => {
										if (a.createdAt > b.createdAt) return 1
										if (a.createdAt < b.createdAt) return -1
										return 0
									})
									?.map((row: TestResultType, index: number) => (
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
											<TableCell style={{ padding: 10, height: 63, textAlign: "center" }}>
												{capitalize(row.topic)}
											</TableCell>
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
				</TableContainer>
			</Grid>
			<Grid item xs={12} sm={6}>
				<Box
					sx={{
						padding: "15px",
						background: "white",
						flex: 1,
						borderRadius: 2,
					}}
				>
					<BarChart dataProp={studentResult} labelsProp={testTopics} />
				</Box>
			</Grid>
		</Grid>
	)
}
