"use client"
import { Box, Button } from "@mui/material"
import { useRouter } from "next/navigation"

function BackButton({ disabled = false }) {
	const { back } = useRouter()

	return (
		<Box sx={{ position: "absolute", top: { xs: 20, sm: 10 }, right: 10 }}>
			<Button
				disabled={disabled}
				onClick={() => back()}
				variant="contained"
				sx={{
					borderRadius: "20px",
					color: disabled ? "grey" : "black",
					background: "white",
					width: "100px",
					fontWeight: "600",
					boxShadow: "none",
					marginRight: "10px",
					zIndex: "999",
				}}
			>
				Back
			</Button>
		</Box>
	)
}

export default BackButton
