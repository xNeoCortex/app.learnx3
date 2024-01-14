import { Alert, Box, Button, LinearProgress, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import { useStoreUser, useStoreTemporary } from "../zustand"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import InputBase from "@mui/material/InputBase"
import { styled, alpha } from "@mui/material/styles"
import ErrorPage from "../../pages/errorpage"
import { collection, addDoc } from "firebase/firestore"
import { Configuration, OpenAIApi } from "openai"
import { db } from "../firebaseX"
import { useRouter } from "next/router"

function CreateAiLesson() {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()
	const { loadingGenContentAI, setLoadingGenContentAI } = useStoreTemporary()
	const [topic, setTopic] = useState("")
	const [error, setError] = useState(false)
	const [success, setSuccess] = useState(false)
	const queryClient = useQueryClient()

	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	})
	const openAI = new OpenAIApi(configuration)

	async function CreateAiLessonFunc() {
		setLoadingGenContentAI(true)
		try {
			const response = await openAI.createChatCompletion({
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
						content: `{
							level: "b1",
							topic: "family",
							category: "family",
							assessment: [],
							vocabularies: [
								{
									type: "noun",
									word: "family",
									synonyms: ["relatives", "kin", "clan"],
									definition: "a group consisting of parents and children living together in a household",
									example: "My family and I went on a vacation together.",
								},
								{
									type: "noun",
									word: "parent",
									synonyms: ["mother", "father", "guardian"],
									definition: "a person who is a mother or father",
									example: "My parents always support me in everything I do.",
								},
								{
									type: "noun",
									word: "sibling",
									synonyms: ["brother", "sister"],
									definition: "a brother or sister",
									example: "I have two siblings, an older brother and a younger sister.",
								},
								{
									type: "noun",
									word: "grandparent",
									synonyms: ["grandfather", "grandmother"],
									definition: "a parent of one's parent",
									example: "My grandparents often tell me stories from their childhood.",
								},
								{
									type: "noun",
									word: "cousin",
									synonyms: [],
									definition: "a child of one's aunt or uncle",
									example: "I enjoy spending time with my cousins during family gatherings.",
								},
								{
									type: "noun",
									word: "aunt",
									synonyms: [],
									definition: "the sister of one's parent",
									example: "My aunt is a talented artist.",
								},
								{
									type: "noun",
									word: "uncle",
									synonyms: [],
									definition: "the brother of one's parent",
									example: "My uncle loves to take us on outdoor adventures.",
								},
								{
									type: "verb",
									word: "love",
									synonyms: ["adore", "care for", "cherish"],
									definition: "to have a deep affection or fondness for someone",
									example: "I love spending time with my family.",
								},
								{
									type: "verb",
									word: "support",
									synonyms: ["encourage", "assist", "back"],
									definition: "to give assistance, comfort, or encouragement to someone",
									example: "My parents always support me in pursuing my dreams.",
								},
								{
									type: "verb",
									word: "care",
									synonyms: ["concern", "worry", "attend to"],
									definition: "to feel concern or interest; to look after or provide for someone",
									example: "My older sister takes care of me when our parents are away.",
								},
								{
									type: "verb",
									word: "spend",
									synonyms: ["utilize", "pass", "use"],
									definition: "to use time in a particular way or for a particular purpose",
									example: "I love to spend quality time with my grandparents.",
								},
								{
									type: "verb",
									word: "share",
									synonyms: ["give", "divide", "contribute"],
									definition: "to have or use something in common with others",
									example: "My siblings and I share a room.",
								},
						
								{
									type: "adverb",
									word: "together",
									synonyms: ["united", "jointly", "in concert"],
									definition: "in or into one gathering, company, mass, place, or body",
									example: "We love to do activities together as a family.",
								},
								{
									type: "adverb",
									word: "happily",
									synonyms: ["joyfully", "cheerfully", "contentedly"],
									definition: "in a happy or joyful manner",
									example: "We spent a day at the beach, happily building sandcastles.",
								},
								{
									type: "adverb",
									word: "closely",
									synonyms: ["intimately", "tightly", "near"],
									definition: "in a way that is close or near",
									example: "I am closely connected to my siblings.",
								},
								{
									type: "adverb",
									word: "always",
									synonyms: ["forever", "constantly", "perpetually"],
									definition: "at all times; on every occasion",
									example: "I can always count on my family for support.",
								},
						
								{
									type: "adjective",
									word: "loving",
									synonyms: ["affectionate", "caring", "warm"],
									definition: "showing love or affection",
									example: "My family has a loving and supportive environment.",
								},
								{
									type: "adjective",
									word: "close",
									synonyms: ["intimate", "tight-knit", "familiar"],
									definition: "having strong emotional or familial bonds",
									example: "We have a close-knit family that always sticks together.",
								},
								{
									type: "adjective",
									word: "big",
									synonyms: ["large", "enormous", "massive"],
									definition: "having a great size or extent",
									example: "I have a big extended family with many relatives.",
								},
								{
									type: "adjective",
									word: "extended",
									synonyms: ["expanded", "prolonged", "enlarged"],
									definition: "involving more than the nuclear family",
									example: "During the holidays, we gather with our extended family.",
								},
							],
							conversation: [
								{
									speaker: "Child",
									content: "Hi Mom! How was your day?",
									order: 1,
								},
								{
									speaker: "Parent",
									content: "Hi sweetheart! It was good. How about yours?",
									order: 2,
								},
								{
									speaker: "Child",
									content: "I had a fun day at school. I played with my friends during recess.",
									order: 3,
								},
								{
									speaker: "Parent",
									content: "That's great to hear! Did you learn anything interesting in class today?",
									order: 4,
								},
								{
									speaker: "Child",
									content: "Yes, we learned about animals and their habitats. It was fascinating!",
									order: 5,
								},
								{
									speaker: "Parent",
									content: "Wow! I'm glad you enjoyed your lesson. Is there anything else you'd like to share?",
									order: 6,
								},
								{
									speaker: "Child",
									content: "Yes, I need your help with my homework. Can you assist me with math?",
									order: 7,
								},
								{
									speaker: "Parent",
									content: "Of course! I'll be happy to help you with your math homework. Let's work on it together.",
									order: 8,
								},
								{
									speaker: "Child",
									content: "Thank you, Mom! You're the best.",
									order: 9,
								},
								{
									speaker: "Parent",
									content: "You're welcome, sweetheart. I'm always here to support you. Let's get started with the homework.",
									order: 10,
								},
							],
							exercise: {
								name: "Multiple Choice Questions",
								topic: "Family",
								type: "multiple-choice",
								questions: [
									{
										question: "What is the definition of the word 'family'?",
										options: [
											{
												option: "a group of friends",
												correct: false,
											},
											{
												option: "a group of people living in the same neighborhood",
												correct: false,
											},
											{
												option: "a group consisting of parents and children living together in a household",
												correct: true,
											},
											{
												option: "a group of classmates",
												correct: false,
											},
										],
									},
									{
										question: "Who is a person who is a mother or father?",
										options: [
											{
												option: "sibling",
												correct: false,
											},
											{
												option: "grandparent",
												correct: false,
											},
											{
												option: "parent",
												correct: true,
											},
											{
												option: "cousin",
												correct: false,
											},
										],
									},
									{
										question: "Which word describes 'having strong emotional or familial bonds'?",
										options: [
											{
												option: "loving",
												correct: false,
											},
											{
												option: "big",
												correct: false,
											},
											{
												option: "close",
												correct: true,
											},
											{
												option: "extended",
												correct: false,
											},
										],
									},
									{
										question: "What does the verb 'support' mean?",
										options: [
											{
												option: "to give assistance or encouragement",
												correct: true,
											},
											{
												option: "to spend time with friends",
												correct: false,
											},
											{
												option: "to share belongings",
												correct: false,
											},
											{
												option: "to care for pets",
												correct: false,
											},
										],
									},
									{
										question: "Who is a brother or sister?",
										options: [
											{
												option: "parent",
												correct: false,
											},
											{
												option: "grandparent",
												correct: false,
											},
											{
												option: "sibling",
												correct: true,
											},
											{
												option: "aunt",
												correct: false,
											},
										],
									},
									{
										question: "Which term means 'in a way that is close or near'?",
										options: [
											{
												option: "together",
												correct: false,
											},
											{
												option: "happily",
												correct: false,
											},
											{
												option: "closely",
												correct: true,
											},
											{
												option: "always",
												correct: false,
											},
										],
									},
									{
										question:
											"What is a person called when they are related to you through your parents but are not your siblings?",
										options: [
											{
												option: "cousin",
												correct: true,
											},
											{
												option: "uncle",
												correct: false,
											},
											{
												option: "aunt",
												correct: false,
											},
											{
												option: "niece",
												correct: false,
											},
										],
									},
									{
										question:
											"Which word describes a family that includes parents, children, grandparents, aunts, uncles, and cousins?",
										options: [
											{
												option: "nuclear family",
												correct: false,
											},
											{
												option: "extended family",
												correct: true,
											},
											{
												option: "blended family",
												correct: false,
											},
											{
												option: "single-parent family",
												correct: false,
											},
										],
									},
									{
										question:
											"What is a person called when they are married to one of your parents but are not your biological parent?",
										options: [
											{
												option: "step-parent",
												correct: true,
											},
											{
												option: "sibling",
												correct: false,
											},
											{
												option: "grandparent",
												correct: false,
											},
											{
												option: "cousin",
												correct: false,
											},
										],
									},
									{
										question: "Which word describes the relationship between siblings who were born to the same parents?",
										options: [
											{
												option: "adopted",
												correct: false,
											},
											{
												option: "biological",
												correct: true,
											},
											{
												option: "step",
												correct: false,
											},
											{
												option: "half",
												correct: false,
											},
										],
									},
								],
							},
							phrases: [
								"How was your day?",
								"I love spending time with my family.",
								"My parents always support me.",
								"We spent a day at the park together.",
								"I care deeply for my siblings.",
								"Let's visit our grandparents this weekend.",
								"Our family enjoys going on vacations.",
								"I'm grateful for my loving family.",
								"We share a strong bond.",
								"I'm always there for my family.",
							],
							questions: [
								{
								  "question": "How was your day?",
								  "sample_answer": "My day was great! I went to the park with my family and we had a lot of fun."
								},
								{
								  "question": "What did you do today?",
								  "sample_answer": "I went to school, then I helped my mom with the dishes. After that, I played video games with my brother."
								},
								{
								  "question": "Do you have any siblings?",
								  "sample_answer": "Yes, I have one older brother."
								},
								{
								  "question": "Who is your favorite family member?",
								  "sample_answer": "My favorite family member is my mom. She is always there for me and she makes me feel loved."
								},
								{
								  "question": "What activities do you enjoy doing with your family?",
								  "sample_answer": "I enjoy going to the park, playing board games, and watching movies with my family."
								},
								{
								  "question": "How often do you visit your grandparents?",
								  "sample_answer": "I visit my grandparents once a month. We usually go out to eat or just hang out at their house."
								},
								{
								  "question": "What does family mean to you?",
								  "sample_answer": "Family means the world to me. They are the people who love and support me unconditionally."
								},
								{
								  "question": "Who supports you the most in your family?",
								  "sample_answer": "My mom supports me the most in my family. She is always there for me when I need her."
								},
								{
								  "question": "Do you have any family traditions?",
								  "sample_answer": "Yes, we have a few family traditions. We always go to the beach on the Fourth of July and we have a big Christmas Eve dinner every year."
								},
								{
								  "question": "What are some things you love about your family?",
								  "sample_answer": "I love that my family is always there for me. They are always there to celebrate my successes and help me through my challenges."
								}
							  ]
						}`,
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
			const createdLesson = getObject(response.data.choices[0].message.content)

			const lessonDoc = await addDoc(collection(db, "lessonByAi"), {
				...createdLesson,
				createdAt: `${new Date().toISOString()}`,
				createdById: `${userInfo.uid}`,
				createdByName: `${userInfo.name}`,
			})
			const topicDoc = await addDoc(collection(db, "lessonByAiTopics"), {
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

	function getObject(text) {
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

	// useEffect(() => {
	// 	setTopic("")
	// 	setSuccess(false)
	// }, [])

	if (error) return <ErrorPage />

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
				margin: "10px auto 20px",
				borderRadius: "8px",
				overflow: "hidden",
				position: "relative",
				background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
				borderBox: "box-sizing",
			}}
		>
			<Typography
				fontWeight="bolder"
				sx={{ color: "#001663", m: 3, textAlign: "center", fontSize: { xs: 20, sm: 24 } }}
			>
				✨ Unleash the Power of AI! Generate Curriculum with a Click!
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: { xs: "column", sm: "row" },
					width: "100%",
					p: 1,
					justifyContent: "center",
				}}
			>
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
					sx={{
						background: "rgb(50, 51, 49)",
						color: "white",
						fontWeight: "bold",
						fontSize: "12px",
						mr: "30px",
						margin: "auto",
						mt: { xs: 2, sm: "2px" },
					}}
				>
					<AutoFixHighIcon style={{ marginRight: 10 }} /> {loadingGenContentAI ? "Loading..." : "Generate"}
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
