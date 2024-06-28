"use client"
import React, { useEffect, useState } from "react"
import { Typography, Box } from "@mui/material"

type TimerProps = {
	onFinished: () => void
}

const Timer: React.FC<TimerProps> = ({ onFinished }: { onFinished: () => void }) => {
	const [timeLeft, setTimeLeft] = useState<number>(60)

	useEffect(() => {
		const timer = setInterval(() => {
			if (timeLeft <= 0) {
				clearInterval(timer as NodeJS.Timeout)
				onFinished()
			} else {
				setTimeLeft((prevTime) => prevTime - 1)
			}
		}, 1000)

		return () => clearInterval(timer as NodeJS.Timeout)
	}, [timeLeft, onFinished])

	const minutes = Math.floor(timeLeft / 60)
	const seconds = timeLeft % 60

	const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds

	return (
		<Box
			//@ts-ignore
			display="flex"
			flexDirection="column"
			alignItems="center"
		>
			<Typography variant="h4" component="div" color="textPrimary">
				{`${minutes}:${formattedSeconds}`}
			</Typography>
		</Box>
	)
}

export default Timer
