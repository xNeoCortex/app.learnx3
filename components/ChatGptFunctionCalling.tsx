// "use client"
// import { use, useEffect, useState } from "react"
// import { Box, Button, Container, Flex, Input, Text } from "@chakra-ui/react"
// import { Configuration, OpenAIApi } from "openai"
// import { parseISO, format } from "date-fns"

// const ChatBotAI = () => {
// 	const [loading, setLoading] = useState(false)
// 	const [message, setMessage] = useState("")
// 	const [gptResponse, setGptResponse] = useState("")

// 	function get_user_location(name, workDay) {
// 		setLoading(true)
// 		try {
// 			const response = teamMembers.filter((member) =>
// 				member.displayName.toLowerCase().includes(name.toLowerCase())
// 			)?.[0]?.workLocation
// 			// ?.filter((dateStr) => {
// 			// 	const date = parseISO(dateStr.startDate)
// 			// 	console.log("date :>> ", date)
// 			// 	const dayOfWeek = format(date, "EEEE")
// 			// 	return dayOfWeek.toLowerCase() === workDay.toLowerCase()
// 			// })?.[0]

// 			setLoading(false)
// 			return teamMembers
// 		} catch (error) {
// 			console.error("Error fetching website content:", error)
// 			setLoading(false)
// 		}
// 	}

// 	const functionParameters = [
// 		{
// 			name: "get_user_location",
// 			description: "Get the location of the user or users",
// 			parameters: {
// 				type: "object",
// 				properties: {
// 					personName: {
// 						type: "string",
// 						description: "The user name, e.g. Nekruz",
// 					},
// 					workDay: {
// 						type: "string",
// 						description: "The work day, e.g. Monday",
// 						enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
// 					},
// 					// unit: {
// 					// 	type: "string",
// 					// 	enum: ["celsius", "fahrenheit"],
// 					// },
// 				},
// 				required: ["location", "personName", "workDay"],
// 			},
// 		},
// 	]

// 	const payload = {
// 		model: "gpt-3.5-turbo-16k",
// 		messages: [
// 			{
// 				role: "system",
// 				content: "You are an AI assistant that helps people find information.",
// 			},
// 			{
// 				role: "user",
// 				content: message,
// 			},
// 		],
// 		functions: functionParameters,
// 		function_call: "auto",
// 		temperature: 0.9,
// 		max_tokens: 200,
// 		presence_penalty: 0,
// 	}

// 	const configuration = new Configuration({
// 		apiKey: "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",
// 	})
// 	const openAI = new OpenAIApi(configuration)

// 	const handleClick = async () => {
// 		setLoading(true)
// 		try {
// 			//@ts-ignore
// 			const response = await openAI.createChatCompletion(payload)
// 			if (
// 				response.data.choices[0]?.finish_reason === "function_call" &&
// 				response.data.choices[0].message?.function_call.name === "get_user_location"
// 			) {
// 				const argumentsX = JSON.parse(response.data.choices[0].message?.function_call.arguments)
// 				const locationFromAPI = await get_user_location(argumentsX?.personName, argumentsX?.workDay)
// 				payload.messages.push({
// 					role: "function",
// 					// @ts-ignore
// 					name: "get_user_location",
// 					content: JSON.stringify({ workLocation: locationFromAPI }),
// 				})
// 				return handleClick()
// 			} else {
// 				setGptResponse(response.data.choices[0].message.content)
// 			}
// 			setLoading(false)
// 		} catch (error) {
// 			console.error(error)
// 			setLoading(false)
// 		}
// 	}

