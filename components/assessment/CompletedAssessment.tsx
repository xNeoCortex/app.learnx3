import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { Alert, Box, Button, Container } from "@mui/material"

function CompletedAssessment({ score, handleButton = null }) {
	const { back } = useRouter()
	const handleBack = () => back()
	return (
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
				You have completed this assessment!
			</Alert>
			<h4 style={{ padding: 8, border: "3px solid #999bff", borderRadius: 8, background: "white" }}>
				⭐️ Your score: {score?.map((x, index) => Math.round(x.result) + (score?.length !== index + 1 && `, `))}
			</h4>
			<Image alt="complete image" src="/completed-icon.svg" width={400} height={300} style={{ margin: "auto" }} />
			<Button
				onClick={handleButton || handleBack}
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
	)
}

export default CompletedAssessment
