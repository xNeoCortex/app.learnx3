import React from "react"
import { useStoreTemporary } from "./Zustand"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { Box, CssBaseline, Grid } from "@mui/material"
import Sidebar from "./Sidebar"

const theme = createTheme()

function SidebarContainer({ children }) {
	const { classInfo } = useStoreTemporary()

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
						style={{
							background: "#5f6ac40a",
							padding: "20px",
							borderRadius: 5,
							maxWidth: "none",
							minHeight: "calc(100vh - 0px)",
							width: "100%",
							overflowY: "scroll",
							overflowX: "hidden",
						}}
					>
						{children}
					</Box>
				</Grid>
			</ThemeProvider>
		</Grid>
	)
}

export default SidebarContainer
