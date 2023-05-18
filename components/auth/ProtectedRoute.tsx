import { useRouter } from "next/router"
import LoadingPage from "../LoadingPage"
import WaitingPage from "../other/WaitingPage"

function ProtectedRoute({ children, user, userInfo }) {
	const { push: navigate } = useRouter()

	if (user === undefined) {
		return <LoadingPage />
	}
	if (!userInfo.permit && userInfo.role == "teacher") return <WaitingPage />
	return user ? { children } : navigate("/auth/login")
}

export default ProtectedRoute
