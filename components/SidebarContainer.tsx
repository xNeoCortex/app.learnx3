import React from "react"
import { ThemeProvider, useTheme } from "@mui/material/styles"
import { Box, useMediaQuery } from "@mui/material"
import Sidebar from "./sidebar"
import Navbar from "./Navbar"
import FinaAvatar from "./fina/FinaAvatar"
import MobileBottomBar from "./MobileBottomBar"
import { FinaAvatarMobilePopup } from "./fina/FinaAvatarMobilePopup"
import { useStoreTemporary } from "./zustand"
import Fina from "@/pages/fina"

function SidebarContainer({ children }: { children: React.ReactNode }) {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const { setBotComponentWidth } = useStoreTemporary()
	const [finaPopupOpen, setFinaPopupOpen] = React.useState<boolean>(false)

	const handleFinaPopup = () => {
		isSmallScreen ? setFinaPopupOpen(true) : setBotComponentWidth(900)
	}

	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ width: "100%", paddingBottom: { xs: "70px", sm: "10px" } }}>
				<FinaAvatar handleFinaClick={handleFinaPopup} />
				<FinaAvatarMobilePopup open={finaPopupOpen} setOpen={setFinaPopupOpen} />

				<Box
					sx={{
						display: "flex",
						height: "100vh",
						boxSizing: "border-box",
					}}
				>
					<Sidebar />
					<Box sx={BoxStyle}>
						<Navbar />
						{children}
					</Box>
					{!isSmallScreen && <Fina setOpen={setFinaPopupOpen} />}
				</Box>
				<MobileBottomBar />
			</Box>
		</ThemeProvider>
	)
}

export default SidebarContainer

const BoxStyle = {
	padding: { xs: "10px 10px 0px", sm: "10px 20px 10px 5px" },
	maxWidth: "1400px",
	minHeight: "calc(100vh - 0px)",
	width: "100%",
	margin: "none auto",
	overflowY: "scroll",
}
