import React from "react"
import { useClassInfo } from "./zustand"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Box, CssBaseline, Grid } from "@mui/material"
//@ts-ignore
import Sidebar from "./sidebar"
import Navbar from "./Navbar"
import Fina from "@/pages/fina"
import FinaAvatar from "./fina/FinaAvatar"

const theme = createTheme()

function SidebarContainer({ children }) {
	const { classInfo } = useClassInfo()

	return (
		<Box sx={{ width: "100%" }}>
			<FinaAvatar />
			<ThemeProvider theme={theme}>
				<Box
					style={{
						display: "flex",
						height: "100vh",
					}}
				>
					<Sidebar classId={classInfo?.uid} />
					<Box
						sx={{
							// background: "#5f6ac40a",
							padding: "10px 20px",
							maxWidth: "1400px",
							minHeight: "calc(100vh - 0px)",
							width: "100%",
							margin: "none auto",
							overflowY: "scroll",
							overflowX: "hidden",
						}}
					>
						<Navbar />
						{children}
					</Box>
					<Fina />
				</Box>
			</ThemeProvider>
		</Box>
	)
}

export default SidebarContainer
