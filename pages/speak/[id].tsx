import { useQuery } from "@tanstack/react-query"
import { Box, Grid } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import LoadingPage from "@/components/LoadingPage"
import BackButton from "@/components/other/BackButton"
import SidebarContainer from "@/components/SidebarContainer"
import ErrorPage from "../error"
import SpeakingInfo from "./SpeakingInfo"
import { useRouter } from "next/router"
import FlashCards from "@/components/speakpage/FlashCards"
import Phrases from "@/components/speakpage/Phrases"
import AskQuestions from "@/components/speakpage/AskQuestions"
import Conversation from "@/components/speakpage/Conversation"
import SpeakAssessment from "@/components/speakpage/SpeakAssessment"

export default function SpeakingLessonAi() {
	const { fetchOneLessonByAi } = ApiServices()
	const {
		query: { id },
	} = useRouter()

	// Fetch curriculum
	const {
		data: lessonByAi,
		isLoading,
		isError,
	} = useQuery({
		queryKey: [`lessonByAi-${id}`],
		queryFn: () => fetchOneLessonByAi(id as string),
		refetchOnWindowFocus: false,
	})

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
				<Box
					sx={{
						color: "white",
						height: "100%",
						display: "flex",
						justifyContent: "start",
						alignItems: "start",
						flexDirection: "column",
						boxSizing: "border-box",
					}}
				>
					<SpeakingInfo topic={lessonByAi?.data?.topic} image="/mobile-book.svg" />
					<Grid container spacing={2}>
						<Grid item xs={12} sm={4}>
							<FlashCards lesson={lessonByAi?.data} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Phrases lesson={lessonByAi?.data} />
						</Grid>
						<Grid item xs={12} sm={4}>
							<Conversation lesson={lessonByAi?.data} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<AskQuestions lesson={lessonByAi?.data} />
						</Grid>
						<Grid item xs={12} sm={6}>
							<SpeakAssessment lesson={lessonByAi?.data} />
						</Grid>
					</Grid>
					{/* <TestContainer data={lessonState?.data} link={`/test/word-building/`} /> */}
					<BackButton />
				</Box>
			</Box>
		</SidebarContainer>
	)
}

export const lessonColors = {
	noun: "#e2e6fb4d",
	verb: "rgb(255 139 79 / 20%)",
	adverb: "rgb(65 182 255 / 20%)",
	adjective: "rgb(94 196 151 / 20%)",
}
