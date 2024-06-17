import { query, collection, getDocs } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { UserType } from "@/types/types"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const students: UserType[] &
			{
				uid: string
			}[] = []
		const q = query(collection(db, "students"))
		const querySnapshot = await getDocs(q)

		querySnapshot.forEach((doc) => {
			students.push({
				...doc.data(),
				uid: doc.id,
			})
		})

		return NextResponse.json(students, { status: 200 })
	} catch (error) {
		console.error("Error getting documents:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
