"use client"
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
				<Box
					display={"flex"}
					justifyContent={"center"}
					alignItems={"start"}
					width={"100vw"}
					height={"calc(100vh - 120px)"}
					color="white"
					overflow={"hidden"}
					maxWidth={"100%"}
					borderRadius={4}
					position={"relative"}
					p={2}
					sx={{
						background: "black",
					}}
				>
					<CanvasContainer />
					<ChatBox />
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

const CanvasContainer = () => (
	<Box
		//@ts-ignore
		sx={{
			height: "-webkit-fill-available",
			width: "-webkit-fill-available",
			flex: 1,
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
		flex={1}
		position={"absolute"}
		display={"flex"}
		flexDirection={"column"}
		alignItems={"center"}
		justifyContent={"start"}
		margin={"20px"}
		border={"1px solid white"}
		borderRadius={4}
		right={10}
		padding={1}
		maxWidth={"420px"}
		height={"90%"}
		gap={1}
		sx={{
			WebkitBackdropFilter: "blur(30px)",
			backdropFilter: "blur(30px)",
		}}
	>
		<Chat />
	</Box>
)
