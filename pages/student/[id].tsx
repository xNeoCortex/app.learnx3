import { Avatar, Box, Grid } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/pages/errorpage"
import TestResult from "../../components/assessment/TestResult"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"

function StudentProfile() {
	const {
		query: { id },
	} = useRouter()
	const { fetchStudentData } = ApiServices()
	const { data, isLoading, isError } = useQuery({
		queryKey: [`student-${id}`, String(id)],
		queryFn: () => fetchStudentData(String(id)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})
	if (isLoading)
		return (
			<Box sx={{ height: "100vh", width: "100vw", display: "flex", justifyContent: "center", alignItems: "center" }}>
				<LoadingPage />
			</Box>
		)
	if (isError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<div
					style={{
						padding: "20px ",
						borderRadius: 23,
						color: "white",
						height: "100%",
						display: "flex",
						justifyContent: "start",
						alignItems: "center",
						flexDirection: "column",
						background: "rgb(224, 225, 241)",
						boxSizing: "border-box",
						width: "100%",
						overflow: "auto",
					}}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box
								sx={{
									display: "flex",
									alignItems: "left",
									justifyContent: "start",
									width: "100%",
									padding: "5px",
									marginBottom: 1,
								}}
							>
								<Avatar
									src={data?.data?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
									sx={{ bgcolor: "white", width: 100, height: 100 }}
								/>
								<Box
									display="flex"
									alignItems="center"
									flexDirection="column"
									sx={{
										display: "flex",
										width: "100%",
										justifyContent: "center",
										alignItems: "flexStart",
										padding: "0px 30px",
									}}
								>
									<h4
										style={{
											color: "#323331",
											fontWeight: 600,
											fontSize: 18,
											padding: 0,
											marginBottom: 15,
										}}
									>
										{data?.data.name}
									</h4>
									<Box
										sx={{
											display: "flex",
											justifyContent: "start",
											alignItems: "center",
											flexWrap: "wrap",
										}}
									>
										{data?.data?.age && (
											<p
												style={{
													fontWeight: 500,
													padding: "3px 10px",
													background: "white",
													color: "rgb(50, 50, 93)",
													border: "1px solid rgb(50, 50, 93)",
													maxWidth: "191px",
													borderRadius: 12,
													marginRight: 10,
													fontSize: 12,
													marginBottom: 10,
												}}
											>
												{data?.data?.age} years old
											</p>
										)}
										{[data?.data?.country || "country unknown", data?.data?.email].map((item, index) => (
											<p
												key={index}
												style={{
													fontWeight: 500,
													padding: "3px 10px",
													background: "white",
													color: "rgb(50, 50, 93)",
													border: "1px solid rgb(50, 50, 93)",
													maxWidth: "191px",
													borderRadius: 12,
													marginRight: 10,
													fontSize: 12,
													marginBottom: 10,
												}}
											>
												{item}
											</p>
										))}
										<p
											style={{
												fontWeight: 500,
												padding: "3px 10px",
												background: "white",
												fontSize: 12,
												color:
													data?.data.performance == "Struggling"
														? "rgb(226, 109, 128)"
														: data?.data.performance == "Doing Great"
														? "#5fc497"
														: "#41b6ff",
												border:
													data?.data.performance == "Struggling"
														? "1px solid rgb(226, 109, 128)"
														: data?.data.performance == "Doing Great"
														? "1px solid #5fc497"
														: "1px solid #41b6ff",
												maxWidth: "191px",
												borderRadius: 12,
												marginRight: 10,
												marginBottom: 10,
											}}
										>
											{data?.data.performance}
										</p>
									</Box>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12}>
							<TestResult id={id as string} />
						</Grid>
						{/* <Box
								sx={{
									display: "flex",
									alignItems: "start",
									justifyContent: "center",
									flexDirection: { xs: "column", sm: "row" },
									width: "100%",
									margin: "10px",
								}}
								>
								<Box
									sx={{
									padding: "15px",
									background: "white",
									margin: "10px",
									flex: 1,
									borderRadius: 2,
									}}
								>
									<BarChart dataProp={[100, 66, 77, 44, 100]} />
								</Box>
							</Box> */}
					</Grid>
				</div>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default StudentProfile
