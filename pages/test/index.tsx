import React from "react"
import { TestData } from "@/components/data/TestData"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import EnglishTest from "@/components/EnglishTest"

function Test(props) {
	const uniqueTests = TestData.filter(
		(obj, index) => TestData.findIndex((item) => item.topic_id === obj.topic_id) === index
	)

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<EnglishTest />
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default Test
