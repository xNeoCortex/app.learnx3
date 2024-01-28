import OpenAI from "openai"

interface GptProps {
	model: string
	messages: {
		role: "assistant" | "user" | "system"
		content: string
	}[]
	temperature: number
	max_tokens: number
	presence_penalty: number
}

function OpenAiFina(prompt: GptProps) {
	const openai = new OpenAI({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
		dangerouslyAllowBrowser: true,
	})
	return openai.chat.completions.create(prompt)
}

export default OpenAiFina
