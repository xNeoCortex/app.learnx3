"use client"
// userDetails.js
import { useEffect, useState } from "react"
import { useAuth } from "@clerk/nextjs"
import { getAuth, signInWithCustomToken } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { useRouter } from "next/navigation"
import { useStoreUser } from "@/components/zustand"

function useUserDetails() {
	const { push: navigate } = useRouter()
	const { getToken } = useAuth()
	const { setUserInfo, userInfo } = useStoreUser()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")
	const [detailsFetched, setDetailsFetched] = useState(false)

	useEffect(() => {
		if (userInfo && !detailsFetched) {
			setIsLoading(false)
			setDetailsFetched(true)
			return
		}

		const loadUserDetails = async () => {
			try {
				const auth = getAuth()
				const token = await getToken({ template: "integration_firebase" })
				const userCredentials = await signInWithCustomToken(auth, token as string)

				const user = userCredentials.user
				const docRef = doc(db, "teachers", user.uid)
				const usersData = await getDoc(docRef)

				if (usersData.exists()) {
					setUserInfo(usersData.data())
					setIsLoading(false)
				} else {
					const docRefStudent = doc(db, "students", user.uid)
					const usersDataStudent = await getDoc(docRefStudent)

					if (usersDataStudent.exists()) {
						setUserInfo(usersDataStudent.data())
						setIsLoading(false)
					} else {
						navigate("/auth/student-form")
					}
				}
			} catch (error) {
				console.error("Error fetching user details:", error)
				setError("API error")
				setIsLoading(false)
			}
		}

		loadUserDetails()
	}, [])

	return {
		isLoading,
		error,
	}
}

export default useUserDetails
