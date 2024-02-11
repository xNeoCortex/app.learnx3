import { auth } from "./firebaseX"
import { Alert, Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"
import AccountMenu from "./auth/SignOut"
import { useClassInfo, useStoreUser } from "./zustand"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/pages/api/ApiServices"
import { TestResultType } from "@/types/types"

const Navbar = () => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
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
		const totalScore = testResults?.data?.reduce((acc: number, curr: TestResultType) => acc + Number(curr.result), 0)
		return Math.round(totalScore) ?? 0
	}

	return (
		<Box
			sx={{
				color: "white",
				maxWidth: "none",
				alignItems: "center",
				marginBottom: { xs: 3, sm: 5 },
				display: { xs: "flex", sm: "flex" },
				flexDirection: { xs: "column", sm: "row" },
				justifyContent: "space-between",
			}}
		>
			<Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
				<Box display="flex" alignItems="center">
					<Typography
						fontWeight="bold"
						noWrap
						sx={{ margin: "0px 2px", color: "#32325d", fontSize: { xs: 20, sm: 24 }, maxWidth: { xs: 200, sm: 400 } }}
					>
						{auth?.currentUser ? "Hello, " + auth?.currentUser?.displayName + " 👋" : "Hello"}
					</Typography>
				</Box>
				<Box display="flex" alignItems="center">
					<Box display="flex" alignItems="center" justifyContent="start" width="100%">
						<Typography
							variant="body2"
							sx={{
								fontSize: 12,
								color: "#32325d",
								textAlign: "center",
								border: "1px solid #32325d",
								borderRadius: "12px",
								padding: "1px 12px",
								width: "fit-content",
								margin: "5px 4px 5px 2px",
							}}
						>
							Level {Math.floor(getStudentTotalScore() / 400) + 1}
						</Typography>
						<Typography
							variant="body2"
							sx={{
								fontSize: 12,
								color: "#32325d",
								textAlign: "center",
								border: "1px solid #32325d",
								borderRadius: "12px",
								padding: "1px 12px",
								width: "fit-content",
								margin: "5px 4px 5px 2px",
							}}
						>
							⭐️ {getStudentTotalScore()}
						</Typography>
					</Box>

					<AccountMenu isSmallScreen={isSmallScreen} />
				</Box>
			</Box>
		</Box>
	)
}

export default Navbar
