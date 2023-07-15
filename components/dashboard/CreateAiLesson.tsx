import { Box, Button, LinearProgress, Typography } from "@mui/material"
import { useState } from "react"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import { useStoreUser } from "../zustand"
import ApiPostServices from "@/pages/api/ApiPostServices"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"
import ErrorPage from "../ErrorPage"

function CreateAiLesson() {
	const { userInfo } = useStoreUser()
	const [topic, setTopic] = useState("")
	const queryClient = useQueryClient()
	const { addLessonByAi } = ApiPostServices()

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: () => addLessonByAi(userInfo, topic),
		onSuccess: () => queryClient.invalidateQueries(["lessonByAiTopics"]),
	})

	if (isError) return <ErrorPage />

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				flexDirection: "column",
				alignItems: "center",
				boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
				width: "100%",
				minHeight: "250px",
				margin: "10px",
				borderRadius: "8px",
				overflow: "hidden",
				position: "relative",
				p: 1,
				background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
				borderBox: "box-sizing",
			}}
		>
			<Typography variant="h5" fontWeight="bolder" sx={{ color: "#001663", m: 3 }}>
				✨ Unleash the Power of AI! Generate Curriculum with a Click!
			</Typography>
			<Box
				sx={{
					display: "flex",
					width: "100%",
					p: 1,
				}}
			>
				<Search>
					<SearchIconWrapper>🤖</SearchIconWrapper>
					<StyledInputBase
						placeholder="Write your topic…"
						inputProps={{ "aria-label": "search" }}
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
					/>
				</Search>
				<Button
					variant="contained"
					onClick={() => mutate()}
					disabled={isLoading || topic === ""}
					sx={{
						background: "rgb(50, 51, 49)",
						color: "white",
						fontWeight: "bold",
						fontSize: "12px",
						mr: "30px",
					}}
				>
					<AutoFixHighIcon style={{ marginRight: 10 }} /> {isLoading ? "Loading..." : "Generate"}
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					p: 1,
					margin: "10px",
				}}
			>
				{isLoading ? (
					<Box sx={{ width: "100%" }}>
						<LinearProgress />
						<Typography sx={{ m: 1 }}>Get Set for an Epic Journey: Your Custom Curriculum is Underway!</Typography>
					</Box>
				) : (
					["Travel", "Book", "History", "Egypt"].map((item) => (
						<Button onClick={() => setTopic(item)} sx={{ color: "white", border: "1px solid white", m: 1 }}>
							💎 {item}
						</Button>
					))
				)}
			</Box>
		</Box>
	)
}

export default CreateAiLesson

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	"&:hover": {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	flexGrow: 1,
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}))