// 	return (
// 		<Flex
// 			as="header"
// 			zIndex="overlay"
// 			alignItems="start"
// 			mt="spacing-xl"
// 			h="calc(100vh - 130px)"
// 			bg="#100040"
// 			borderRadius="4px"
// 			boxShadow="0px 0.3px 0.9px rgba(50, 35, 97, 0.07), 0px 1.6px 3.6px rgba(50, 35, 97, 0.11)"
// 		>
// 			<Container
// 				as="section"
// 				width="100%"
// 				h="100%"
// 				maxW="1400px"
// 				paddingX="spacing-sm"
// 				display="flex"
// 				justifyContent="start"
// 				alignItems="start"
// 			>
// 				<Box
// 					as="article"
// 					display="flex"
// 					flexDirection="column"
// 					justifyContent="space-between"
// 					alignItems="flex-start"
// 					width="100%"
// 					paddingTop="spacing-lg"
// 					paddingX="spacing-xs"
// 					pb="20px"
// 					h="100%"
// 					borderRadius="4px"
// 					overflowY="auto"
// 				>
// 					<Text fontWeight="bold" mb="spacing-md" color="#E5E4FC">
// 						Hybrid AI Chatbot
// 					</Text>
// 					<Flex
// 						h="100%"
// 						width="100%"
// 						minH="400px"
// 						overflow="auto"
// 						pt="20px"
// 						pb="0px"
// 						mb="5px"
// 						flexDirection="column"
// 						color="black"
// 					>
// 						<Flex
// 							flexDirection="column"
// 							sx={{
// 								mb: 4,
// 								borderRadius: 4,
// 								bg: "white",
// 								p: 1,
// 								width: "100%",
// 							}}
// 						>
// 							<Text fontSize={14} fontWeight="semibold">
// 								👨 User
// 							</Text>
// 							<Text p={1}>{message || ""}</Text>
// 						</Flex>
// 						<Flex flexDirection="column" sx={{ mb: 4, borderRadius: 4, bg: "white", p: 1, width: "100%" }}>
// 							<Text fontSize={14} fontWeight="semibold">
// 								🤖 Hybrid AI
// 							</Text>
// 							<Text p={1}>{gptResponse || ""}</Text>
// 						</Flex>
// 					</Flex>
// 					<Flex flexDirection="column" width="100%">
// 						<Input
// 							focusBorderColor="brand"
// 							bg="white"
// 							name="url"
// 							value={message}
// 							onChange={(e) => setMessage(e.target.value)}
// 							type="text"
// 							placeholder="Enter message..."
// 							mb={["spacing-md", "spacing-none"]}
// 						/>
// 						<Button
// 							isDisabled={message.length === 0}
// 							type="submit"
// 							bg="brandLighter"
// 							color="white"
// 							mt={["spacing-md"]}
// 							h="40px"
// 							_hover={{
// 								textDecoration: "underline",
// 							}}
// 							onClick={handleClick}
// 							onKeyPress={(e) => e.key === "Enter" && handleClick()}
// 						>
// 							{loading ? "Loading..." : "Send"}
// 						</Button>
// 					</Flex>
// 				</Box>
// 			</Container>
// 		</Flex>
// 	)
// }

// export default ChatBotAI

