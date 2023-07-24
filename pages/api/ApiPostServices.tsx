import { useStoreUser } from "@/components/zustand"
import axios from "axios"

function ApiPostServices() {
	const { userInfo } = useStoreUser()

	async function submitEssay(body) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/submitessay", updatedBody)
	}

	async function submitTest(body) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/submittest", updatedBody)
	}

	async function addCurriculum(body) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/addcurriculum", updatedBody)
	}
	async function addClass(body) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/addclass", updatedBody)
	}

	async function addLesson(body) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/addlesson", updatedBody)
	}

	async function addLessonByAi(userInfo, topic) {
		return await axios.post("/api/speak/addlessonbyai", userInfo, {
			params: {
				topic,
			},
		})
	}

	async function addAssessment(body, type) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.post("/api/assessmentapi", updatedBody, {
			params: {
				type,
			},
		})
	}

	async function updateClass(body, id) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.put("/api/updateclass", updatedBody, {
			params: {
				id: id,
			},
		})
	}

	async function updateTeacherInfo(body, id) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		return await axios.patch("/api/updateteacher", updatedBody, {
			params: {
				id: id,
			},
		})
	}

	async function submitFeedback(body, id) {
		const updatedBody = {
			...body,
			createdAt: `${new Date().toISOString()}`,
			createdById: `${userInfo.uid}`,
			createdByName: `${userInfo.name}`,
		}
		const response = await axios.patch("/api/submitfeedback", updatedBody, {
			params: {
				id: id,
			},
		})
		return response
	}

	return {
		submitEssay,
		submitTest,
		addCurriculum,
		addClass,
		addLesson,
		addAssessment,
		updateClass,
		updateTeacherInfo,
		submitFeedback,
		addLessonByAi,
	}
}

export default ApiPostServices
