"use client"
import React from "react"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import { Canvas } from "@react-three/fiber"
import { Box, Grid } from "@mui/material"
import { Experience } from "@/components/Chat/Experience"
import Chat from "@/components/Chat/ChatPage"
import LoadingPage from "@/components/LoadingPage"

export default function AvatarAIPage() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Grid
					spacing={1}
					container
					sx={{
						background: "rgb(224, 225, 241)",
						height: "calc(100% - 80px)",
						width: "100%",
						overflow: "hidden",
						borderRadius: 3,
						padding: 1,
						margin: "-10px auto",
					}}
				>
					<Grid item xs={12} sm={7} sx={{ position: "relative" }}>
						<Box sx={{ position: "absolute", height: "100%", width: "100%" }}>
							<LoadingPage />
						</Box>
						<CanvasContainer />
					</Grid>
					<Grid item xs={12} sm={5} sx={{ height: "-webkit-fill-available" }}>
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
		borderRadius={2}
		overflow={"hidden"}
	>
		<Canvas shadows camera={{ position: [0, 0, 8], fov: 42 }}>
			<color attach="background" args={["#ececec"]} />
			<Experience />
		</Canvas>
	</Box>
)

const ChatBox = () => (
	<Box
		//@ts-ignore
		flex={1}
		display={"flex"}
		flexDirection={"column"}
		alignItems={"center"}
		justifyContent={"start"}
		margin={"0px"}
		border={"1px solid white"}
		borderRadius={2}
		right={10}
		padding={1}
		height={"100%"}
		width={"100%"}
		gap={1}
		sx={{
			WebkitBackdropFilter: "blur(30px)",
			backdropFilter: "blur(30px)",
			background: "#f5f5f7",
		}}
	>
		<Chat />
	</Box>
)
