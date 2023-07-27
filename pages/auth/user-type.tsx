import React from "react"
import Link from "next/link"
import { Avatar, Box, Button, Typography } from "@mui/material"

function UserType() {
	const [who, setWho] = React.useState("student")
	return (
		<div
			style={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				backgroundImage: `url(/bg1.jpg)`,
				backgroundPosition: "center",
				backgroundSize: "cover",
				backgroundRepeat: "no-repeat",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					maxWidth: "650px",
					background: "#5f6ac40f",
					borderRadius: "8px",
					padding: 5,
					paddingTop: "20px",
					margin: "10px",
					marginBottom: "200px",
					overflow: "hidden",
				}}
			>
				<Typography sx={{ fontSize: 28, m: "auto", mb: 4, color: "black" }}>
					Hello, I am a <span style={{ textDecoration: "underline", fontWeight: "bold" }}>{who}</span>!
				</Typography>
				<Box sx={{ display: "flex" }}>
					<Avatar
						onClick={() => setWho("teacher")}
						alt="Remy Sharp"
						src="/teacher-johny.png"
						sx={{
							cursor: "pointer",
							border: who === "teacher" ? "4px solid black" : "2px solid white",
							boxShadow: who === "teacher" && "0px 0px 10px 0px rgba(0,0,0,0.75)",
							width: "180px",
							height: "180px",
							m: 1,
						}}
					/>
					<Avatar
						sx={{
							cursor: "pointer",
							boxShadow: who === "student" && "0px 0px 10px 0px rgba(0,0,0,0.75)",
							border: who === "student" ? "4px solid black" : "2px solid white",
							width: "180px",
							height: "180px",
							m: 1,
						}}
						onClick={() => setWho("student")}
						alt="Remy Sharp"
						src="/pupil-avatar.png"
					/>
				</Box>
				<Link href={who === "teacher" ? "/auth/user-form" : "/auth/student-form"} style={{ margin: "15px auto 0px" }}>
					<Button variant="contained" style={{ background: "rgb(95, 106, 196)" }}>
						Next
					</Button>
				</Link>
			</Box>
		</div>
	)
}

export default UserType
