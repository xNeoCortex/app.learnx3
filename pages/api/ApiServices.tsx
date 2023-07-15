import axios from "axios"

function ApiServices() {
	async function fetchStudentData(studentId: string) {
		const response = await axios.get(`/api/fetchstudent`, {
			params: {
				studentId: studentId,
			},
		})
		return response
	}

	async function fetchAllStudents() {
		const response = await axios.get(`/api/fetchallstudents`)
		return response
	}

	async function fetchAllTeachers() {
		const response = await axios.get(`/api/fetchallteachers`)
		return response
	}

	async function fetchEssayResults() {
		const response = await axios.get(`/api/fetchessaysresults`)
		return response
	}

	async function fetchEssayInfo(id: string) {
		const response = await axios.get(`/api/fetchessayinfo`, {
			params: {
				id: id,
			},
		})
		return response
	}

	async function fetchTestResults(id: string) {
		const response = await axios.get(`/api/fetchtestresult`, {
			params: {
				id: id,
			},
		})
		return response
	}

	async function fetchClasses() {
		const response = await axios.get(`/api/fetchclasses`)
		return response
	}

	async function fetchOneClass(id) {
		const response = await axios.get(`/api/fetchoneclass`, {
			params: {
				id: id,
			},
		})
		return response
	}

	async function fetchLessons() {
		const response = await axios.get(`/api/fetchlessons`)
		return response
	}

	async function fetchAllCurriculum() {
		const res = await axios.get("/api/fetchallcurriculums")
		return res
	}

	async function fetchCurriculum(id: string) {
		const response = await axios.get(`/api/fetchonecurriculum`, {
			params: {
				id,
			},
		})
		return response
	}
	async function fetchOneLesson(id: string) {
		const response = await axios.get(`/api/fetchonelesson`, {
			params: {
				id,
			},
		})
		return response
	}
	async function fetchOneLessonByAi(id: string) {
		const response = await axios.get(`/api/speak/fetchonelessonbyai`, {
			params: {
				id,
			},
		})
		return response
	}

	async function fetchAssessment(type) {
		return await axios.get("/api/assessmentapi", {
			params: {
				type,
			},
		})
	}

	async function fetchOneAssessment(params) {
		return await axios.get("/api/getoneassessment", {
			params: params,
		})
	}

	interface ApiRequestParams {
		collectionName: string
		uid?: string | number
	}

	async function apiRequest(method: string = "GET", body = null, params: ApiRequestParams) {
		return await axios({
			method,
			url: "/api/apirequest",
			data: body,
			params,
		})
	}

	return {
		fetchStudentData,
		fetchAllStudents,
		fetchAllTeachers,
		fetchEssayResults,
		fetchEssayInfo,
		fetchTestResults,
		fetchClasses,
		fetchOneClass,
		fetchLessons,
		fetchAllCurriculum,
		fetchCurriculum,
		fetchOneLesson,
		fetchOneLessonByAi,
		fetchAssessment,
		fetchOneAssessment,
		apiRequest,
	}
}

export default ApiServices
