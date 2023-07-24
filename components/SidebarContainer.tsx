import React from "react"
import { useClassInfo } from "./zustand"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Box, CssBaseline, Grid } from "@mui/material"
//@ts-ignore
import Sidebar from "./sidebar"
import Navbar from "./Navbar"

const theme = createTheme()

function SidebarContainer({ children }) {
	const { classInfo } = useClassInfo()

	return (
		<Grid sx={{ width: "100%" }}>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<Grid
					item
					xs={12}
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
							borderRadius: "5px",
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
				</Grid>
			</ThemeProvider>
		</Grid>
	)
}

export default SidebarContainer
