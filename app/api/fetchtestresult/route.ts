import { query, collection, where, getDocs } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const id = request.nextUrl.searchParams.get("id")
	const { userId } = getAuth(request)
	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const q = query(collection(db, "testResult"), where("student_id", "==", id))
		const querySnapshot = await getDocs(q)

		const testResult = querySnapshot.docs.map((doc) => ({
			...doc.data(),
			uid: doc.id,
		}))

		return NextResponse.json(testResult, { status: 200 })
	} catch (error) {
		console.error("Error getting documents:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
