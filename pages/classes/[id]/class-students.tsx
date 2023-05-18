import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { Box, Button, Grid } from "@mui/material"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import TableRowsIcon from "@mui/icons-material/TableRows"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ApiServices from "@/pages/api/ApiServices"
import { useStoreTemporary } from "@/pages/zustand"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import StudentCard from "@/components/student/StudentCard"
import StudentList from "@/components/student/StudentList"

function ClassStudents() {
	const {
		query: { id },
		pathname,
	} = useRouter()
	const { sidebarWidth } = useStoreTemporary()
	const [alignment, setAlignment] = React.useState("grid")
	const { fetchAllStudents, fetchOneClass } = ApiServices()
	const { data, isLoading, isError } = useQuery(["students"], fetchAllStudents)
	const {
		data: classInfo,
		isLoading: classIsLoading,
		isError: classIsError,
	} = useQuery([`class-students`], () => fetchOneClass(id), {
		enabled: !!id && id?.length > 5,
	})

	const studentList = data?.data.filter((item) => classInfo?.data.students?.includes(item.uid))

	const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
		setAlignment(newAlignment)
	}

	useEffect(() => {
		pathname.includes("class-students") ? setAlignment("row") : setAlignment("grid")
	}, [])

	if (isLoading || classIsLoading) return <LoadingPage />
	if (isError || classIsError) return <ErrorPage />
	return (
		<div
			style={{
				overflowY: "scroll",
				overflow: "hidden",
				width: `calc(100vw - ${sidebarWidth}px)`,
				marginTop: "40px",
			}}
		>
			<Box sx={{ flexGrow: 1, display: "flex", justifyContent: "space-between" }}>
				<h3
					style={{
						margin: 10,
						fontWeight: 600,
						fontSize: 19,
						color: "#5f616a",
					}}
				>
					Class Students
					<Button
						style={{
							background: "#5f6ac4",
							color: "white",
							boxShadow: "none",
							padding: "1px 10px 0px",
							marginLeft: "10px",
							fontWeight: 600,
						}}
					>
						{studentList?.length ?? 0} Students
					</Button>
				</h3>
				<ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
					<ToggleButton value="row" style={{ padding: "0px 5px", height: 35 }}>
						<TableRowsIcon />
					</ToggleButton>
					<ToggleButton value="grid" style={{ padding: "0px 5px", height: 35 }}>
						<ViewModuleIcon />
					</ToggleButton>
				</ToggleButtonGroup>
			</Box>
			{alignment == "grid" ? (
				<div
					style={{
						display: "flex",
						flexWrap: "nowrap",
						overflowX: "scroll",
						marginBottom: 45,
						marginLeft: "10px",
					}}
				>
					{studentList?.map((item, index) => (
						<div key={index}>
							<StudentCard studentDetails={item} />
						</div>
					))}
				</div>
			) : (
				<div style={{ display: "flex", flexDirection: "column" }}>
					<Grid container>
						<Grid item xs={12}>
							<StudentList data={studentList} />
						</Grid>
					</Grid>
				</div>
			)}
		</div>
	)
}

export default ClassStudents
