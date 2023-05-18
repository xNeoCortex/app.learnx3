import { useRouter } from "next/router"

function StudentProtectedRoute({ children, user }) {
	const { push: navigate } = useRouter()
	if (user) {
		return user?.role === "student" || user?.role === "admin" ? { children } : navigate("/error")
	}
}

export default StudentProtectedRoute
