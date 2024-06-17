import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function PATCH(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id")
	const body = await request.json()

	// Clerk auth check
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const docRef = await doc(db, "teachers", id as string)
		const response = await updateDoc(docRef, body)

		return NextResponse.json({ response }, { status: 200 })
	} catch (error) {
		console.error("Error deleting document:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
