import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material"
import { useState } from "react"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import { useStoreUser, useStoreTemporary } from "../zustand"
import { useQueryClient } from "@tanstack/react-query"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"
import ErrorPage from "../../pages/errorpage"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../firebaseX"
import { useRouter } from "next/router"
import { AiLessonStructure } from "../data/AiLessonStructure"
import OpenAiFina from "../utils/OpenAiFina"

const CreateAiLesson = () => {
	const { push: navigate } = useRouter()
	const queryClient = useQueryClient()
	const { userInfo } = useStoreUser()
	const { loadingGenContentAI, setLoadingGenContentAI } = useStoreTemporary()
	const [topic, setTopic] = useState("")
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)

	async function CreateAiLessonFunc() {
		setLoadingGenContentAI(true)
		try {
			const response = await OpenAiFina({
				model: "gpt-3.5-turbo-16k-0613",
				messages: [
					{
						role: "system",
						content: "You are a very smart assistant which produces result only in JSON format",
					},
					{
						role: "user",
						content: `Create english language curriculum topic Family. Return it in JSON format. I will use the document on my website to create content for english language platform so children could learn speaking english. Choose one of the following for category Learning, Movies, News, Sport, Travel, Gaming, Lifestyle, Entertainment, Fashion, Technology, Entrepreneurship, History, Geography, Family, other. Exercise should be multiple choice questions.`,
					},
					{
						role: "assistant",
						content: `${JSON.stringify(AiLessonStructure)}`,
					},
					{
						role: "user",
						content: `Create english language curriculum in topic ${topic}. Return it in JSON format. I will use the document on my website to create content for english language platform so children could learn speaking english. Exercise should be multiple choice questions.`,
					},
				],
				temperature: 0.7,
				max_tokens: 10000,
				presence_penalty: 0,
			})
			const createdLesson = response.choices[0].message.content && getObject(response.choices[0].message.content)

			const lessonDoc = await addDoc(collection(db, "lessonByAi"), {
				...createdLesson,
				createdAt: `${new Date().toISOString()}`,
				createdById: `${userInfo.uid}`,
				createdByName: `${userInfo.name}`,
			})
			await addDoc(collection(db, "lessonByAiTopics"), {
				topic: createdLesson.topic,
				lessonId: lessonDoc.id,
				createdAt: `${new Date().toISOString()}`,
				createdById: `${userInfo.uid}`,
				createdByName: `${userInfo.name}`,
				category: createdLesson.category?.toLowerCase() || "other",
			})
			queryClient.invalidateQueries(["lessonByAiTopics"]), setLoadingGenContentAI(false)
			setError(false)
			setLoadingGenContentAI(false)
			setSuccess(true)
			setTopic("")
			navigate(`/speak/${lessonDoc.id}`)
		} catch (error) {
			console.log("error", error)
			setLoadingGenContentAI(false)
			setError(true)
		}
	}

	function getObject(text: string) {
		const start = text.indexOf("{")
		const end = text.lastIndexOf("}") + 1
		const objectText = text.substring(start, end)
		const objectResult = eval("(" + objectText + ")")
		if (typeof objectResult === "object") {
			return objectResult
		} else {
			return {}
		}
	}

	if (error) return <ErrorPage />

	return (
		<Box sx={ComponentWrapperStyle}>
			<Typography
				fontWeight="bolder"
				sx={{ color: "#001663", m: 3, textAlign: "center", fontSize: { xs: 20, sm: 24 } }}
			>
				✨ Unleash the Power of AI! Generate Curriculum with a Click!
			</Typography>
			<Box sx={BoxStyleWrapper}>
				<Search>
					<SearchIconWrapper>🤖</SearchIconWrapper>
					<StyledInputBase
						placeholder="Write your topic…"
						inputProps={{ "aria-label": "search" }}
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
						onKeyPress={(e) => e.key === "Enter" && CreateAiLessonFunc()}
					/>
				</Search>
				<Button
					variant="contained"
					onClick={CreateAiLessonFunc}
					disabled={loadingGenContentAI || topic === ""}
					sx={ButtonStyle}
				>
					<AutoFixHighIcon sx={{ marginRight: "10px" }} /> {loadingGenContentAI ? "Loading..." : "Generate"}
				</Button>
			</Box>
			<Box
				sx={{
					display: "flex",
					margin: "10px",
					p: 1,
				}}
			>
				{loadingGenContentAI ? (
					<Box sx={{ width: "100%" }}>
						<LinearProgress />
						<Typography sx={{ m: 1, textAlign: "center" }}>
							Your Custom Curriculum is Underway! It takes around <b>1 minute</b> to create your curriculum.
						</Typography>
					</Box>
				) : success === true ? (
					<Alert severity="success" sx={{ p: 1, m: 2, paddingY: "0px", width: "fit-content" }}>
						Your curriculum has been successfully created!
					</Alert>
				) : (
					["Travel", "Book", "History", "Sport"].map((item) => (
						<Button
							onClick={() => setTopic(item)}
							sx={{ color: "white", border: "1px solid white", m: 1, display: { xs: "none", sm: "flex" } }}
						>
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
	marginLeft: "0px !important",
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

const ComponentWrapperStyle = {
	display: "flex",
	justifyContent: "center",
	flexDirection: "column",
	alignItems: "center",
	boxShadow: "rgba(50, 50, 93, 0.05) 0px 2px 5px -1px, rgba(0, 0, 0, 0.2) 0px 1px 3px -1px",
	width: "100%",
	minHeight: "250px",
	margin: "10px auto 20px",
	borderRadius: "8px",
	overflow: "hidden",
	position: "relative",
	background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
	borderBox: "box-sizing",
}

const BoxStyleWrapper = {
	display: "flex",
	flexDirection: { xs: "column", sm: "row" },
	width: "100%",
	p: 1,
	justifyContent: "center",
	alignItems: "center",
}

const ButtonStyle = {
	background: "rgb(50, 51, 49)",
	color: "white",
	fontWeight: "bold",
	fontSize: "12px",
	mr: "30px",
	margin: "auto",
	mt: { xs: 2, sm: "2px" },
}
