import { Avatar, Box, Typography } from "@mui/material"
import LogoutButton from "../auth/LogoutButton"

function WaitingPage() {
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
						flexDirection: { xs: "column", sm: "row" },
						gap: "20px",
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
					<Box sx={{ textAlign: { xs: "center", sm: "start" } }}>
						<Typography sx={{ fontSize: 28, m: "auto", marginLeft: "10px" }}>
							Kindly wait for the administrator to grant you access!
						</Typography>
						<Typography sx={{ fontSize: 14, m: "auto", marginLeft: "10px", mt: 1 }}>
							Please contact us via <strong>team@learnx3.co.uk</strong> if you do not receive authorization within 24
							hours.
						</Typography>
					</Box>
				</Box>
				<LogoutButton text="logout" />
			</Box>
		</Box>
	)
}

export default WaitingPage
