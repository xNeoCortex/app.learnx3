import React from "react"

function GradientText({ text }: { text: string }) {
	return (
		<span
			style={{
				background: "linear-gradient(45deg, rgb(139, 88, 254), rgb(95, 222, 231))",
				WebkitBackgroundClip: "text",
				WebkitTextFillColor: "transparent",
			}}
		>
			{text}
		</span>
	)
}

export default GradientText
