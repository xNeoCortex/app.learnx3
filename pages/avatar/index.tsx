import React from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Canvas } from "@react-three/fiber"
import { Container, Box, Typography } from "@mui/material"
import { Experience } from "@/components/Chat/Experience"
import Chat from "@/components/Chat/ChatPage"
import UseAudioRecorder from "@/components/Chat/UseAudioRecorder"

export default function HomeX() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Container maxWidth="sm">
					<Box
						padding={10}
						display={"flex"}
						justifyContent={"center"}
						alignItems={"start"}
						width={"100vw"}
						height="100vh"
						color="white"
						sx={{
							background: "black",
						}}
					>
						<Box
							display={"flex"}
							flex={2}
							height={"100%"}
							flexDirection={"column"}
							alignItems={"start"}
							marginTop={"25px"}
							position={"relative"}
						>
							<Typography variant="h2">AI Avatar</Typography>
							<CanvasContainer />
							<ChatBox />
							<AudioRecorderContainer />
						</Box>
					</Box>
				</Container>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

const CanvasContainer = () => (
	<Box
		//@ts-ignore
		sx={{
			minHeight: "400px",
			width: "100%",
			height: "600px",
		}}
	>
		<Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
			<color attach="background" args={["#ececec"]} />
			<Experience />
		</Canvas>
	</Box>
)

const ChatBox = () => (
	<Box
		position={"absolute"}
		flex={1}
		maxWidth={"450px"}
		display={"flex"}
		flexDirection={"column"}
		alignItems={"center"}
		margin={"50px 25px"}
		justifyContent={"start"}
		border={"1px solid white"}
		borderRadius={10}
		right={0}
		padding={3}
		minHeight={550}
		height={"auto"}
		gap={1}
		sx={{
			WebkitBackdropFilter: "blur(30px)",
			backdropFilter: "blur(30px)",
		}}
	>
		<Typography color={"white"} fontWeight={"bold"} fontStyle={"italic"}>
			Talk to Fina
		</Typography>
		<Chat />
	</Box>
)

const AudioRecorderContainer = () => (
	<Box position={"relative"} bottom={10} marginTop={"-100px"} width={"100%"} display={"flex"} justifyContent={"center"}>
		{/* <UseAudioRecorder /> */} UseAudioRecorder
	</Box>
)
