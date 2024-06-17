import { query, collection, getDocs } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { TeacherType } from "@/types/types"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const teachers: TeacherType[] &
			{
				uid: string
			}[] = []
		const q = query(collection(db, "teachers"))
		const querySnapshot = await getDocs(q)

		querySnapshot.forEach((doc) => {
			teachers.push({
				...doc.data(),
				uid: doc.id,
			})
		})

		return NextResponse.json(teachers, { status: 200 })
	} catch (error) {
		console.error("Error getting documents:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
