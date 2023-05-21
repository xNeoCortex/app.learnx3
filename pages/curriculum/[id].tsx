import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/pages/api/ApiServices"
import { Box, Button, CardMedia, Chip, CssBaseline, Grid, Typography } from "@mui/material"
import HelperFuncitons from "@/components/helpers/helperFuncitons"
import BackButton from "@/components/other/BackButton"
import LoadingPage from "@/components/LoadingPage"
import CreateLesson from "@/components/curriculum/CreateLesson"
import ErrorPage from "@/components/ErrorPage"
import SidebarContainer from "@/components/SidebarContainer"
import CreateAllCurriculum from "@/components/curriculum/CreateAllCurriculum"

function EachCurriculum() {
	const {
		query: { id },
	} = useRouter()
	const { fetchCurriculum, fetchLessons } = ApiServices()
	const { capitalizeFirstLetter, setEnglishLevel } = HelperFuncitons()
	const [open, setOpen] = useState(false)
	const [openLesson, setOpenLesson] = useState(false)
	const [openTest, setOpenTest] = useState(false)

	// Fetching curriculum
	const { data: curriculum, isLoading, isError } = useQuery([`curriuclum-${id}`], () => fetchCurriculum(String(id)))

	// Fetching lessons
	const {
		data: fetchedLessons,
		isLoading: isLoadingLesson,
		isError: isErrorLesson,
	} = useQuery(["lessons"], fetchLessons)

	// Filtering lessons for this curriculum
	const curriculumLessons = fetchedLessons?.data?.filter((item) => curriculum?.data?.lessons.includes(item.uid))

	if (isLoading || isLoadingLesson) return <LoadingPage />
	if (isError || isErrorLesson) return <ErrorPage />

	function DynamicLink(category) {
		if (category === "vocabulary") return `/curriculum/vocabulary/[lessonId]`
		if (category === "speaking") return `/curriculum/speaking/[lessonId]`
		if (category === "reading") return `/curriculum/reading/[lessonId]`
		if (category === "writing") return `/curriculum/writing/[lessonId]`
	}

	return (
		<SidebarContainer>
			<Box sx={{ marginTop: "20px", width: "100%" }}>
				<BackButton />
				<CssBaseline />
				<h3
					style={{
						margin: "15px",
						marginBottom: 20,
						fontWeight: 600,
						fontSize: 19,
						color: "#5f616a",
					}}
				>
					Class Lessons
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
							open={open}
							openLesson={openLesson}
							openTest={openTest}
							setOpen={setOpen}
							setOpenLesson={setOpenLesson}
							setOpenTest={setOpenTest}
						/>{" "}
						{!open &&
							curriculumLessons?.map((x, index) => (
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
									<Box sx={{ display: "flex", alignItems: "center" }}>
										<Box sx={{ width: "60px", marginRight: "15px" }}>
											<CardMedia component="img" image="/book.svg" alt="test image" />
										</Box>
										<Typography
											sx={{
												marginRight: 5,
												color: "rgb(50, 50, 93)",
												fontWeight: 600,
												fontSize: 16,
												padding: 0,
												maxWidth: 400,
											}}
										>
											Lesson {x.lesson_number}
										</Typography>
										<Typography
											sx={{
												marginRight: 5,
												color: "rgb(50, 50, 93)",
												fontWeight: 600,
												fontSize: 16,
												padding: 0,
												maxWidth: 400,
											}}
										>
											{capitalizeFirstLetter(x.topic)}
										</Typography>
									</Box>
									<Box
										sx={{
											display: "flex",
											alignItems: "center",
										}}
									>
										<Chip
											label={x.category}
											variant="outlined"
											style={{
												color: "rgb(50, 50, 93)",
												background: "transparent",
												border: "1px solid rgb(50, 50, 93)",
												margin: "5px 20px 5px 0px",
												borderRadius: "0.75rem",
												padding: "0px 2px",
												fontSize: 12,
											}}
										/>
										<Chip
											label={setEnglishLevel(x.level)}
											variant="outlined"
											style={{
												color: "rgb(50, 50, 93)",
												background: "transparent",
												margin: "5px 10px 5px 0px",
												border: "1px solid rgb(50, 50, 93)",
												borderRadius: "0.75rem",
												padding: "0px 2px",
												fontSize: 12,
											}}
										/>
										<Link href={DynamicLink(x.category)} as={`/curriculum/${x.category}/${x.uid}`}>
											<Button
												style={{
													background: "#5f61c4",
													color: "white",
													margin: "0px 15px",
													padding: "5px 30px",
													textTransform: "none",
													fontWeight: "bold",
												}}
											>
												View
											</Button>
										</Link>
									</Box>
								</Box>
							))}
					</Grid>
				</Grid>
			</Box>
		</SidebarContainer>
	)
}

export default EachCurriculum
