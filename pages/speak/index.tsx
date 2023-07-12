import React from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import BackButton from "@/components/other/BackButton"
import SidebarContainer from "@/components/SidebarContainer"
import { Box, CssBaseline, Grid, Typography } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "../api/ApiServices"
import ImgMediaCard from "@/components/other/Card"

function index(props) {
	const topics = [
		{
			topic: "School",
			id: "h6iyfL4ULlaqaTBkCqvI",
			img: "school",
		},
	]

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Box sx={{ marginTop: "20px", width: "100%" }}>
					<CssBaseline />
					<BackButton />

					<Typography
						style={{
							margin: 10,
							marginBottom: 20,
							fontWeight: 600,
							fontSize: 19,
							color: "#5f616a",
						}}
					>
						Speak English
					</Typography>
					<Grid container spacing={2}>
						{topics.map((x) => (
							<Grid item xs={12} sm={6} lg={4}>
								<ImgMediaCard title={x.topic} link={`/speak/${x.id}`} />
							</Grid>
						))}
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default index
