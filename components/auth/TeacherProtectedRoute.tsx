import { useRouter } from "next/router"

function TeacherProtectedRoute({ children, user }) {
	const { push: navigate } = useRouter()

	if (user) {
		return user?.role === "teacher" || user?.role === "admin" ? { children } : navigate("/error")
	}
}

export default TeacherProtectedRoute
