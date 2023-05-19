import React, { useEffect } from "react"
import { useQuery } from "react-query"
import { useRouter } from "next/router"
import { Box, Button, Grid } from "@mui/material"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import TableRowsIcon from "@mui/icons-material/TableRows"
import ViewModuleIcon from "@mui/icons-material/ViewModule"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/components/ErrorPage"
import StudentCard from "@/components/student/StudentCard"
import StudentList from "@/components/student/StudentList"
import { useStoreTemporary } from "@/components/Zustand"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import StudentCardList from "@/components/student/StudentCardList"

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
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<StudentCardList />
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default ClassStudents
