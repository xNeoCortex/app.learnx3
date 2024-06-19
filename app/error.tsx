"use client"
import { Avatar, Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import LogoutButton from "./components/auth/LogoutButton"

function ErrorPage({ message = "" }) {
	return (
		<Box
			//@ts-ignore
			sx={{
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<Box
				//@ts-ignore
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
				<Box alignItems={"center"} justifyContent={"center"} display={"flex"}>
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
					<Box gap={2} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
						<Typography sx={{ fontSize: 28, m: "auto", marginLeft: "10px" }}>
							{message.length > 0 ? message : "Sorry, something went wrong :/"}
							<Typography sx={{ fontSize: 16, marginLeft: "10px", textAlign: "center", maxWidth: "'100%" }}>
								Try to login again!
							</Typography>
						</Typography>
						<LogoutButton />
					</Box>
				</Box>
			</Box>
		</Box>
	)
}

export default ErrorPage
