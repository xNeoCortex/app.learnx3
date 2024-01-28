import { Box, Button, Chip, CssBaseline, TextareaAutosize, Typography } from "@mui/material"
import { useState } from "react"
import TranslateIcon from "@mui/icons-material/Translate"
import ClearIcon from "@mui/icons-material/Clear"
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined"
import OpenAiFina from "./utils/OpenAiFina"

function Translator() {
	const [prompt, setPrompt] = useState("")
	const [action, setAction] = useState("Translate")
	const [result, setResult] = useState("")
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		let promptSentence: string
		if (action === "Translate") {
			promptSentence = `Translate the following word ${prompt} into russian`
		} else if (action === "Synonyms") {
			promptSentence = `Show 5 synonyms of the following word ${prompt}`
		} else if (action === "Antonyms") {
			promptSentence = `Show 5 antonyms of the following word ${prompt}`
		} else {
			promptSentence = ""
		}
		setLoading(true)
		try {
			const response = await OpenAiFina({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: "You are english language translator",
					},
					{
						role: "user",
						content: "translate dog into russian language",
					},
					{
						role: "assistant",
						content: `собака`,
					},
					{
						role: "user",
						content: promptSentence,
					},
				],
				temperature: 0.5,
				max_tokens: 30,
				presence_penalty: 0,
			})
			setResult(response.choices[0].message.content ?? "Sorry, something went wrong. Please try again later.")
			setLoading(false)
		} catch (error) {
			console.error(error)
		}
	}

	const handleClear = () => {
		setResult("")
	}

	return (
		<Box sx={{ marginTop: "20px", flexGrow: 1, marginRight: "15px" }}>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					alignItems: "center",
					marginTop: "15px",
				}}
			>
				<h3
					style={{
						margin: "10px 10px 0px",
						fontWeight: 600,
						fontSize: 19,
						color: "#5f616a",
					}}
				>
					Translator
				</h3>
				<Button onClick={handleClear}>
					<ClearIcon /> Clear{" "}
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					margin: 1,
					width: "100%",
				}}
			>
				<Box
					sx={{
						margin: 1,
						display: "flex",
						width: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flex: 1,
							maxHeight: "200px",
							overflow: "auto",
						}}
					>
						<TextareaAutosize
							onChange={(e) => setPrompt(e.target.value)}
							aria-label="empty textarea"
							placeholder="Enter text..."
							value={prompt}
							style={{
								width: "100%",
								borderRadius: "6px",
								padding: "5px",
								minHeight: "60px",
								border: "2px solid #527aeb",
								background: "white",
								color: "black",
							}}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							width: "300px",
							flexDirection: "row",
							justifyContent: "space-between",
							padding: "0px 25px",
							alignItems: "center",
							background: "#4f4fda",
							margin: "0px 10px",
							borderRadius: "6px",
							color: "white",
							maxHeight: "80px",
						}}
					>
						<Typography
							sx={{
								fontWeight: 600,
								fontSize: "19px",
								color: "white",
							}}
						>
							🇬🇧 Eng
						</Typography>
						<PublishedWithChangesOutlinedIcon />
						<Typography
							sx={{
								fontWeight: 600,
								fontSize: "19px",
								color: "white",
							}}
						>
							🇷🇺 Rus
						</Typography>
					</Box>
					<Box sx={{ display: "flex", flex: 1 }}>
						<Box
							sx={{
								display: "flex",
								alignItems: "start",
								background: "white",
								borderRadius: "7px",
								marginBottom: "10px",
								height: "100%",
								width: "100%",
								border: "2px solid #527aeb",
								maxHeight: "200px",
								overflowY: "scroll",
							}}
						>
							<Typography padding="5px">{result}</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					marginLeft: "15px",
					marginBottom: "15px",
					flexDirection: "row",
					justifyContent: "space-between",
				}}
			>
				<Box sx={{ display: "flex" }}>
					<Chip
						onClick={() => setAction("Translate")}
						label="Translate"
						variant="outlined"
						style={{
							color: action === "Translate" ? "white" : "rgb(95, 97, 196)",
							background: action === "Translate" ? "rgb(95, 97, 196) " : "transparent",
							margin: "5px 10px 5px 0px",
							border: "2px solid rgb(95, 97, 196)",
							borderRadius: "0.75rem",
							fontWeight: 600,
							padding: "0px 2px",
							fontSize: 12,
							cursor: "pointer",
						}}
					/>
					<Chip
						onClick={() => setAction("Synonyms")}
						label="Synonyms"
						variant="outlined"
						style={{
							color: action === "Synonyms" ? "white" : "rgb(255, 139, 79)",
							background: action === "Synonyms" ? "rgb(255, 139, 79) " : "transparent",
							margin: "5px 10px 5px 0px",
							border: "2px solid rgb(255, 139, 79)",
							borderRadius: "0.75rem",
							fontWeight: 600,
							padding: "0px 2px",
							fontSize: 12,
							cursor: "pointer",
						}}
					/>
					<Chip
						onClick={() => setAction("Antonyms")}
						label="Antonyms"
						variant="outlined"
						style={{
							color: action === "Antonyms" ? "white" : "rgb(95, 196, 151)",
							background: action === "Antonyms" ? "rgb(95, 196, 151) " : "transparent",
							margin: "5px 10px 5px 0px",
							border: "2px solid rgb(95, 196, 151)",
							borderRadius: "0.75rem",
							fontWeight: 600,
							padding: "0px 2px",
							fontSize: 12,
							cursor: "pointer",
						}}
					/>
				</Box>
				<Button
					variant="contained"
					onClick={handleClick}
					disabled={loading}
					style={{
						background: "rgb(50, 51, 49)",
						color: "white",
						fontWeight: "bold",
						fontSize: 12,
						height: "40px",
						width: "100%",
						maxWidth: "220px",
					}}
				>
					<TranslateIcon style={{ marginRight: 10 }} />{" "}
					{loading
						? "Loading..."
						: action === "Translate"
						? "Translate"
						: action === "Synonyms"
						? "Show 5 Synonyms"
						: action === "Antonyms"
						? "Show 5 Antonyms"
						: ""}
				</Button>
			</Box>
		</Box>
	)
}

export default Translator
