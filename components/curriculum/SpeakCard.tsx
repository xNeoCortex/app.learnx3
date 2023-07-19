import React, { useState } from "react"
import { Box, Button, capitalize, Chip, Typography } from "@mui/material"
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter"

export function SpeakCard({ word, showDefinition, setShowDefinition }) {
	const [open, setOpen] = useState(null)

	return (
		<Box
			sx={{
				background: "#fff",
				borderRadius: 2,
				p: 2,
				marginY: "15px",
				width: "100%",
				height: "100%",
				minHeight: "50vh",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
			}}
		>
			{!showDefinition ? (
				<Box
					sx={{
						height: "100%",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Typography variant="h4" style={{ height: "fit-content", color: "black", fontWeight: "bold" }}>
						{word.word}
					</Typography>
				</Box>
			) : (
				<>
					{["definition", "example"].map((item, index) => (
						<Typography
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
							<b>{capitalize(item)}: </b> {word[item]}
						</Typography>
					))}
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							mt: 2,
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
						}}
					>
						<Typography>
							<b> Synonyms: </b>
						</Typography>

						{word?.synonyms.map((item, index) => {
							return (
								<Typography
									key={index}
									sx={{
										background: "white",
										color: "black",
										textAlign: "center",
										p: "2px 5px",
										margin: "2px",
										borderRadius: "4px",
										border: "1px solid black",
									}}
								>
									{capitalize(item)}
								</Typography>
							)
						})}
					</Box>
				</>
			)}
		</Box>
	)
}
