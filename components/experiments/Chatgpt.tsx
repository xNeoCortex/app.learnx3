import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"

function ChatGpt() {
	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	})

	const openAI = new OpenAIApi(configuration)

	const [prompt, setPrompt] = useState("")
	const [customAbbrev, setCustomAbbrev] = useState([])
	const [resultGPT, setResultGPT] = useState("")
	const [abbreviation, setAbbreviation] = useState("")
	const [loading, setLoading] = useState(false)

	function generateAbbreviations() {
		const words = prompt.split(" ")
		const abbreviations = []

		const reverseWord = prompt.split("").reverse().join("").toLocaleUpperCase()

		for (let i = 0; i < 3; i++) {
			let abbr = ""
			for (let j = 0; j < words.length; j++) {
				abbr += words[j][i] || ""
			}
			abbreviations.push(abbr.toUpperCase().padEnd(4, reverseWord))
		}
		setCustomAbbrev(abbreviations)
	}

	const handleClick = async () => {
		if (prompt.length < 1) return null
		setLoading(true)
		try {
			const response = await openAI.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "user",
						content: `create three abbreviations with 4 Capital letters for ${prompt} office. Return abbreviations only. Return abbreviations as an js array in the following format ['aaa', 'bbb', 'ccc']. `,
					},
				],
				temperature: 0.7,
				max_tokens: 100,
				presence_penalty: 0,
			})

			setResultGPT(response.data.choices[0]?.message?.content ?? "No message returned")
			setLoading(false)
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
		generateAbbreviations()
	}

	return (
		<div
			style={{
				display: "flex",
				alignItems: "start",
				background: "white",
				borderRadius: "7px",
				marginBottom: "10px",
			}}
		>
			<div
				style={{
					position: "relative",
					padding: 2,
				}}
			>
				{resultGPT.length > 0 && (
					<div
						style={{
							position: "absolute",
							right: 5,
							color: "black",
							cursor: "pointer",
						}}
						onClick={() => (setResultGPT(""), setAbbreviation(""), setCustomAbbrev([]))}
					>
						X
					</div>
				)}
				<div style={{ margin: 10 }}>
					<label style={{ marginRight: 5 }}>Office name:</label>
					<input
						onBlur={handleClick}
						placeholder="Office name"
						type="text"
						id="office-name"
						name="name"
						onChange={(e) => setPrompt(e.target.value)}
					/>
				</div>
				<div style={{ margin: 10 }}>
					<label style={{ marginRight: 5 }}>Abbreviation:</label>
					<input type="text" placeholder="Abbreviation" id="name" name="name" value={abbreviation} />
				</div>
				<div
					style={{
						width: "100%",
						minHeight: "100%",
						color: "black",
						margin: "20px 2px",
					}}
				>
					{(customAbbrev.length > 0 || resultGPT.length > 0 || loading) && <span style={{ marginRight: 5 }}>🤖</span>}
					{loading
						? `Thinking...`
						: !resultGPT.includes("Sorry") &&
						  resultGPT.length > 0 &&
						  Array.isArray(JSON.parse(resultGPT?.replace(/'/g, '"')))
						? JSON.parse(resultGPT?.replace(/'/g, '"')).map((item: any, index: number) => (
								<span
									key={index}
									onClick={() => setAbbreviation(item)}
									style={{
										textDecoration: "underline",
										color: "#5B5FC7",
										cursor: "pointer",
										marginRight: 4,
									}}
								>
									{`${item}${index + 1 !== JSON.parse(resultGPT?.replace(/'/g, '"')).length ? "," : " "}`}
								</span>
						  ))
						: customAbbrev.map((item: any, index: number) => (
								<span
									key={index}
									onClick={() => setAbbreviation(item)}
									style={{
										textDecoration: "underline",
										color: "#5B5FC7",
										cursor: "pointer",
										marginRight: 4,
									}}
								>
									{`${item} ${index + 1 !== customAbbrev.length ? "," : ""}`}
								</span>
						  ))}
				</div>
			</div>
		</div>
	)
}

export default ChatGpt

// <p
//   dangerouslySetInnerHTML={{
//     __html: resultGPT.replace(/\n/g, "<br />"),
//   }}
// />
