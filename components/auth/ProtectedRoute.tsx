import { useEffect } from "react"
import { useRouter } from "next/router"
import ErrorPage from "../../pages/errorpage"
import WaitingPage from "../other/WaitingPage"
import { useStoreUser } from "../zustand"

function ProtectedRoute({ children, permitArray = [] }): any {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()

	useEffect(() => {
		!userInfo && navigate("/auth/login")
	}, [userInfo, permitArray])

	if ((!userInfo?.permit && userInfo?.role == "teacher") || (!userInfo?.permit && userInfo?.role == "student"))
		return <WaitingPage />

	if (!userInfo && !permitArray.includes(userInfo?.role)) {
		return <ErrorPage message="You do not have permission to visit this page!" />
	}
	if (userInfo && permitArray.includes(userInfo?.role)) {
		return <>{children}</>
	}
}

export default ProtectedRoute
