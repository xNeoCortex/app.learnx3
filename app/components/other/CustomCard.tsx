import React from "react"
import { Card, CardMedia, Typography, Box, capitalize } from "@mui/material"
import Link from "next/link"
import { useStoreUser } from "../zustand"

const CustomCard = React.memo(
	({
		title,
		link,
		image,
		category,
		createdById,
	}: {
		title: string
		link: string
		image: string
		category: string
		createdById: string
	}) => {
		const { userInfo } = useStoreUser()

		return (
			<Link href={link}>
				<Card
					sx={{
						borderRadius: "10px",
						backgroundColor: "#ffffff",
						boxShadow: 3,
						p: 1,
					}}
				>
					<Box sx={{ textAlign: "right", position: "relative" }}>
						{createdById === userInfo.uid && (
							<Typography
								sx={{
									background: "#8967fd",
									color: "#fff",
									display: "inline-block",
									padding: "4px 8px",
									borderRadius: "5px",
									fontSize: "10px",
									position: "absolute",
									left: "4px",
									top: "4px",
								}}
							>
								Created by you
							</Typography>
						)}
						<CardMedia component="img" src={image || "/mobile-book.svg"} alt={title} sx={{ borderRadius: "10px" }} />
					</Box>

					<Box
						sx={{
							display: "flex",
							alignItems: "start",
							flexDirection: "column",
							borderRadius: "10px",
							margin: "10px 10px 4px",
							gap: "2px",
							width: "100%",
						}}
					>
						<Typography noWrap sx={{ fontSize: "14px", fontWeight: "bold", maxWidth: "90%" }}>
							{capitalize(title)}
						</Typography>
						<Typography noWrap sx={{ fontSize: "12px", fontWeight: "semibold", maxWidth: "90%" }}>
							#{category}
						</Typography>
					</Box>
				</Card>
			</Link>
		)
	}
)

export default CustomCard
