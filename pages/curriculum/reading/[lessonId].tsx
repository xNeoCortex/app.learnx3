import { Box, Container } from "@mui/material"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import LoadingPage from "@/components/LoadingPage"
import BackButton from "@/components/other/BackButton"
import { LessonIntro } from "@/components/curriculum/LessonIntro"
import { TestContainer } from "@/components/assessment/TestContainer"
import SidebarContainer from "@/components/SidebarContainer"

function ReadingPage() {
	const {
		query: { lessonId },
	} = useRouter()
	const { fetchOneLesson, fetchAssessment } = ApiServices()
	const {
		data: article,
		isLoading: isLoadingData,
		isError: isLoadingError,
	} = useQuery(["readingContent"], () => fetchAssessment("readingContent"))

	const {
		data: lessonState,
		isLoading,
		isError,
	} = useQuery([`lesson-${lessonId}`], () => fetchOneLesson(String(lessonId)))

	const lessonArticle = article?.data?.filter((item) => lessonState?.data.content?.includes(item.uid))[0]

	console.log("lessonArticle :>> ", lessonArticle)
	if (isLoading || isLoadingData) return <LoadingPage />
	if (isError || isLoadingError) return <ErrorPage />

	return (
		<SidebarContainer>
			<Box
				display="flex"
				sx={{
					position: "relative",
					width: "100%",
				}}
			>
				<Container
					sx={{
						padding: "20px 5px",
						color: "white",
						height: "100%",
						display: "flex",
						justifyContent: "start",
						alignItems: "center",
						flexDirection: "column",
						boxSizing: "border-box",
					}}
				>
					<LessonIntro lessonState={lessonState} image="/e-book.svg" width="250px" />

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							color: "#404040",
							borderRadius: 3,
							width: "100%",
							padding: "30px 40px",
							background: "#f4eee3",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
						}}
					>
						<h3> 📝 {lessonArticle?.topic}!</h3>

						<p
							style={{ color: "black" }}
							dangerouslySetInnerHTML={{
								__html: lessonArticle?.content.replace(/\n/g, "<br /> <br />"),
							}}
						/>
					</Box>
					<TestContainer data={lessonState?.data} link={`/test/true-false/`} />
					<BackButton />
				</Container>
			</Box>
		</SidebarContainer>
	)
}

export default ReadingPage
