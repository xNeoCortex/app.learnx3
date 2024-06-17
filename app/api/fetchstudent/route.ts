import { doc, getDoc } from "firebase/firestore"
import { db } from "@/components/firebaseX"
import { NextApiRequest, NextApiResponse } from "next"
import { getAuth } from "@clerk/nextjs/server"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
	const studentId = request.nextUrl.searchParams.get("studentId")

	const { userId } = getAuth(request)

	if (!userId) {
		return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
	}

	try {
		const docRef = doc(db, "students", studentId as string)
		const docSnap = await getDoc(docRef)

		if (docSnap.exists()) {
			return NextResponse.json(docSnap.data(), { status: 200 })
		} else {
			return NextResponse.json({ message: "Student not found" }, { status: 404 })
		}
	} catch (error) {
		console.error("Error getting documents:", error)
		return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
	}
}
