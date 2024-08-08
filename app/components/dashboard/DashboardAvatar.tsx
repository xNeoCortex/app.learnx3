import React from "react"
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material"
import Link from "next/link"
import { brandColors } from "../utils/brandColors"
import GradientText from "../elements/GradientText"

function DashboardAvatar() {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

	return (
		<Link href="/avatar" style={{ width: "fit-content" }}>
			<Box
				//@ts-ignore
				sx={exploreTopicsStyle}
				overflow={["hidden", "visible"]}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", sm: "row" },
						flex: 1,
						height: "100%",
						minHeight: 290,
						background: "#060634",
						borderRadius: "8px",
						position: "relative",
					}}
					alignItems={["center", "start"]}
				>
					<Typography variant="h4" fontWeight="bolder" sx={textStyle}>
						<GradientText text="Practice your English with our AI Avatar" />
					</Typography>
					<img
						src={"/images/avatar-no-background-2.png"}
						alt="book"
						style={{
							position: isSmallScreen ? "unset" : "relative",
							maxHeight: isSmallScreen ? "430px" : "350px",
							top: isSmallScreen ? -15 : 0,
							left: isSmallScreen ? 0 : -30,
							marginTop: isSmallScreen ? 0 : -32,
							marginLeft: isSmallScreen ? 0 : 5,
							zIndex: 999,
						}}
					/>
				</Box>
			</Box>
		</Link>
	)
}

export default DashboardAvatar

const exploreTopicsStyle = {
	maxHeight: { xs: "90vh", sm: "100%" },
	height: { xs: "60vh", sm: "100%" },
	width: "100%",
	cursor: "pointer",
	transition: "transform 0.3s ease-in-out",
	position: "relative",
	display: "flex",
	flexDirection: "column",
	alignItems: "flex-end !important",
	justifyContent: "flex-end !important",
	// overflow: "hidden",
	"&:hover": {
		cursor: "pointer",
		transform: "scale(1.01)",
	},
}

const contentStyle = {
	display: "flex",
	flex: 3,
	flexDirection: "column",
	margin: " 0px auto",
	padding: "0xp 10px 10x",
	borderRadius: "8px",
	height: "90%",
	width: "100%",
	alignItems: { xs: "center", sm: "flex-start" },
	justifyContent: { xs: "flex-end", sm: "center" },
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
}

const textStyle = {
	color: brandColors.lighterGrey,
	maxWidth: { xs: "100%", sm: "60%" },
	textAlign: { xs: "center", sm: "start" },
	p: "25px 35px",
	position: "relative",
	lineHeight: 1.5,
}

const buttonStyle = {
	color: "white",
	border: "1px solid white",
	width: "fit-content",
}