// const teamMembers = [
// 	{
// 		businessPhones: [],
// 		displayName: "Nekruz",
// 		givenName: null,
// 		jobTitle: null,
// 		mail: "nekruz@staginghybridhealth.com",
// 		mobilePhone: null,
// 		officeLocation: null,
// 		preferredLanguage: null,
// 		surname: null,
// 		userPrincipalName: "nekruz@staginghybridhealth.com",
// 		id: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 		userId: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 		presence: {
// 			"@odata.type": "#microsoft.graph.presence",
// 			id: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 			availability: "Available",
// 			activity: "Available",
// 		},
// 		workLocation: [
// 			{
// 				_id: "64d9f43c40aed81c571ecb1c",
// 				userId: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 				locationId: "4bc2fb5d-0be1-439b-9c51-aac2c33cc30c",
// 				startDate: "2023-08-13T23:00:00.000Z",
// 				endDate: "2023-08-14T23:00:00.000Z",
// 				location: "home",
// 				timeZone: "Europe/London",
// 				note: "",
// 			},
// 			{
// 				_id: "64d9f43d3c55c1fd4229390d",
// 				userId: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 				locationId: "",
// 				startDate: "2023-08-14T23:00:00.000Z",
// 				endDate: "2023-08-15T23:00:00.000Z",
// 				location: "office",
// 				timeZone: "Europe/London",
// 				note: "Hello",
// 			},
// 			{
// 				_id: "64d9f43e5d3bf28b658dc2e8",
// 				userId: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 				locationId: "4bc2fb5d-0be1-439b-9c51-aac2c33cc30c",
// 				startDate: "2023-08-15T23:00:00.000Z",
// 				endDate: "2023-08-16T23:00:00.000Z",
// 				location: "office",
// 			},
// 			{
// 				_id: "64d9f43ea7c83c27802f9c6f",
// 				userId: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 				locationId: "",
// 				startDate: "2023-08-16T23:00:00.000Z",
// 				endDate: "2023-08-17T23:00:00.000Z",
// 				location: "mobile",
// 			},
// 			{
// 				_id: "64d9f43fe9ba47cea82540be",
// 				userId: "cd39ce10-93f1-4746-83fc-58852463fbe0",
// 				locationId: "away",
// 				startDate: "2023-08-17T23:00:00.000Z",
// 				endDate: "2023-08-18T23:00:00.000Z",
// 				location: "away",
// 			},
// 		],
// 		isActive: true,
// 		isStarColleague: false,
// 	},
// 	{
// 		businessPhones: ["610422481554"],
// 		displayName: "Ric Lavers",
// 		givenName: "Ric",
// 		jobTitle: null,
// 		mail: "ric-lavers@7jqq62.onmicrosoft.com",
// 		mobilePhone: null,
// 		officeLocation: "London",
// 		preferredLanguage: "en-US",
// 		surname: "Lavers",
// 		userPrincipalName: "ric-lavers@7jqq62.onmicrosoft.com",
// 		id: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 		userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 		presence: {
// 			"@odata.type": "#microsoft.graph.presence",
// 			id: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 			availability: "Available",
// 			activity: "Available",
// 		},
// 		workLocation: [
// 			{
// 				_id: "64d22c26293cd116d6a7e2fc",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				timeZone: "Europe/London",
// 				note: "tuesday",
// 				locationId: "4bc2fb5d-0be1-439b-9c51-aac2c33cc30c",
// 				startDate: "2023-08-07T23:00:00.000Z",
// 				endDate: "2023-08-08T23:00:00.000Z",
// 				location: "office",
// 			},
// 			{
// 				_id: "64d22c57ee89c8bbbbcefe75",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				timeZone: "Europe/London",
// 				note: "Wednesday",
// 				locationId: "",
// 				startDate: "2023-08-08T23:00:00.000Z",
// 				endDate: "2023-08-09T23:00:00.000Z",
// 				location: "home",
// 			},
// 			{
// 				_id: "64d22d08958084ef4b28e53f",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				timeZone: "Europe/London",
// 				note: "thursday",
// 				locationId: "",
// 				startDate: "2023-08-09T23:00:00.000Z",
// 				endDate: "2023-08-10T23:00:00.000Z",
// 				location: "home",
// 			},
// 			{
// 				_id: "64d26292f509cd71742d2a22",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				timeZone: "Europe/London",
// 				note: "",
// 				locationId: "",
// 				startDate: "2023-08-10T23:00:00.000Z",
// 				endDate: "2023-08-11T23:00:00.000Z",
// 				location: "mobile",
// 			},
// 			{
// 				_id: "64d9f4fc5b0d418c83710390",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				locationId: "",
// 				startDate: "2023-08-13T23:00:00.000Z",
// 				endDate: "2023-08-14T23:00:00.000Z",
// 				location: "mobile",
// 				timeZone: "Europe/London",
// 				note: "jj",
// 			},
// 			{
// 				_id: "64d9f4fd160a5789cc0bf76f",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				locationId: "4bc2fb5d-0be1-439b-9c51-aac2c33cc30c",
// 				startDate: "2023-08-14T23:00:00.000Z",
// 				endDate: "2023-08-15T23:00:00.000Z",
// 				location: "office",
// 				timeZone: "Europe/London",
// 				note: "",
// 			},
// 			{
// 				_id: "64d9f89bf2b5ddcc444120d3",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				timeZone: "Europe/London",
// 				note: "",
// 				locationId: "",
// 				startDate: "2023-08-15T23:00:00.000Z",
// 				endDate: "2023-08-16T23:00:00.000Z",
// 				location: "home",
// 			},
// 			{
// 				_id: "64d9fd975d3b7cb151a1d9a7",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				timeZone: "Europe/London",
// 				note: "",
// 				locationId: "away",
// 				startDate: "2023-08-16T23:00:00.000Z",
// 				endDate: "2023-08-17T23:00:00.000Z",
// 				location: "away",
// 			},
// 			{
// 				_id: "64d9fda168c8af91d072f2d4",
// 				userId: "0dc18eee-85e2-4ffa-a118-155601cd0044",
// 				timeZone: "Europe/London",
// 				note: "",
// 				locationId: "away",
// 				startDate: "2023-08-17T23:00:00.000Z",
// 				endDate: "2023-08-18T23:00:00.000Z",
// 				location: "away",
// 			},
// 		],
// 		isActive: true,
// 		isStarColleague: true,
// 	},
// ]
