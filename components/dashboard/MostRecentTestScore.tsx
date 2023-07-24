import React from "react"
import { Box, Typography } from "@mui/material"
import { WordOfTheDayData } from "../data/WordOfTheDayData"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { useStoreUser } from "../zustand"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"

function MostRecentTestScore() {
	const { userInfo } = useStoreUser()
	const { fetchTestResults } = ApiServices()

	// get assessment result
	const { data: testResults, isLoading } = useQuery({
		queryKey: [`myTestResult`],
		queryFn: () => fetchTestResults(String(userInfo?.uid)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
	})

	const mostRecentResult = testResults?.data?.find((item) => item?.createdAt ?? item)
	const mostRecentResultWithDate =
		testResults?.data?.filter((item) => item.createdAt)?.sort((a, b) => b?.createdAt?.localeCompare(a?.createdAt))[0] ??
		mostRecentResult

	return (
		<Box
			sx={{
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
			}}
		>
			<Box sx={{ marginRight: 4, marginLeft: 1 }}>
				<SchoolRoundedIcon style={{ width: 75, height: 75, color: "#41b6ff" }} />
			</Box>
			<Box>
				<Typography
					sx={{
						fontSize: 36,
						fontWeight: 600,
						color: "rgb(50, 51, 49)",
					}}
				>
					{mostRecentResultWithDate?.result ?? "No Test Result"}%
				</Typography>
				<Typography sx={{ fontSize: "15px", color: "rgba(50, 51, 49, 0.8)" }}>Your most recent test score</Typography>
			</Box>
		</Box>
	)
}

export default MostRecentTestScore
