import React from "react"
import { useClassInfo } from "./zustand"
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles"
import { Box, useMediaQuery } from "@mui/material"
//@ts-ignore
import Sidebar from "./sidebar"
import Navbar from "./Navbar"
import Fina from "@/pages/fina"
import FinaAvatar from "./fina/FinaAvatar"
import MobileBottomBar from "./MobileBottomBar"
import FinaAvatarMobile from "./fina/FinaAvatarMobile"
import FinaAvatarMobilePopup from "./fina/FinaAvatarMobilePopup"

function SidebarContainer({ children }) {
	const { classInfo } = useClassInfo()
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const [open, setOpen] = React.useState(false)

	return (
		<Box sx={{ width: "100%", paddingBottom: { xs: "70px", sm: "10px" } }}>
			{isSmallScreen ? <FinaAvatarMobile setOpen={setOpen} /> : <FinaAvatar />}
			<FinaAvatarMobilePopup open={open} setOpen={setOpen} />
			<ThemeProvider theme={theme}>
				<Box
					sx={{
						display: "flex",
						height: "100vh",
						boxSizing: "border-box",
					}}
				>
					<Sidebar classId={classInfo?.uid} />
					<Box
						sx={{
							// background: "#5f6ac40a",
							padding: { xs: "10px 10px 0px", sm: "10px 20px 10px 5px" },
							maxWidth: "1400px",
							minHeight: "calc(100vh - 0px)",
							width: "100%",
							margin: "none auto",
							overflowY: "scroll",
						}}
					>
						<Navbar />
						{children}
					</Box>
					{!isSmallScreen && <Fina />}
				</Box>
				<MobileBottomBar classId={classInfo?.uid} />
			</ThemeProvider>
		</Box>
	)
}

export default SidebarContainer
