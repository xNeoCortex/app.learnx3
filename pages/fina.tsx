import ProtectedRoute from "@/components/auth/ProtectedRoute"
import ExplainAI from "@/components/ExplainAI"
import FinaAI from "@/components/FinaAI"
import SidebarContainer from "@/components/SidebarContainer"
import { Avatar, Box, CssBaseline, TextareaAutosize, Typography } from "@mui/material"
import { useState } from "react"
import { auth } from "../components/FirebaseX"

function Fina() {
	const [question, setQuestion] = useState("")

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<FinaAI />
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default Fina
