import { useEffect } from "react"
import { useRouter } from "next/router"
import ErrorPage from "../ErrorPage"
import WaitingPage from "../other/WaitingPage"
import { useStoreUser } from "../zustand"

function ProtectedRoute({ children, permitArray = [] }): any {
	const { push: navigate } = useRouter()
	const { userInfo } = useStoreUser()

	useEffect(() => {
		!userInfo && navigate("/auth/login")
	}, [userInfo, permitArray])

	if (!userInfo?.permit && userInfo?.role == "teacher") return <WaitingPage />

	if (userInfo && permitArray.includes(userInfo?.role)) {
		return <>{children}</>
	} else {
		return <ErrorPage message="You do not have permission to visit this page!" />
	}
}

export default ProtectedRoute
