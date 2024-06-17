import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { Box, capitalize } from "@mui/material"

const ImgMediaCard = React.memo(({ title, link, image }: { title: string; link: string; image: any }) => {
	return (
		<Link href={link}>
			<Card
				sx={{
					display: "flex",
					alignItems: "end",
					borderRadius: 2,
					width: "100%",
					height: "100%",
					minHeight: 200,
					transition: "transform 0.3s ease-in-out",
					cursor: "pointer",
					backgroundImage: `url(${image?.url || "/mobile-book.svg"})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
					boxShadow: "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
					"&:hover": {
						cursor: "pointer",
						transform: "scale(1.02)",
						boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
					},
				}}
			>
				<CardContent sx={{ p: "0px !important", fontWeight: 500, width: "100%" }}>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-around",
							alignItems: "end",
							background:
								"linear-gradient(180deg, hsla(0, 0%, 0%, 0) 0%, hsl(0deg 0% 34.71% / 30%) 12%, hsl(0, 0%, 0%) 100%)",
							p: 2,
							height: "50%",
							minHeight: "100px",
							textAlign: "center",
							color: "white",
							fontWeight: "semibold",
							fontSize: "14px",
							w: "100%",
						}}
					>
						<Typography sx={{ fontSize: 16, fontWeight: 600, textAlign: "center", m: 0, height: "fit-content" }}>
							{capitalize(title)}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		</Link>
	)
})

export default ImgMediaCard
