import React from "react"
import OneLesson from "./other/OneLesson"
import ErrorPage from "./ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import SnackbarX from "@/components/other/SnackbarX"
import { Box, Skeleton } from "@mui/material"
import { useStoreTemporary } from "./zustand"

function Lessons(props) {
	const [open, setOpen] = React.useState(false)
	const { sidebarWidth } = useStoreTemporary()

	// fetch upcoming sessions for the current user and add them to session[]
	const { fetchLessons } = ApiServices()
	const {
		data: lessonState,
		isLoading,
		isError,
	} = useQuery({ queryKey: ["lessons"], queryFn: fetchLessons, refetchOnWindowFocus: false })

	if (isError) return <ErrorPage />

	return (
		<>
			<SnackbarX
				open={open}
				setOpen={setOpen}
				backgroundColor="#32a676"
				message="You have successfully cancelled your sessions!"
			/>

			{
				<Box
					style={{
						marginTop: "10px",
						display: "flex",
						overflowX: "scroll",
						overflowY: "hidden",
						boxSizing: "border-box",
						width: `calc(100vw - 150px)`,
					}}
				>
					{isLoading
						? [1, 2, 3, 4, 5].map((item) => (
								<Skeleton key={item} variant="rounded" sx={{ margin: "10px", width: "320px", minHeight: "150px" }} />
						  ))
						: lessonState?.data.length > 0 &&
						  lessonState.data
								?.sort((a, b) => {
									if (a.name > b.name) return 1
									if (a.name < b.name) return -1
									return 0
								})
								.map((lesson, index) => <OneLesson key={index} lesson={lesson} />)}
				</Box>
			}
		</>
	)
}

export default Lessons
