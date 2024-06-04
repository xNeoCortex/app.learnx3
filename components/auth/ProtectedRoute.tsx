import { ReactNode, memo, useEffect } from "react"
import { useRouter } from "next/router"
import ErrorPage from "../../pages/errorpage"
import WaitingPage from "../other/WaitingPage"
import { useStoreUser } from "../zustand"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { getAuth } from "firebase/auth"

type PermitType = "admin" | "teacher" | "student"

interface ProtectedRouteProps {
	children: ReactNode
	permitArray: PermitType[]
}
const ProtectedRoute = ({ children, permitArray = [] }: ProtectedRouteProps) => {
	const { userInfo, setUserInfo } = useStoreUser()
	const userAuth = getAuth().currentUser

	const { fetchStudentData } = ApiServices()
	const { data, isLoading, isError } = useQuery({
		queryKey: [`student-${userAuth?.uid}`, String(userAuth?.uid)],
		queryFn: () => fetchStudentData(String(userAuth?.uid)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!userAuth?.uid,
		onSuccess: (data) => setUserInfo({ ...userInfo, permit: data.data.permit }),
		onError: (error) => console.error("Error fetching user data:", error), // Log error
	})

	if (isError) return <ErrorPage />

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
