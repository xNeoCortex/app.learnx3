import { useRouter } from "next/router"
import { useEffect } from "react"
import WaitingPage from "../other/WaitingPage"
import { useStoreUser } from "../Zustand"

function ProtectedRoute({ children, permitArray = [] }): any {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()

	useEffect(() => {
		!userInfo && navigate("/auth/login")
		!permitArray.includes(userInfo?.role) && navigate("/error")
	}, [userInfo, permitArray])

	if (!userInfo?.permit && userInfo?.role == "teacher") return <WaitingPage />

	return userInfo && permitArray.includes(userInfo?.role) && <>{children}</>
}

export default ProtectedRoute
