import React from "react"
import { useQuery } from "react-query"
import ApiServices from "@/pages/api/ApiServices"
import { useStoreTemporary } from "@/pages/zustand"
import { Box } from "@mui/material"
import ErrorPage from "../ErrorPage"
import AddClass from "./AddClassDialog"
import ClassCard from "./ClassCard"
import LoadingPage from "../LoadingPage"

function AddClassPage(props) {
	const { sidebarWidth } = useStoreTemporary()
	const { fetchClasses } = ApiServices()
	const { data: classList, isLoading, isError } = useQuery(["listClasses"], fetchClasses)

	if (isLoading) return <LoadingPage />
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
					width: `calc(100vw - ${sidebarWidth}px)`,
				}}
			>
				{classList?.data.length > 0 &&
					classList?.data
						.sort((a, b) => {
							if (a.class_name > b.class_name) return 1
							if (a.class_name < b.class_name) return -1
							return 0
						})
						.map((item, index) => <ClassCard item={item} />)}
			</div>
		</Box>
	)
}

export default AddClassPage
