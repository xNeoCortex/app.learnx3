import { useStoreUser } from "@/components/zustand"
import { LessonTimetableType, TestResultType, UserType } from "@/types/types"
import axios from "axios"

function ApiPostServices() {
	const { userInfo } = useStoreUser()

	async function submitTest(body: TestResultType) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/submittest", updatedBody)
	}

	async function addLesson(body: LessonTimetableType) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/addlesson", updatedBody)
	}

	async function updateTeacherInfo(body: { permit: boolean }, id: string) {
		const updatedBody = {
			...body,
		}
		return await axios.patch("/api/updateteacher", updatedBody, {
			params: {
				id: id,
			},
		})
	}

	return {
		submitTest,
		addLesson,
		updateTeacherInfo,
	}
}

export default ApiPostServices
