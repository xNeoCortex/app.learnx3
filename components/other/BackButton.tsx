import { Box, Button } from "@mui/material"
import { useRouter } from "next/router"

function BackButton() {
	const {
		back
	} = useRouter()

	return (
		<Box sx={{ position: "absolute", top: 30, right: 10 }}>
			<Button
				onClick={() => back()}
				variant="contained"
				style={{
					borderRadius: 20,
					color: "black",
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
