import { useQuery } from "@tanstack/react-query"
import { Box, Container } from "@mui/material"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import { useRouter } from "next/router"
import LoadingPage from "@/components/LoadingPage"
import BackButton from "@/components/other/BackButton"
import { LessonIntro } from "@/components/curriculum/LessonIntro"
import { TestContainer } from "@/components/assessment/TestContainer"
import SidebarContainer from "@/components/SidebarContainer"

function WritingPage() {
	const {
		query: { lessonId },
	} = useRouter()
	const { fetchOneLesson, fetchAssessment } = ApiServices()

	const { data: content } = useQuery({ queryKey: ["writingContent"], queryFn: () => fetchAssessment("writingContent") })

	const {
		data: lessonState,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [`lesson-${lessonId}`],
		queryFn: () => fetchOneLesson(lessonId as string),
		enabled: lessonId == "undefined" ? false : true,
	})
	const lessonContent = content?.data?.filter((item) => lessonState?.data.content.includes(item.uid))[0]

	if (isLoading) return <LoadingPage />
	if (isError) return <ErrorPage />

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
					<LessonIntro lessonState={lessonState} image="/pencil_2.png" />

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "#9c27b012",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							color: "#404040",
							borderRadius: 3,
							width: "100%",
							padding: "30px",
						}}
					>
						<h3
							style={{
								background: "white",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							{" "}
							📝 {lessonContent?.topic}!
						</h3>

						<p
							style={{ color: "black" }}
							dangerouslySetInnerHTML={{
								__html: lessonContent?.topic_content?.replace(/\n/g, "<br /> "),
							}}
						/>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "#f4eee3",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							color: "#404040",
							borderRadius: 3,
							mt: 3,
							width: "100%",
							padding: "30px",
						}}
					>
						<h3
							style={{
								background: "white",
								padding: "10px",
								borderRadius: "10px",
							}}
						>
							{" "}
							🧐 Example
						</h3>

						<p
							style={{ color: "black" }}
							dangerouslySetInnerHTML={{
								__html: lessonContent?.topic_example?.replace(/\n/g, "<br /> "),
							}}
						/>
					</Box>
					<TestContainer data={lessonState?.data} link={`/test/writing/`} />
					<BackButton />
				</Container>
			</Box>
		</SidebarContainer>
	)
}

export default WritingPage
