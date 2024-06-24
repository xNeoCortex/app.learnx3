"use client"
import React from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Canvas } from "@react-three/fiber"
import { Box, Grid } from "@mui/material"
import { Experience } from "@/components/Chat/Experience"
import Chat from "@/components/Chat/ChatPage"

export default function AvatarAIPage() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Grid
					container
					spacing={2}
					sx={{
						background: "black",
						height: "calc(100% - 80px)",
						width: "100%",
						overflow: "hidden",
						borderRadius: 3,
						padding: 2,
						margin: "auto",
					}}
				>
					<Grid item xs={8}>
						<CanvasContainer />
					</Grid>
					<Grid item xs={4}>
						<ChatBox />
					</Grid>
				</Grid>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

const CanvasContainer = () => (
	<Box
		//@ts-ignore
		sx={{
			height: "100%",
			width: "100%",
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
		display={"flex"}
		flexDirection={"column"}
		alignItems={"center"}
		justifyContent={"start"}
		margin={"0px"}
		border={"1px solid white"}
		borderRadius={4}
		right={10}
		padding={1}
		maxWidth={"420px"}
		height={"100%"}
		gap={1}
		sx={{
			WebkitBackdropFilter: "blur(30px)",
			backdropFilter: "blur(30px)",
		}}
	>
		<Chat />
	</Box>
)
