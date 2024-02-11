import { Box } from "@mui/system"
import { createTheme } from "@mui/material/styles"

const theme = createTheme()

function AuthLayout({ children }: { children: React.ReactNode }) {
	return (
		<Box
			sx={{
				width: "100vw",
				height: "100vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				background: "#0e1237",
			}}
		>
			{/* <ThemeProvider theme={theme}> */}
			<Box sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
				{/* <WelcomeMessage /> */}
				{children}
			</Box>
			{/* </ThemeProvider> */}
		</Box>
	)
}

export default AuthLayout
