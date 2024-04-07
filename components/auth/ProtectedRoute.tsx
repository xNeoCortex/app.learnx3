import { ReactNode, memo, useEffect } from "react"
import { useRouter } from "next/router"
import ErrorPage from "../../pages/errorpage"
import WaitingPage from "../other/WaitingPage"
import { useStoreUser } from "../zustand"

type PermitType = "admin" | "teacher" | "student"

interface ProtectedRouteProps {
	children: ReactNode
	permitArray: PermitType[]
}
const ProtectedRoute = ({ children, permitArray = [] }: ProtectedRouteProps) => {
	const { userInfo } = useStoreUser()

	if ((!userInfo?.permit && userInfo?.role == "teacher") || (!userInfo?.permit && userInfo?.role == "student"))
		return <WaitingPage />

	if (!permitArray.includes(userInfo?.role)) {
		return <ErrorPage message="You do not have permission to visit this page!" />
	}
	if (permitArray.includes(userInfo?.role)) {
		return <>{children}</>
	}
	return <ErrorPage message="Something went wrong, please try again later!" />
}

export default ProtectedRoute
