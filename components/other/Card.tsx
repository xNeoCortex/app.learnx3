import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Link from "next/link"
import { capitalize } from "@mui/material"

export default function ImgMediaCard({ title, link }: { title: string; link: string }) {
	return (
		<Link href={link}>
			<Card
				sx={{
					p: 1,
					borderRadius: 2,
					width: "100%",
					height: "100%",
					boxShadow: "none",
					border: "1px solid rgb(95, 97, 196)",
					transition: "transform 0.3s ease-in-out",
					cursor: "pointer",
					"&:hover": {
						cursor: "pointer",
						transform: "scale(1.02)",
						boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
					},
				}}
			>
				<CardMedia component="img" alt="green iguana" height="160px" width="100px" image="/mobile-book.svg" />
				<CardContent sx={{ p: "16px !important", fontWeight: 500 }}>
					<Typography gutterBottom component="div" sx={{ fontSize: 19, textAlign: "center", m: 0 }}>
						{capitalize(title)}
					</Typography>
				</CardContent>
			</Card>
		</Link>
	)
}
