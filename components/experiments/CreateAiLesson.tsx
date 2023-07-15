import { Box, Button, IconButton, TextField } from "@mui/material"
import { useState } from "react"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import { useStoreUser } from "../zustand"
import ApiPostServices from "@/pages/api/ApiPostServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"

function CreateAiLesson() {
	const { userInfo } = useStoreUser()
	const [topic, setTopic] = useState("")
	const queryClient = useQueryClient()

	const { addLessonByAi } = ApiPostServices()

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: () => addLessonByAi(userInfo, topic),
		onSuccess: () => queryClient.invalidateQueries(["lessonByAiTopics"]),
	})

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "start",
				background: "white",
				borderRadius: "7px",
				marginBottom: "10px",
			}}
		>
			<Box
				sx={{
					position: "relative",
					padding: 2,
				}}
			>
				<TextField
					id="outlined-basic"
					label="Topic"
					variant="outlined"
					value={topic}
					onChange={(e) => setTopic(e.target.value)}
				/>
				<Button
					variant="contained"
					onClick={() => mutate()}
					disabled={isLoading}
					style={{
						background: "rgb(50, 51, 49)",
						color: "white",
						fontWeight: "bold",
						fontSize: 12,
					}}
				>
					<AutoFixHighIcon style={{ marginRight: 10 }} /> {isLoading ? "Loading..." : "Generate"}
				</Button>
			</Box>
		</Box>
	)
}

export default CreateAiLesson
