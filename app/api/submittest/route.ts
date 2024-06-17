import { collection, addDoc } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
	const body = await request.json()

	// Clerk auth check
	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const docRef = await addDoc(collection(db, "testResult"), body)
		return NextResponse.json({ docRef }, { status: 200 })
	} catch (error) {
		console.error("Error adding document:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
