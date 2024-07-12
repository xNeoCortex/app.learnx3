"use client"
import { ReactNode } from "react"
import ErrorPage from "@/errorpage"
import WaitingPage from "../other/WaitingPage"
import { useStoreUser } from "../zustand"
import ApiServices from "@/api/ApiServices"
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

	const { fetchStudentData, apiRequest } = ApiServices()

	const {
		data: studentData,
		isLoading: isStudentLoading,
		isError: isStudentError,
	} = useQuery({
		queryKey: [`student-${userAuth?.uid}`, String(userAuth?.uid)],
		queryFn: () => fetchStudentData(String(userAuth?.uid)),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!userAuth?.uid && !userInfo?.role,
		onSuccess: (data) => setUserInfo({ ...userInfo, permit: data.data.permit }),
		onError: (error) => console.error("Error fetching student data:", error),
	})

	const {
		data: teacherData,
		isLoading: isTeacherLoading,
		isError: isTeacherError,
	} = useQuery({
		queryKey: [`teacher-${userAuth?.uid}`, String(userAuth?.uid)],
		queryFn: () => apiRequest("GET", null, { collectionName: "teachers", uid: userAuth?.uid }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!userAuth?.uid && isStudentError && !userInfo?.role,
		onSuccess: (data) => setUserInfo({ ...userInfo, permit: data.data.permit }),
		onError: (error) => console.error("Error fetching teacher data:", error),
	})

	if (isStudentError && isTeacherError) return <ErrorPage />

	if (!userInfo?.permit) return <WaitingPage />

	if (!permitArray.includes(userInfo?.role)) {
		return <ErrorPage message="You do not have permission to visit this page!" />
	}
	if (permitArray.includes(userInfo?.role)) {
		return <>{children}</>
	}
	return <ErrorPage message="Something went wrong, please try again later!" />
}

export default ProtectedRoute
