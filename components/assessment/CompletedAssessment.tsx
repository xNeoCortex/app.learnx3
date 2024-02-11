import React, { memo } from "react"
import Image from "next/image"
import { Alert, Box, Button } from "@mui/material"

const CompletedAssessment: React.FC<{
	score: { result: number }[]
	setShowResultPage: (value: boolean) => void
}> = memo(({ score, setShowResultPage }) => {
	return (
		<Box
			sx={{
				background: "#bdbdbd33",
				margin: "15px 0px",
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
				⭐️ Your score:{" "}
				{score?.map(
					(x: { result: number }, index: number) => Math.round(x.result) + (score?.length !== index + 1 ? `, ` : "")
				)}
			</h4>
			<Image alt="complete image" src="/completed-icon.svg" width={400} height={300} style={{ margin: "auto" }} />
			<Button
				onClick={() => setShowResultPage(false)}
				variant="contained"
				style={{
					flex: 1,
					margin: "15px 0px",
					background: "#9d4edd",
					color: "white",
					fontWeight: 600,
				}}
			>
				Review Answers
			</Button>
		</Box>
	)
})

export default CompletedAssessment
