import React from "react"
import { WritingData } from "@/components/data/WritingData"
import { Box, Button, CardMedia, CssBaseline, Grid } from "@mui/material"
import Link from "next/link"

function EnglishWriting(props) {
	return (
		<Box sx={{ marginTop: "20px", flexGrow: 1 }}>
			<CssBaseline />
			<h3
				style={{
					margin: 10,
					marginBottom: 20,
					fontWeight: 600,
					fontSize: 19,
					color: "#5f616a",
				}}
			>
				Practice English Writing
			</h3>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					margin: 1,
					mb: 1,
				}}
			>
				{WritingData.map((item, index) => (
					<Box
						key={index}
						sx={{
							height: "100px",
							borderRadius: "10px",
							mb: 2,
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "space-between",
							cursor: "pointer",
							background: "white",
							boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
						}}
					>
						<CardMedia
							component="img"
							sx={{
								height: "70px",
								width: "150px",
								objectFit: "cover",
								margin: "0px 10px",
								borderRadius: "10px",
							}}
							image="/writing-pic.png"
							alt="test image"
						/>

						<Box
							sx={{
								display: "flex",
								width: "100%",
								justifyContent: "space-between",
								padding: "10px 20px",
								alignItems: "center",
								fontSize: 14,
								fontWeight: 600,
								color: "rgb(50, 50, 93)",
							}}
						>
							<h4>
								{" "}
								{item.topic} | <span style={{ color: "grey" }}>{item.word_limit} words</span>
							</h4>
							<Link href={`/writing/${item.id}`}>
								<Button
									variant="contained"
									size="small"
									sx={{
										background: "#0092e4",
										boxShadow: "none",
										fontWeight: 600,
									}}
								>
									Start
								</Button>
							</Link>
						</Box>
					</Box>
				))}
			</Box>
		</Box>
	)
}

export default EnglishWriting
