import { Box, Button } from "@mui/material"
import { useRouter } from "next/router"

function BackButton({ disabled = false }) {
	const { back } = useRouter()

	return (
		<Box sx={{ position: "absolute", top: 30, right: 10 }}>
			<Button
				disabled={disabled}
				onClick={() => back()}
				variant="contained"
				style={{
					borderRadius: 20,
					color: disabled ? "grey" : "black",
					background: "white",
					width: 100,
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

export default BackButton
