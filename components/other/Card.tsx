import * as React from "react"
import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Link from "next/link"

export default function ImgMediaCard({ title, link }) {
	return (
		<Card sx={{ maxWidth: 300, m: 2 }}>
			<CardMedia component="img" alt="green iguana" height="140" image="/test_imag.png" />
			<CardContent>
				<Typography gutterBottom variant="h6" component="div">
					Topic: <strong>{title}</strong> 📚
				</Typography>
			</CardContent>
			<CardActions>
				<Link href={link}>
					<Button size="small" variant="contained" sx={{ m: "0px 10px 10px ", background: "rgb(95, 106, 196)" }}>
						View
					</Button>
				</Link>
			</CardActions>
		</Card>
	)
}
