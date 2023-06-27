import { useState } from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import { Box, Button, capitalize, CardMedia, Chip, CssBaseline, Grid, Typography } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import ErrorPage from "../../components/ErrorPage"
import BackButton from "../../components/other/BackButton"
import LoadingPage from "@/components/LoadingPage"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import CreateAllCurriculum from "@/components/curriculum/CreateAllCurriculum"
import SnackbarX from "@/components/other/SnackbarX"
import { useStoreUser, useStoreTemporary } from "@/components/zustand"
import DeleteComponent from "@/components/DeleteComponent"
import { setEnglishLevel } from "@/components/helpers/setEnglishLevel"
import LessonInsideCur from "@/components/curriculum/LessonInsideCur"

function Curriculum() {
	const { apiRequest, fetchLessons, fetchClasses } = ApiServices()
	const { userInfo } = useStoreUser()
	const [openX, setOpenX] = useState(false)
	const [openLesson, setOpenLesson] = useState(false)
	const [openTest, setOpenTest] = useState(false)
	const [open, setOpen] = useState(false)

	// Fetch curriculum
	const {
		data: curriculumList,
		isLoading,
		isError,
	} = useQuery(["curriculumList"], () => apiRequest("GET", null, { collectionName: "curriculum" }))

	// Fetching lessons
	const {
		data: fetchedLessons,
		isLoading: isLoadingLesson,
		isError: isErrorLesson,
	} = useQuery(["lessons"], fetchLessons)

	//fetch classes
	const { data: classList } = useQuery(["classList"], fetchClasses)

	const matchClass =
		userInfo?.role == "teacher"
			? classList?.data.find((c) => c?.teachers.includes(userInfo?.uid))
			: classList?.data.find((c) => c?.students.includes(userInfo?.uid))

	// Filtering lessons by number
	function filterLessonsByNumber(array = []) {
		const lessons = {}
		if (array?.length == 0 && array?.length !== undefined) return
		for (const item of array) {
			const lessonNumber = item.lesson_number

			if (!lessons.hasOwnProperty(lessonNumber)) {
				lessons[lessonNumber] = []
			}
			lessons[lessonNumber].push(item)
		}

		return Object.entries(lessons).map(([lessonNumber, lessonItems]) => ({
			lessonNumber: lessonNumber,
			lessonItems: lessonItems,
		}))
	}

	// useEffect(() => {
	// 	const filteredLessons = filterLessonsByNumber(curriculumLessons)
	// 	setLessons(filteredLessons)
	// }, [isLoading, isLoadingLesson])

	if (isLoading || isLoadingLesson) return <LoadingPage />
	if (isError || isErrorLesson) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<SnackbarX
					open={open}
					setOpen={setOpen}
					backgroundColor="#32a676"
					message="Curriculum has been successfully deleted!"
				/>

				<Box sx={{ marginTop: "20px", width: "100%" }}>
					<CssBaseline />
					<BackButton />

					<h3
						style={{
							margin: 10,
							marginBottom: 20,
							fontWeight: 600,
							fontSize: 19,
							color: "#5f616a",
						}}
					>
						Class Curriculum
					</h3>

					<Grid container>
						<Grid
							item
							xs={12}
							style={{
								padding: 10,
								margin: "0px 0px 30px",
							}}
						>
							<CreateAllCurriculum
								open={openX}
								openLesson={openLesson}
								openTest={openTest}
								setOpen={setOpenX}
								setOpenLesson={setOpenLesson}
								setOpenTest={setOpenTest}
							/>
							{!openX &&
								!openLesson &&
								!openTest &&
								curriculumList?.data
									?.filter((item) => (userInfo.role == "admin" ? item : item.uid === matchClass?.curriculum_id))
									.map((c, index) => (
										<Box
											key={index}
											sx={{
												margin: "auto",
												borderRadius: "10px",
												padding: "20px",
												display: "flex",
												justifyContent: "space-between",
												alignItems: "center",
												marginBottom: 3,
												backgroundColor: "rgba(226, 230, 251, 0.3)",
												boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
											}}
										>
											<Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
												<Box sx={{ display: "flex", justifyContent: "space-between" }}>
													<Box sx={{ display: "flex", alignItems: "center" }}>
														<CardMedia
															component="img"
															image="/book.svg"
															alt="test image"
															sx={{ width: "60px", marginRight: "15px" }}
														/>
														<Typography
															sx={{
																marginRight: 5,
																color: "black",
																fontWeight: 600,
																fontSize: 18,
																padding: 0,
																maxWidth: 400,
															}}
														>
															{c.curriculum_name}
														</Typography>
													</Box>
													<Box
														sx={{
															display: "flex",
															alignItems: "center",
														}}
													>
														<Chip
															label={setEnglishLevel(c.level)}
															variant="outlined"
															style={{
																color: "#5f61c4",
																background: "transparent",
																margin: "5px 10px 5px 0px",
																border: "1px solid #5f61c4",
																borderRadius: "0.75rem",
																padding: "0px 2px",
																fontSize: 12,
															}}
														/>
														<Chip
															label={`60 min`}
															variant="outlined"
															style={{
																color: "#5f61c4",
																background: "transparent",
																border: "1px solid #5f61c4",
																margin: "5px 20px 5px 0px",
																borderRadius: "0.75rem",
																padding: "0px 2px",
																fontSize: 12,
															}}
														/>
														{userInfo?.role === "admin" && (
															<DeleteComponent
																collectionName="curriculum"
																invalidateCache="curriculumList"
																itemId={c.uid}
																setOpen={setOpen}
															/>
														)}
													</Box>
												</Box>
												<Box sx={{ p: 1, mt: 3, borderRadius: 2 }}>
													<Grid container spacing={2}>
														{filterLessonsByNumber(
															fetchedLessons?.data?.filter((lesson) => c?.lessons.includes(lesson.uid))
														).map((l, index) => (
															<LessonInsideCur key={index} data={l} curriculumData={c} />
														))}
													</Grid>
												</Box>
											</Box>
										</Box>
									))}
						</Grid>
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default Curriculum
