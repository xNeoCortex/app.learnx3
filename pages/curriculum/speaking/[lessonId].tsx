import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Box, Chip, Container } from "@mui/material"
import ErrorPage from "../../errorpage"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import BackButton from "@/components/other/BackButton"
import { LessonIntro } from "@/components/curriculum/LessonIntro"
import SidebarContainer from "@/components/SidebarContainer"

function SpeakingPage() {
	const {
		query: { lessonId },
	} = useRouter()
	const { fetchOneLesson, fetchAssessment } = ApiServices()

	const { data: content } = useQuery({
		queryKey: ["speakingContent"],
		queryFn: () => fetchAssessment("speakingContent"),
	})

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
				sx={{
					display: "flex",
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
					<LessonIntro lessonState={lessonState} image="/holding-speaker.png" />

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							color: "black",
							width: "100%",
							mt: 2,
						}}
					>
						<Box
							sx={{
								padding: "15px",
								borderRadius: 2,
								background: "#ffadad",
								color: "#323331",
								boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
							}}
						>
							<h3>🎤 Practice speaking by answering the following questions</h3>
						</Box>
						{lessonContent?.topic_content?.map((item, index) => (
							<Box
								key={index}
								sx={{
									mt: 2,
									padding: "15px",
									borderRadius: 2,
									color: "#323331",
									background: "#ffadad0a",
									boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
								}}
							>
								<h3>✨ {item.question}</h3>
								<p style={{ marginTop: 20, marginBottom: 5 }}>
									<strong> Sample Answer: </strong>
									{item.sample_answer}
								</p>
								<div style={{ fontWeight: "bolder" }}>
									Keyword:{" "}
									{item?.key_words?.map((word, index) => (
										<Chip
											key={index}
											label={word}
											variant="outlined"
											style={{
												color: "rgb(50, 50, 93)",
												background: "transparent",
												margin: "5px 0px 5px 10px",
												border: "1px solid rgb(50, 50, 93)",
												borderRadius: "0.75rem",
												fontSize: 12,
											}}
										/>
									))}
								</div>
							</Box>
						))}
					</Box>
					<BackButton />
				</Container>
			</Box>
		</SidebarContainer>
	)
}

export default SpeakingPage
