import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Button, CardMedia, Chip, CssBaseline, Grid, Typography } from "@mui/material"
import BackButton from "@/components/other/BackButton"
import LoadingPage from "@/components/LoadingPage"
import ErrorPage from "@/pages/errorpage"
import SidebarContainer from "@/components/SidebarContainer"
import CreateAllCurriculum from "@/components/curriculum/CreateAllCurriculum"
import { capitalizeFirstLetter } from "@/components/helpers/capitalizeFirstLetter"
import { setEnglishLevel } from "@/components/helpers/setEnglishLevel"
import { lessonColors } from "@/components/utils/lessonColors"
import { lessonImages } from "@/components/utils/lessonImages"
import sortByCategory from "@/components/helpers/sortByCategory"

function EachCurriculum() {
	const {
		query: { id, lesson },
	} = useRouter()
	const { fetchCurriculum, fetchLessons } = ApiServices()
	const [open, setOpen] = useState(false)
	const [openLesson, setOpenLesson] = useState(false)
	const [openTest, setOpenTest] = useState(false)
	const [lessons, setLessons] = useState([])

	// Fetching curriculum
	const {
		data: curriculum,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [`curriculum-${id}`],
		queryFn: () => fetchCurriculum(id as string),
		enabled: id == "undefined" ? false : true,
	})

	// Fetching lessons
	const {
		data: fetchedLessons,
		isLoading: isLoadingLesson,
		isError: isErrorLesson,
	} = useQuery({ queryKey: ["lessons"], queryFn: fetchLessons, refetchOnWindowFocus: false })

	// Filtering lessons for this curriculum
	const curriculumLessons = fetchedLessons?.data?.filter((item) => curriculum?.data?.lessons.includes(item.uid))

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

	useEffect(() => {
		const filteredLessons = filterLessonsByNumber(curriculumLessons)
		setLessons(filteredLessons)
	}, [isLoading, isLoadingLesson])

	if (isLoading || isLoadingLesson) return <LoadingPage />
	if (isError || isErrorLesson) return <ErrorPage />

	return (
		<SidebarContainer>
			<Box sx={{ marginTop: "20px" }}>
				<BackButton />
				<CssBaseline />
				<Typography
					style={{
						margin: "15px auto 50px",
						marginBottom: 20,
						fontWeight: 600,
						fontSize: 19,
						color: "#5f616a",
					}}
				>
					Class Lessons
				</Typography>
				<CreateAllCurriculum
					open={open}
					openLesson={openLesson}
					openTest={openTest}
					setOpen={setOpen}
					setOpenLesson={setOpenLesson}
					setOpenTest={setOpenTest}
				/>{" "}
				<Box>
					{!open &&
						lessons?.map((x, key) => (
							<Box key={key}>
								<Grid container spacing={1}>
									{x?.lessonItems
										.sort(sortByCategory)
										.filter((item) => item.lesson_number === lesson)
										.map((x, index) => (
											<Grid key={index} item xs={12} sm={6}>
												<Link href={`/curriculum/${x.category}/${x.uid}`}>
													<Box
														sx={{
															display: "flex",
															flexDirection: "column",
															justifyContent: "space-between",
															alignItems: "center",
															minHeight: "310px",
															borderRadius: "10px",
															padding: "10px 20px 20px",
															position: "relative",
															m: 1,
															backgroundColor: lessonColors[x.category],
															boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
															"&:hover": {
																boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.43) 0px 3px 6px;",
															},
														}}
													>
														<Box
															sx={{
																display: "flex",
																alignItems: "center",
																flexDirection: "column",
															}}
														>
															<Box
																sx={{
																	color: "#c270c8",
																	background: "transparent",
																	border: "1px solid #c270c8",
																	margin: "5px",
																	borderRadius: "0.75rem",
																	fontSize: "10px",
																	position: "absolute",
																	fontWeight: "bold",
																	top: 4,
																	left: 4,
																	p: "5px 10px",
																}}
															>
																{x.category}
															</Box>
															<CardMedia
																component="img"
																image={lessonImages[x?.category]}
																alt="test image"
																sx={{ width: 90, mb: 1, height: "100px", objectFit: "contain" }}
															/>
															<Typography
																sx={{
																	color: "rgb(50, 50, 93)",
																	fontSize: 14,
																	padding: 0,
																}}
															>
																Lesson {x.lesson_number}
															</Typography>
															<Typography
																sx={{
																	color: "rgb(50, 50, 93)",
																	fontWeight: 600,
																	fontSize: 16,
																	padding: 0,
																	textAlign: "center",
																}}
															>
																{capitalizeFirstLetter(x.topic)}
															</Typography>
														</Box>
														<Chip
															label={setEnglishLevel(x.level)}
															variant="outlined"
															style={{
																color: "rgb(50, 50, 93)",
																background: "transparent",
																margin: "5px ",
																border: "1px solid rgb(50, 50, 93)",
																borderRadius: "0.75rem",
																fontSize: 12,
															}}
														/>
														<Button
															style={{
																color: "#5f61c4",
																margin: "0px 15px",
																padding: "5px 30px",
																textTransform: "none",
															}}
														>
															View
														</Button>
													</Box>
												</Link>
											</Grid>
										))}
								</Grid>
							</Box>
						))}
				</Box>
			</Box>
		</SidebarContainer>
	)
}

export default EachCurriculum
