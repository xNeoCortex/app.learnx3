import React, { useState } from "react"
import { Box, Button } from "@mui/material"
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter"

export function VocabularyCard({ word }) {
	const [open, setOpen] = useState(null)

	return (
		<Box
			sx={{
				background: "linear-gradient(to top right, #7caef0, #76e5eb)",
				"&:hover": {
					transform: "scale(1.03)",
					transition: "all 0.3s ease-in-out",
				},
				borderRadius: 2,
				m: 2,
				p: 2,
				height: "270px",
				maxWidth: 300,
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "column",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
			}}
		>
			<div
				onClick={() => setOpen(null)}
				style={{
					position: "relative",
					top: 0,
					right: -125,
					cursor: "pointer",
					color: "grey",
				}}
			>
				X
			</div>
			<Box
				sx={{
					height: "100%",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<h3 style={{ height: "fit-content", color: "black" }}>{word.word}</h3>
			</Box>
			{["definition", "example"].map(
				(item, index) =>
					open === item && (
						<p
							key={index}
							style={{
								background: "white",
								color: "black",
								textAlign: "center",
								marginBottom: 2,
								borderRadius: 3,
								padding: 6,
							}}
						>
							{word[item]}
						</p>
					)
			)}
			{["synonyms", "antonyms"].map(
				(item, index) =>
					open === item && (
						<p
							key={index}
							style={{
								background: "white",
								color: "black",
								textAlign: "center",
								marginBottom: 2,
								borderRadius: 3,
								padding: 6,
							}}
						>
							{word[item].map((item, index) => {
								return <p key={index}>{item}</p>
							})}
						</p>
					)
			)}

			<Box
				sx={{
					display: "flex",
					flexWrap: "wrap",
					mt: 2,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				{["definition", "synonyms", "antonyms", "example"].map((item, index) => (
					<Button
						key={index}
						onClick={() => setOpen(item)}
						sx={{
							fontSize: 12,
							width: "fit-content",
							margin: "3px",
							border: open === item && "1px solid white",
							fontWeight: open === item && "bolder",
							color: "black",
						}}
					>
						{capitalizeFirstLetter(item)}
					</Button>
				))}
			</Box>
		</Box>
	)
}
