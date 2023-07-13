import { Box, Button, IconButton } from "@mui/material"
import { useState } from "react"
import { Configuration, OpenAIApi } from "openai"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import ClearIcon from "@mui/icons-material/Clear"
import { Family } from "../data/SpeakingNew"

function CreateTestAI({ topic = "Avengers", buttonTitle = "Create", bg = "white" }) {
	const [type, setType] = useState(true)

	const configuration = new Configuration({
		apiKey: process.env.NEXT_PUBLIC_OPENAI_KEY,
	})

	const openAI = new OpenAIApi(configuration)

	// const [prompt, setPrompt] = useState("");
	const [result, setResult] = useState("")
	const [loading, setLoading] = useState(false)

	const handleClick = async () => {
		setLoading(true)
		try {
			const response = await openAI.createChatCompletion({
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: "You are a very smart assistant which produces result only in JSON format",
					},
					{
						role: "user",
						content: `Create english language curriculum topic Family. Return it in JSON format. I will use the document on my website to create content for english language platform so children could learn speaking english. limit answer to 3800 token.`,
					},
					{
						role: "assistant",
						content: `{
							level: "b1",
							topic: "Family",
							assessment: [],
							vocabularies: [
								{
									type: "noun",
									words: [
										{
											word: "family",
											synonyms: ["relatives", "kin", "clan"],
											definition: "a group consisting of parents and children living together in a household",
											example: "My family and I went on a vacation together.",
										},
										{
											word: "parent",
											synonyms: ["mother", "father", "guardian"],
											definition: "a person who is a mother or father",
											example: "My parents always support me in everything I do.",
										},
										{
											word: "sibling",
											synonyms: ["brother", "sister"],
											definition: "a brother or sister",
											example: "I have two siblings, an older brother and a younger sister.",
										},
										{
											word: "grandparent",
											synonyms: ["grandfather", "grandmother"],
											definition: "a parent of one's parent",
											example: "My grandparents often tell me stories from their childhood.",
										},
										{
											word: "cousin",
											synonyms: [],
											definition: "a child of one's aunt or uncle",
											example: "I enjoy spending time with my cousins during family gatherings.",
										},
										{
											word: "aunt",
											synonyms: [],
											definition: "the sister of one's parent",
											example: "My aunt is a talented artist.",
										},
										{
											word: "uncle",
											synonyms: [],
											definition: "the brother of one's parent",
											example: "My uncle loves to take us on outdoor adventures.",
										},
									],
								},
								{
									type: "verb",
									words: [
										{
											word: "love",
											synonyms: ["adore", "care for", "cherish"],
											definition: "to have a deep affection or fondness for someone",
											example: "I love spending time with my family.",
										},
										{
											word: "support",
											synonyms: ["encourage", "assist", "back"],
											definition: "to give assistance, comfort, or encouragement to someone",
											example: "My parents always support me in pursuing my dreams.",
										},
										{
											word: "care",
											synonyms: ["concern", "worry", "attend to"],
											definition: "to feel concern or interest; to look after or provide for someone",
											example: "My older sister takes care of me when our parents are away.",
										},
										{
											word: "spend",
											synonyms: ["utilize", "pass", "use"],
											definition: "to use time in a particular way or for a particular purpose",
											example: "I love to spend quality time with my grandparents.",
										},
										{
											word: "share",
											synonyms: ["give", "divide", "contribute"],
											definition: "to have or use something in common with others",
											example: "My siblings and I share a room.",
										},
										{
											word: "visit",
											synonyms: ["go to", "call on", "see"],
											definition: "to go to see or spend time with someone",
											example: "We visit our cousins during summer vacation.",
										},
									],
								},
								{
									type: "adverb",
									words: [
										{
											word: "together",
											synonyms: ["united", "jointly", "in concert"],
											definition: "in or into one gathering, company, mass, place, or body",
											example: "We love to do activities together as a family.",
										},
										{
											word: "happily",
											synonyms: ["joyfully", "cheerfully", "contentedly"],
											definition: "in a happy or joyful manner",
											example: "We spent a day at the beach, happily building sandcastles.",
										},
										{
											word: "closely",
											synonyms: ["intimately", "tightly", "near"],
											definition: "in a way that is close or near",
											example: "I am closely connected to my siblings.",
										},
										{
											word: "always",
											synonyms: ["forever", "constantly", "perpetually"],
											definition: "at all times; on every occasion",
											example: "I can always count on my family for support.",
										},
									],
								},
								{
									type: "adjective",
									words: [
										{
											word: "loving",
											synonyms: ["affectionate", "caring", "warm"],
											definition: "showing love or affection",
											example: "My family has a loving and supportive environment.",
										},
										{
											word: "close",
											synonyms: ["intimate", "tight-knit", "familiar"],
											definition: "having strong emotional or familial bonds",
											example: "We have a close-knit family that always sticks together.",
										},
										{
											word: "big",
											synonyms: ["large", "enormous", "massive"],
											definition: "having a great size or extent",
											example: "I have a big extended family with many relatives.",
										},
										{
											word: "extended",
											synonyms: ["expanded", "prolonged", "enlarged"],
											definition: "involving more than the nuclear family",
											example: "During the holidays, we gather with our extended family.",
										},
									],
								},
							],
							conversation: {
								title: "Conversation",
								content: [
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
								"How was your day?",
								"What did you do today?",
								"Do you have any siblings?",
								"Who is your favorite family member?",
								"What activities do you enjoy doing with your family?",
								"How often do you visit your grandparents?",
								"What does family mean to you?",
								"Who supports you the most in your family?",
								"Do you have any family traditions?",
								"What are some things you love about your family?",
							],
						}`,
					},
					{
						role: "user",
						content: `Create english language curriculum topic ${topic}. Return it in JSON format. I will use the document on my website to create content for english language platform so children could learn speaking english. limit answer to 3800 token.`,
					},
				],
				temperature: 0.7,
				max_tokens: 2000,
				presence_penalty: 0,
			})
			console.log("response.data.choices :>> ", response.data.choices[0].message)
			setResult(response.data.choices[0].message.content)
			setLoading(false)
		} catch (error) {
			console.error(error)
			setLoading(false)
		}
	}
	console.log("result :>> ", result)

	function getArray(text) {
		const start = text.indexOf("[")
		const end = text.lastIndexOf("]") + 1
		const arrayText = text.substring(start, end)
		const array = eval(arrayText)
		if (array?.length > 0 && typeof array === "object") {
			return array
		} else {
			return []
		}
	}

	return (
		<Box
			sx={{
				display: "flex",
				alignItems: "start",
				background: bg || "white",
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
				{result.length > 0 && (
					<Box
						sx={{
							position: "absolute",
							right: 5,
							color: "black",
							cursor: "pointer",
						}}
						onClick={() => setResult("")}
					>
						<IconButton>
							<ClearIcon />
						</IconButton>
					</Box>
				)}
				<Button
					variant="contained"
					onClick={handleClick}
					disabled={loading}
					style={{
						background: "rgb(50, 51, 49)",
						color: "white",
						fontWeight: "bold",
						fontSize: 12,
					}}
				>
					<AutoFixHighIcon style={{ marginRight: 10 }} /> {loading ? "Loading..." : buttonTitle}
				</Button>
				<Button onClick={() => setType(!type)}>{type ? "True" : "false"}</Button>
				<div
					style={{
						width: "100%",
						minHeight: "100%",
						color: "black",
						margin: "20px 2px",
					}}
				>
					<p
						dangerouslySetInnerHTML={{
							__html: result.replace(/\n/g, "<br />"),
						}}
					/>
				</div>
				<div>{/* <Test data={getArray(result)} /> */}</div>
			</Box>
		</Box>
	)
}

export default CreateTestAI

export const FamilyX = {
	level: "b1",
	topic: "Family",
	assessment: [],
	vocabularies: [
		{
			type: "noun",
			words: [
				{
					word: "family",
					synonyms: ["relatives", "kin", "clan"],
					definition: "a group consisting of parents and children living together in a household",
					example: "My family and I went on a vacation together.",
				},
				{
					word: "parent",
					synonyms: ["mother", "father", "guardian"],
					definition: "a person who is a mother or father",
					example: "My parents always support me in everything I do.",
				},
				{
					word: "sibling",
					synonyms: ["brother", "sister"],
					definition: "a brother or sister",
					example: "I have two siblings, an older brother and a younger sister.",
				},
				{
					word: "grandparent",
					synonyms: ["grandfather", "grandmother"],
					definition: "a parent of one's parent",
					example: "My grandparents often tell me stories from their childhood.",
				},
				{
					word: "cousin",
					synonyms: [],
					definition: "a child of one's aunt or uncle",
					example: "I enjoy spending time with my cousins during family gatherings.",
				},
				{
					word: "aunt",
					synonyms: [],
					definition: "the sister of one's parent",
					example: "My aunt is a talented artist.",
				},
				{
					word: "uncle",
					synonyms: [],
					definition: "the brother of one's parent",
					example: "My uncle loves to take us on outdoor adventures.",
				},
			],
		},
		{
			type: "verb",
			words: [
				{
					word: "love",
					synonyms: ["adore", "care for", "cherish"],
					definition: "to have a deep affection or fondness for someone",
					example: "I love spending time with my family.",
				},
				{
					word: "support",
					synonyms: ["encourage", "assist", "back"],
					definition: "to give assistance, comfort, or encouragement to someone",
					example: "My parents always support me in pursuing my dreams.",
				},
				{
					word: "care",
					synonyms: ["concern", "worry", "attend to"],
					definition: "to feel concern or interest; to look after or provide for someone",
					example: "My older sister takes care of me when our parents are away.",
				},
				{
					word: "spend",
					synonyms: ["utilize", "pass", "use"],
					definition: "to use time in a particular way or for a particular purpose",
					example: "I love to spend quality time with my grandparents.",
				},
				{
					word: "share",
					synonyms: ["give", "divide", "contribute"],
					definition: "to have or use something in common with others",
					example: "My siblings and I share a room.",
				},
				{
					word: "visit",
					synonyms: ["go to", "call on", "see"],
					definition: "to go to see or spend time with someone",
					example: "We visit our cousins during summer vacation.",
				},
			],
		},
		{
			type: "adverb",
			words: [
				{
					word: "together",
					synonyms: ["united", "jointly", "in concert"],
					definition: "in or into one gathering, company, mass, place, or body",
					example: "We love to do activities together as a family.",
				},
				{
					word: "happily",
					synonyms: ["joyfully", "cheerfully", "contentedly"],
					definition: "in a happy or joyful manner",
					example: "We spent a day at the beach, happily building sandcastles.",
				},
				{
					word: "closely",
					synonyms: ["intimately", "tightly", "near"],
					definition: "in a way that is close or near",
					example: "I am closely connected to my siblings.",
				},
				{
					word: "always",
					synonyms: ["forever", "constantly", "perpetually"],
					definition: "at all times; on every occasion",
					example: "I can always count on my family for support.",
				},
			],
		},
		{
			type: "adjective",
			words: [
				{
					word: "loving",
					synonyms: ["affectionate", "caring", "warm"],
					definition: "showing love or affection",
					example: "My family has a loving and supportive environment.",
				},
				{
					word: "close",
					synonyms: ["intimate", "tight-knit", "familiar"],
					definition: "having strong emotional or familial bonds",
					example: "We have a close-knit family that always sticks together.",
				},
				{
					word: "big",
					synonyms: ["large", "enormous", "massive"],
					definition: "having a great size or extent",
					example: "I have a big extended family with many relatives.",
				},
				{
					word: "extended",
					synonyms: ["expanded", "prolonged", "enlarged"],
					definition: "involving more than the nuclear family",
					example: "During the holidays, we gather with our extended family.",
				},
			],
		},
	],
	conversation: {
		title: "Conversation",
		content: [
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
	},
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
		"How was your day?",
		"What did you do today?",
		"Do you have any siblings?",
		"Who is your favorite family member?",
		"What activities do you enjoy doing with your family?",
		"How often do you visit your grandparents?",
		"What does family mean to you?",
		"Who supports you the most in your family?",
		"Do you have any family traditions?",
		"What are some things you love about your family?",
	],
}
