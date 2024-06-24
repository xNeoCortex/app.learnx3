import { doc, getDoc } from "firebase/firestore"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/components/firebaseX"

export async function GET(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id")

	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const docRef = doc(db, "lessonByAi", id as string)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			const lessonData = docSnap.data()
			return NextResponse.json(lessonData, { status: 200 })
		} else {
			return NextResponse.json({ message: "Lesson not found" }, { status: 404 })
		}
	} catch (error) {
		console.error("Error getting documents:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
