import ProtectedRoute from "@/components/auth/ProtectedRoute"
import FinaAI from "@/components/FinaAI"
import SidebarContainer from "@/components/SidebarContainer"
import { useState } from "react"

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
