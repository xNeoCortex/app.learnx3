import { Avatar, Box, Typography } from "@mui/material"
import LogoutButton from "../auth/LogoutButton"

function NotPermitted() {
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
					padding: "30px",
					margin: "10px",
					overflow: "hidden",
				}}
			>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
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
					<Box>
						<Typography sx={{ fontSize: 28, m: "auto", marginLeft: "10px" }}>
							Please contact your administrator to allocate you to a class.
						</Typography>
					</Box>
				</Box>
				<LogoutButton />
			</Box>
		</Box>
	)
}

export default NotPermitted
