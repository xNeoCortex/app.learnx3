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
	const { data: content } = useQuery(["writingContent"], () => fetchAssessment("writingContent"))
	const {
		data: lessonState,
		isLoading,
		isError,
	} = useQuery([`lesson-${lessonId}`], () => fetchOneLesson(String(lessonId)))
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
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "start",
							alignItems: "center",
							width: "100%",
							padding: "10px 10px 0px",
							background: "rgba(226, 230, 251, 0.3)",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							borderRadius: 3,
							p: "20px 0px",
							mt: 3,
						}}
					>
						<h3
							style={{
								padding: "0px 20px",
								color: "rgb(50, 50, 93)",
								fontWeight: 600,
								fontSize: 19,
								width: "100%",
							}}
						>
							Assessments
						</h3>
						{lessonState?.data.assessments.length && (
							<Box
								sx={{
									display: "flex",
									alignItems: "start",
									justifyContent: "center",
									flexDirection: { xs: "column", sm: "row" },
									width: "100%",
									margin: "0px 10px ",
								}}
							>
								{lessonState?.data.assessments?.map((test) => (
									<TestContainer
										link={`/test/writing/[id]`}
										as={`/test/writing/${test}`}
										topic={lessonState?.data.topic}
										category={lessonState?.data.category}
										level={lessonState?.data.level}
										test={test}
									/>
								))}
							</Box>
						)}
					</Box>
					<BackButton />
				</Container>
			</Box>
		</SidebarContainer>
	)
}

export default WritingPage
