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
    console.log("API POST response :>> ", response)
    return response
  }

  return {
    submitEssay,
    submitTest,
    addCurriculum,
    addClass,
    updateClass,
    updateTeacherInfo,
    submitFeedback,
  }
}

export default ApiPostServices
