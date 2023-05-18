import React, { useEffect } from "react"
import Head from "next/head"
import { db } from "../components/firebaseX"
import { getDoc, doc } from "firebase/firestore"
import { useStoreUser } from "../components/zustand"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../components/firebaseX"
import { CssBaseline } from "@mui/material"
import { useRouter } from "next/router"
import SchoolPage from "./school"

export default function Home() {
	const { push: navigate } = useRouter()
	const [loading, setLoading] = React.useState(false)
	const { userInfo, setUserInfo, userLogin, setUserLogin } = useStoreUser()
	const [currentUser, setCurrentUser] = React.useState(null)

	console.log(" :>> app index")
	// Fetch current user data
	async function fetchData(uid: string) {
		setLoading(true)
		try {
			const docRef = doc(db, "teachers", uid)
			const usersData = await getDoc(docRef)

			const docRefStudent = doc(db, "students", uid)
			const usersDataStudent = await getDoc(docRefStudent)

			if (usersData.exists()) {
				setUserInfo(usersData.data())
				setCurrentUser(usersData.data())
				// usersData.data().role === "admin" ? navigate("/school") : navigate("/class")
			} else if (usersDataStudent.exists()) {
				setUserInfo(usersDataStudent.data())
				setCurrentUser(usersDataStudent.data())
				// usersDataStudent.data().role === "student" && navigate("/class")
			} else {
				console.log("No such document!")
			}
			setLoading(false)
		} catch (error) {
			console.log("fetchData :>> ", error)
		}
	}

	// set logged in user and fethced user data
	React.useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserLogin(user)
				fetchData(user.uid)
			} else {
				// User is signed out
				setUserLogin(null)
				fetchData(null)
			}
		})
	}, [])

	return (
		<>
			<Head>
				<title>LearnX3</title>
				<meta name="description" content="English Language teaching platform" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CssBaseline />
			<SchoolPage />
		</>
	)
}
