import { createRef, useEffect, useState } from "react"
import { Configuration, OpenAIApi } from "openai"
import { auth } from "@/components/firebaseX"
import { styled, alpha, useTheme } from "@mui/material/styles"
import { Avatar, Box, Button, Grid, IconButton, Typography, useMediaQuery } from "@mui/material"
import SendIcon from "@mui/icons-material/Send"
import InputBase from "@mui/material/InputBase"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import dayjs from "dayjs"
import TextToSpeechButton from "@/components/speakpage/TextToSpeechButton"
import { useStoreTemporary, useStoreUser } from "@/components/zustand"
import DeleteIcon from "@mui/icons-material/Delete"

const Fina: React.FC<{ setOpen?: any }> = ({ setOpen }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const { userInfo } = useStoreUser()
	const [prompt, setPrompt] = useState("")
	const now = dayjs().format("MMM D, YYYY")
	const { botComponentWidth, setBotComponentWidth } = useStoreTemporary()
	const [messages, setMessages] = useState([
		{
			role: "assistant",
			content: ` Hi ${auth.currentUser?.displayName}! I am teacher Fina. How can I help you? 🙂`,
			order: 1,
		},
	])

	// message for chatGPT
	const messagesGPT = [...GPTMessage, ...messages, { role: "user", content: prompt }]

	// handle messages
	const handleMessage = (incomingMessage: { role: "assistant" | "user"; message: string }) => {
		setMessages((prevMessages) => [
			...prevMessages,
			{
				role: incomingMessage.role,
				content: incomingMessage.message,
				order: prevMessages.length + 1,
			},
		])
		setPrompt("")
	}

	// delete all messages
	const handleDelete = () => {
		setMessages([
			{
				role: "assistant",
				content: ` Hi ${auth.currentUser?.displayName || ""}! I am teacher Fina. How can I help you? 🙂`,
				order: 1,
			},
		])
	}

	//scroll to bottom
	const chatsRef = createRef()

	const scrollToBottom = () => {
		// @ts-ignore
		chatsRef.current.scrollTop = chatsRef.current.scrollHeight
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	return (
		<Box
			sx={{
				width: isSmallScreen ? "100vw" : botComponentWidth,
				height: "100vh",
				color: "white",
				transition: "all 0.3s ease-in-out",
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
				flexDirection: "column",
				background: "#271f4d",
				boxSizing: "border-box",
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					padding: "20px 10px 0px",
				}}
			>
				<IconButton
					sx={{ color: "#BAB9CC" }}
					onClick={() => (isSmallScreen ? setOpen(false) : setBotComponentWidth(0))}
				>
					<KeyboardDoubleArrowRightIcon />
				</IconButton>
				<Typography sx={{ width: "100%", textAlign: "center", color: "#BAB9CC" }}>{now}</Typography>
				<IconButton sx={{ color: "#BAB9CC" }} onClick={handleDelete}>
					<DeleteIcon />
				</IconButton>
			</Box>
			<Box sx={{ width: "100%", overflow: "scroll", height: "100%", padding: "20px 10px" }} ref={chatsRef}>
				<Grid spacing={1} container>
					{messages?.map((item, index) => (
						<Grid item xs={12} key={index}>
							<Box
								key={index}
								sx={{
									display: "flex",
									width: "100%",
									color: "#323331",
									justifyContent: item.order % 2 ? "start" : "end",
								}}
							>
								<Box
									sx={{
										display: "flex",
										width: "fit-content ",
										m: "5px 10px",
										padding: "5px 10px",
										height: "fit-content",
										alignItems: "center",
										borderRadius: 2,
										maxWidth: "80%",
										// background: "#ffadad0a",
										background: "white",
										boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
									}}
								>
									{item.order % 2 ? (
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<Avatar
												sx={{ width: 35, height: 35, mr: 2, border: "2px solid #5f61c4" }}
												alt="professor"
												src="/teacher_green.svg"
											/>
											{/* <Typography sx={{ fontSize: 15 }}> {item.content} </Typography> */}
											<p
												dangerouslySetInnerHTML={{
													__html: item.content.replace(/\n/g, "<br />"),
												}}
											/>
											<TextToSpeechButton text={item.content} buttonSize="25px" personType="female" />
										</Box>
									) : (
										<Box sx={{ display: "flex", alignItems: "center" }}>
											<TextToSpeechButton text={item.content} buttonSize="25px" personType="male" />
											<Typography sx={{ fontSize: 15 }}> {item.content} </Typography>
											<Avatar
												sx={{ width: 30, height: 30, ml: 2, border: "2px solid #5f61c4" }}
												alt="professor"
												src={userInfo?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
											/>
										</Box>
									)}
								</Box>
								{/* <TextToSpeechButton
									text={item.order % 2 ? item.content : item.content}
									buttonSize="25px"
									personType={item.order % 2 ? "female" : "male"}
								/> */}
							</Box>
						</Grid>
					))}
				</Grid>{" "}
			</Box>

			<BotFinaAI messagesGPT={messagesGPT} prompt={prompt} handleMessage={handleMessage} setPrompt={setPrompt} />
		</Box>
	)
}

export default Fina

const BotFinaAI = ({ messagesGPT, prompt, handleMessage, setPrompt }) => {
	//delete property order from messagesGPT
	const messages = messagesGPT.map(({ order, ...rest }) => rest)

	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	})
	const openAI = new OpenAIApi(configuration)
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		setLoading(true)
		try {
			const response = await openAI.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages,
				temperature: 0.9,
				max_tokens: 200,
				presence_penalty: 0,
			})
			handleMessage({ role: "assistant", message: response.data.choices[0].message.content })
			setLoading(false)
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				paddingTop: "12px",
				marginTop: 1,
				marginBottom: "10px",
				paddingLeft: { xs: "15px", sm: 0 },
				width: "100%",
				// borderTop: "1px solid grey",
			}}
		>
			<Search>
				<SearchIconWrapper>🤖</SearchIconWrapper>
				<StyledInputBase
					placeholder="Ask your question here..."
					inputProps={{ "aria-label": "search" }}
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					onKeyPress={(e) =>
						e.key === "Enter" && prompt?.length > 0 && handleClick() && handleMessage({ role: "user", message: prompt })
					}
				/>
			</Search>
			<Button
				variant="contained"
				onClick={() => (handleClick(), handleMessage({ role: "user", message: prompt }))}
				disabled={loading || prompt === ""}
				sx={{
					width: "100px",
					mr: "20px",
					textTransform: "none",
					background: "#5f61c4",
					color: "white !important",
					fontWeight: "600",
					padding: "3px 10px",
					"&:hover": { background: "#424493" },
				}}
			>
				<SendIcon style={{ marginRight: 10, width: 20 }} /> {loading ? "Loading..." : "Send"}
			</Button>
		</Box>
	)
}

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
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: { xs: "10ch", sm: "35ch" },
		},
	},
}))

