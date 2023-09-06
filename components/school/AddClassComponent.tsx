import React from "react"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Skeleton } from "@mui/material"
import ErrorPage from "../../pages/errorpage"
import AddClass from "./AddClassDialog"
import ClassCard from "./ClassCard"
import { useStoreTemporary } from "../zustand"

function AddClassPage({ studentList, teacherList }) {
	const { sidebarWidth } = useStoreTemporary()
	const { fetchClasses } = ApiServices()
	const {
		data: classList,
		isLoading,
		isError,
	} = useQuery({ queryKey: ["classList"], queryFn: fetchClasses, refetchOnWindowFocus: false })
	// if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

	return (
		<Box sx={{ marginTop: 5, display: "flex", flexDirection: "column" }}>
			<Box sx={{ margin: "0px 10px" }}>
				<AddClass buttonName="Create Class" />
			</Box>
			<div
				style={{
					marginTop: 5,
					display: "flex",
					overflowX: "scroll",
					overflowY: "hidden",
					boxSizing: "border-box",
					width: `100px)`,
				}}
			>
				{isLoading
					? [1, 2, 3, 4, 5].map((item, index) => (
							<Skeleton key={index} variant="rounded" width="320px" height="250px" sx={{ margin: "10px" }} />
					  ))
					: classList?.data.length > 0 &&
					  classList?.data
							.sort((a, b) => {
								if (a.class_name > b.class_name) return 1
								if (a.class_name < b.class_name) return -1
								return 0
							})
							.map((item, index) => (
								<ClassCard key={index} item={item} studentList={studentList} teacherList={teacherList} />
							))}
			</div>
		</Box>
	)
}

export default AddClassPage
