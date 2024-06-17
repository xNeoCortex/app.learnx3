import { Typography } from "@mui/material"

export default function Copyright() {
	return (
		<Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
			{"Copyright © "}
			<a color="inherit" href="#">
				LearnX3
			</a>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	)
}
