"use client"
import React, { useState, useRef, memo } from "react"
import PlayCircleIcon from "@mui/icons-material/PlayCircle"
import StopCircleIcon from "@mui/icons-material/StopCircle"
import { IconButton } from "@mui/material"

const AudioPlayer = memo(({ audioSrc, iconColor }: { audioSrc: string | undefined; iconColor?: string }) => {
	const [isPlaying, setIsPlaying] = useState(false)
	const audioRef = useRef(null)

	const togglePlay = () => {
		if (isPlaying) {
			//@ts-ignore
			audioRef.current.pause()
		} else {
			//@ts-ignore
			audioRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	return (
		<>
			<audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} />
			<IconButton onClick={togglePlay} sx={{ color: iconColor ?? "#060634" }}>
				{isPlaying ? <StopCircleIcon /> : <PlayCircleIcon />}
			</IconButton>
		</>
	)
})

export default AudioPlayer