const GPTMessage = [
	{
		role: "system",
		content:
			"You are english language teacher, you lead conversation and explain things in simple language so everyone can learn. Answers should be precise and short up to 100 token. You are a teacher, so you should be patient and kind. ",
	},
	{
		role: "user",
		content: "Good morning, teacher! How are you today?",
	},
	{
		role: "assistant",
		content: "Good morning! I'm doing well, thank you. How about you? How was your evening?",
	},
	{
		role: "user",
		content: "I'm doing great, thank you for asking. My evening was good. I spent some time doing my homework.",
	},
	{
		role: "assistant",
		content: "That's good to hear! I hope you didn't find the homework too challenging.",
	},
	{
		role: "user",
		content: "No, it was manageable. If I had any questions, I would have asked you in class.",
	},
	{
		role: "assistant",
		content:
			"I'm glad to know that you feel comfortable asking questions. Remember, I'm here to help anytime you need it.",
	},
	{
		role: "user",
		content: "Thank you, teacher. You explain things well, and it makes learning easier.",
	},
	{
		role: "assistant",
		content: "You're very welcome! I'm happy to hear that you find my explanations helpful.",
	},
	{
		role: "user",
		content: "Today's lesson on quadratic equations was interesting. I enjoyed solving the problems.",
	},
	{
		role: "assistant",
		content: "I'm pleased to hear that you found it interesting. Quadratic equations can be quite fascinating indeed!",
	},
	{
		role: "user",
		content: "Yes, they are. I think I'm getting the hang of it with practice.",
	},
	{
		role: "assistant",
		content: "That's the spirit! Practice is key to mastering any subject. Keep up the good work!",
	},
	{
		role: "user",
		content: "Thank you, teacher. I'll keep practicing and asking questions when needed.",
	},
	{
		role: "assistant",
		content: "That's the way to go. If you keep this up, I'm confident you'll excel in math and beyond.",
	},
]
