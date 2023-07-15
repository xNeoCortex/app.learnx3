import axios from "axios"

function ApiPostServices() {
	async function submitEssay(body) {
		return await axios.post("/api/submitessay", body)
	}

	async function submitTest(body) {
		return await axios.post("/api/submittest", body)
	}

	async function addCurriculum(body) {
		return await axios.post("/api/addcurriculum", body)
	}
	async function addClass(body) {
		return await axios.post("/api/addclass", body)
	}

	async function addLesson(body) {
		return await axios.post("/api/addlesson", body)
	}

	async function addLessonByAi(userInfo, topic) {
		return await axios.post("/api/speak/addlessonbyai", userInfo, {
			params: {
				topic,
			},
		})
	}

	async function addAssessment(body, type) {
		return await axios.post("/api/assessmentapi", body, {
			params: {
				type,
			},
		})
	}

	async function updateClass(body, id) {
		return await axios.put("/api/updateclass", body, {
			params: {
				id: id,
			},
		})
	}

	async function updateTeacherInfo(body, id) {
		return await axios.patch("/api/updateteacher", body, {
			params: {
				id: id,
			},
		})
	}

	async function submitFeedback(body, id) {
		const response = await axios.patch("/api/submitfeedback", body, {
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
