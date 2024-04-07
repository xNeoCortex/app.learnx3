import React, { useEffect, useState } from "react"
import { useStoreUser } from "@/components/zustand"
import { useAuth } from "@clerk/nextjs"
import { getAuth, signInWithCustomToken } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { useRouter } from "next/router"

function userDetails() {
	const { push: navigate } = useRouter()
	const { getToken } = useAuth()
	const { setUserInfo } = useStoreUser()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		const signInWithClerk = async () => {
			const auth = getAuth()
			const token: string | null = await getToken({ template: "integration_firebase" })
			const userCredentials = await signInWithCustomToken(auth, token as string)

			const user = userCredentials.user
			try {
				const docRef = doc(db, "teachers", user.uid)
				const usersData = await getDoc(docRef)

				const docRefStudent = doc(db, "students", user.uid)
				const usersDataStudent = await getDoc(docRefStudent)

				if (usersData.exists()) {
					setIsLoading(false)
					setUserInfo(usersData.data())
				} else if (usersDataStudent.exists()) {
					setIsLoading(false)
					setUserInfo(usersDataStudent.data())
				} else {
					console.log(" :>> no user")
					setError("No user found")
					setIsLoading(false)
					return navigate("/auth/student-form")
				}
			} catch (error) {
				console.log("error 57 :>> ", error)
				setError("api error")
				setIsLoading(false)
			}
		}

		signInWithClerk()
	}, [])
	return {
		isLoading,
		error,
	}
}

export default userDetails
