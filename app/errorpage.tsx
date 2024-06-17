"use client"
import React from "react"
import { Avatar, Box, Typography } from "@mui/material"
import { useRouter } from "next/navigation"
import LogoutButton from "./components/auth/LogoutButton"

function ErrorPage({ message = "" }) {
	const router = useRouter()
	return (
		<Box
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					maxWidth: "650px",
					background: "#5f6ac40f",
					borderRadius: "8px",
					padding: 5,
					paddingTop: "20px",
					margin: "10px",
					overflow: "hidden",
				}}
			>
				<Box sx={{ display: "flex" }}>
					<Avatar
						alt="Remy Sharp"
						src="/teacher-johny.png"
						sx={{
							cursor: "pointer",
							width: "120px",
							height: "120px",
							m: 1,
						}}
					/>
					<Box display={"flex"} flexDirection={"column"} alignItems={"center"} gap={2}>
						<Typography sx={{ fontSize: 24, m: "auto", marginLeft: "10px", textAlign: "center" }}>
							{message.length > 0 ? message : "Sorry, something went wrong!"}
						</Typography>
						<LogoutButton />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default ErrorPage
