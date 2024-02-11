import React from "react"
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"
import Link from "next/link"

function ExploreTopics() {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))

	return (
		<Link href="/speak" style={{ width: "fit-content" }}>
			<Box sx={exploreTopicsStyle}>
				<img
					src={"/online-courses.svg"}
					alt="book"
					style={{
						position: "absolute",
						width: "120%",
						height: isSmallScreen ? "100%" : "120%",
						top: isSmallScreen ? -85 : 0,
						left: isSmallScreen ? -35 : 0,
						marginTop: isSmallScreen ? 0 : -50,
						marginLeft: isSmallScreen ? 0 : 135,
					}}
				/>
				<Box sx={contentStyle}>
					<Typography fontWeight="bolder" sx={textStyle}>
						Explore Topics
						<Typography sx={textStyle}>Generated by AI</Typography>
					</Typography>
					<Button variant="outlined" sx={buttonStyle}>
						View
					</Button>
				</Box>
			</Box>
		</Link>
	)
}

export default ExploreTopics

const exploreTopicsStyle = {
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	maxHeight: { xs: "90vh", sm: "280px" },
	height: { xs: "60vh", sm: "280px" },
	width: "100%",
	borderRadius: "8px",
	cursor: "pointer",
	transition: "transform 0.3s ease-in-out",
	overflow: "hidden !important",
	position: "relative",
	background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
	"&:hover": {
		cursor: "pointer",
		transform: "scale(1.01)",
	},
	display: "flex",
}

const contentStyle = {
	display: "flex",
	flexDirection: "column",
	margin: " 0px auto",
	padding: "0px 30px 10px",
	height: "100%",
	width: "100%",
	alignItems: { xs: "center", sm: "flex-start" },
	justifyContent: { xs: "flex-end", sm: "center" },
}

const textStyle = {
	color: "#001663",
	zIndex: 99,
	mb: 1,
	fontSize: { xs: "28px", sm: "40px" },
	textAlign: { xs: "center", sm: "flex-start" },
}

const buttonStyle = {
	color: "white",
	border: "1px solid white",
	width: "fit-content",
}
