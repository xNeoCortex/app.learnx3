import React from "react"
import { Box, capitalize, Typography } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { useStoreUser } from "../zustand"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import { TestResultType } from "@/types/types"

function MostRecentTestScore() {
	const { userInfo } = useStoreUser()
	const { fetchTestResults } = ApiServices()

	// get assessment result
	const { data: testResults } = useQuery({
		queryKey: [`myLatestTestResult`],
		queryFn: () => fetchTestResults(String(userInfo?.uid)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const mostRecentTestResult = React.useMemo(() => {
		const sortedResults = (testResults?.data || []).sort(
			(a: TestResultType, b: TestResultType) => b.createdAt?.localeCompare(a.createdAt) || 0
		)
		return sortedResults[0] || null
	}, [testResults?.data])

	return (
		<Box sx={BoxStyleWrapper}>
			<Box sx={{ marginRight: 4, marginLeft: 1 }}>
				<SchoolRoundedIcon
					sx={{
						width: "75px",
						height: "75px",
						color: "rgb(128 146 245)",
					}}
				/>
			</Box>
			<Box>
				<Typography sx={{ color: "#1d243d", mb: 1 }}>Your most recent test score </Typography>
				<Typography
					sx={{
						fontSize: { xs: 22, sm: 28 },
						fontWeight: 600,
						color: "#1d243d",
					}}
				>
					{mostRecentTestResult?.result ?? "No Test Result"}
					{mostRecentTestResult?.result !== undefined && <span style={{ fontSize: 15 }}>/100</span>}
				</Typography>
				{mostRecentTestResult?.topic && (
					<Typography variant="body2" sx={{ color: "#1d243d" }}>
						Topic: {capitalize(mostRecentTestResult?.topic)}
					</Typography>
				)}
			</Box>
		</Box>
	)
}

export default MostRecentTestScore

const BoxStyleWrapper = {
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	maxHeight: "250px",
	height: "100%",
	borderRadius: "8px",
	padding: "20px 10px",
	color: "white",
	display: "flex",
	justifyContent: "start",
	alignItems: "center",
	flexDirection: "row",
	background: "#e2e6fb4d",
	// "linear-gradient(270.54deg,rgba(6,189,196,.78) 33.14%,rgba(2,214,215,0) 57.93%),linear-gradient(104.19deg,rgba(37,1,83,0) 59.91%,#2f0388 77.15%),#454f9c",
}
