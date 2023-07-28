import { auth } from "./firebaseX"
import { Alert, Box, Button, Grid, Typography } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import AccountMenu from "./auth/SignOut"
import { useClassInfo, useStoreUser } from "./zustand"
import AddClass from "./school/AddClassDialog"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/pages/api/ApiServices"

const Navbar = () => {
	const { classInfo } = useClassInfo()
	const { userInfo } = useStoreUser()
	const { fetchTestResults } = ApiServices()

	// get assessment result
	const { data: testResults, isLoading } = useQuery({
		queryKey: [`mySumTestResult}`],
		queryFn: () => fetchTestResults(String(userInfo?.uid)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	function getStudentTotalScore() {
		const totalScore = testResults?.data?.reduce((acc, curr) => acc + curr.result, 0)
		return Math.round(totalScore) ?? 0
	}

	return (
		<Box
			sx={{
				color: "white",
				maxWidth: "none",
				alignItems: "center",
				marginBottom: 5,
				display: { xs: "none", sm: "flex" },
				flexDirection: { xs: "column", sm: "row" },
				justifyContent: "space-between",
			}}
		>
			<Box display="flex" alignItems="center">
				<Typography fontWeight="bold" sx={{ color: "#32325d", fontSize: 24 }}>
					{auth?.currentUser ? "Hello, " + auth?.currentUser?.displayName + " 👋" : "Hello"}
				</Typography>
			</Box>
			<Box display="flex" alignItems="center">
				<Typography
					variant="body2"
					sx={{ color: "#32325d", textAlign: "center", width: "80px", borderRight: "1px solid #32325d" }}
				>
					{classInfo?.class_name}
				</Typography>
				<Typography
					variant="body2"
					sx={{ color: "#32325d", textAlign: "center", width: "80px", borderRight: "1px solid #32325d" }}
				>
					Level {Math.floor(getStudentTotalScore() / 400) + 1}
				</Typography>
				<Typography variant="body2" sx={{ color: "#32325d", textAlign: "center", width: "80px" }}>
					⭐️ {getStudentTotalScore()}
				</Typography>
				<Box style={{ display: "flex", flexDirection: "row" }}>
					<a target="_blank" rel="noreferrer" href={classInfo?.video_call_link}>
						<Button
							sx={{
								marginRight: "5px",
								textTransform: "none",
								background: "#5f61c4",
								color: "white",
								fontWeight: "600",
								padding: "3px 10px",
								"&:hover": { background: "#424493" },
							}}
						>
							<VideocamIcon
								sx={{
									color: "white",
									marginRight: "6px",
								}}
							/>
							<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Video Call</Typography>
						</Button>
					</a>
					{(userInfo?.role === "teacher" || userInfo?.role === "admin") && (
						<AddClass _class={classInfo} buttonName="Edit Class" />
					)}
					{!classInfo?.video_call_link && (
						<Alert severity="error" sx={{ p: 1, paddingY: "0px", fontSize: 14, marginLeft: "5px" }}>
							Please add video link
						</Alert>
					)}
				</Box>

				<AccountMenu />
			</Box>
		</Box>
	)
}

export default Navbar
