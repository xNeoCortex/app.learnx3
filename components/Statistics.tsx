import { memo, useMemo } from "react"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import { Box, Grid, Typography } from "@mui/material"
import GppBadIcon from "@mui/icons-material/GppBad"
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious"
import SchoolRoundedIcon from "@mui/icons-material/SchoolRounded"
import { BarChart } from "./other/BarChart"
import ExplainAI from "./ExplainAI"
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt"
import ErrorPage from "../pages/errorpage"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import { DoughnutChart } from "@/components/other/DoughnutChart"

const Statistics = memo(({ displayGraphs }: { displayGraphs: boolean }) => {
	const { pathname } = useRouter()

	// find another solution -> no need to fetch all database just to see the length of students array
	const { fetchAllStudents } = ApiServices()
	const { data, isLoading, isError } = useQuery({
		queryKey: ["students"],
		queryFn: fetchAllStudents,
		refetchOnWindowFocus: false,
	})

	// Data to display
	const dataSet = [
		{
			name: "# of Students",
			color: "#e2e6fb4d",
			number: data?.data.length,
			icon: <SchoolRoundedIcon sx={{ width: "50px", height: "50px", color: "rgb(95, 97, 196)" }} />,
		},
		{
			name: "Struggling",
			color: "rgb(255 139 79 / 7%)",
			number: 3,
			icon: <GppBadIcon sx={{ width: "50px", height: "50px", color: "#ff8b4f" }} />,
		},
		{
			name: "Doing Well",
			color: "rgb(65 182 255 / 8%)",
			number: 2,
			icon: <SkipPreviousIcon sx={{ width: "50px", height: "50px", color: "#41b6ff" }} />,
		},
		{
			name: "Doing Great",
			color: "rgb(94 196 151 / 8%)",
			number: 2,
			icon: <ThumbUpAltIcon sx={{ width: "50px", height: "50px", color: "#5fc497" }} />,
		},
	]
	const studentPerformance =
		useMemo(() => dataSet.map((item) => item.name + "=" + item.number), [dataSet, data?.data]) || []

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box sx={{ mt: "10px" }}>
			<Typography
				sx={{
					margin: "0px 10px 10px 0px",
					marginBottom: "20px",
					fontWeight: "600",
					fontSize: "19px",
					color: "#5f616a",
				}}
			>
				Class Statistics
			</Typography>
			{pathname.includes("class-statistics") && (
				<Box
					sx={{
						display: "flex",
						marginBottom: "15px",
					}}
				>
					<ExplainAI
						prompt={`Explain how students in Class A performed on their english tests based on the following data ${studentPerformance}. Suggest on which topic a teacher should focus to help student improve their weakness.`}
						buttonTitle="Explain me data"
						bg="white"
					/>
				</Box>
			)}

			<Grid container spacing={2}>
				{dataSet.map((item, index) => (
					<Grid item xs={12} sm={3} key={index}>
						<Box
							sx={{
								padding: "20px 10px",
								flex: 1,
								color: "white",
								height: "100px",
								display: "flex",
								justifyContent: "start",
								alignItems: "center",
								flexDirection: "row",
								borderRadius: "10px",
								boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
								background: item.color,
							}}
						>
							<Box sx={{ marginRight: 2, marginLeft: 1 }}>{item.icon}</Box>
							<Box>
								<Typography
									style={{
										fontWeight: "600",
										fontSize: "22px",
										color: "rgb(50, 51, 49)",
									}}
								>
									{item.number}
								</Typography>
								<Typography style={{ fontSize: "15px", color: "rgba(50, 51, 49, 0.8)" }}>{item.name}</Typography>
							</Box>
						</Box>
					</Grid>
				))}
			</Grid>
			{displayGraphs && (
				<Grid container>
					<Grid
						item
						xs={6}
						sx={{
							padding: "10px",
							margin: "40px 0px 30px",
						}}
					>
						<Box
							style={{
								margin: "auto",
								borderRadius: "10px",
								padding: "45px",
								boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
							}}
						>
							<DoughnutChart dataClass={dataSet} />
						</Box>
					</Grid>
					<Grid
						item
						xs={6}
						sx={{
							margin: "40px 0px 30px",
							padding: "10px",
						}}
					>
						<Box
							sx={{
								margin: "auto",
								display: "flex",
								alignItems: "center",
								height: "100%",
								width: "100%",
								padding: "15px",
								borderRadius: "10px",
								boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
							}}
						>
							<BarChart dataProp={[10, 20, 40]} labelsProp={["Lesson 1", "Lesson 2", "Lesson 3"]} />
						</Box>
					</Grid>
				</Grid>
			)}
		</Box>
	)
})

export default Statistics
