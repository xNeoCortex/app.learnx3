import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Alert, Box, Button, Container } from "@mui/material"

function CompletedAssessment(props) {
	const { back } = useRouter()
	return (
		<Container sx={{ padding: "20px 5px" }}>
			<Box
				sx={{
					background: "#bdbdbd33",
					margin: "15px ",
					padding: "0px 0px 20px",
					borderRadius: 3,
					display: "flex",
					justifyContent: "space-around",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Alert
					severity="success"
					sx={{ p: 1, m: 2, paddingY: "0px", fontSize: 19, fontWeight: 600, width: "fit-content" }}
				>
					You have already completed the following assessment!
				</Alert>
				<Image alt="complete image" src="/completed-icon.svg" width={400} height={300} style={{ margin: "auto" }} />
				<Button
					onClick={() => back()}
					variant="contained"
					style={{
						borderRadius: 20,
						background: "white",
						color: "black",
						width: 200,
						fontWeight: 600,
						boxShadow: "none",
						marginRight: 20,
					}}
				>
					Back
				</Button>
			</Box>
		</Container>
	)
}

export default CompletedAssessment
