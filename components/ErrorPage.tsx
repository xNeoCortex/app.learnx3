import { Avatar, Box, Button, Typography } from "@mui/material"

function ErrorPage({ message = "" }) {
	return (
		<div
			style={{
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
					<Typography sx={{ fontSize: 28, m: "auto", marginLeft: "10px" }}>
						{message.length > 0 ? message : "Sorry, something went wrong!"}
						{/* : "Sorry, you do not have access to this page!"} */}
					</Typography>
				</Box>
			</Box>
		</div>
	)
}

export default ErrorPage
