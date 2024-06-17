"use client"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import StudentCardList from "@/components/student/StudentCardList"

function ClassStudents() {
	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<StudentCardList />
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default ClassStudents
