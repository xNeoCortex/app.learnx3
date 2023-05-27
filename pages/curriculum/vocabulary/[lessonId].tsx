import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"
import { Box, Container, Typography } from "@mui/material"
import ErrorPage from "../../../components/ErrorPage"
import ApiServices from "@/pages/api/ApiServices"
import HelperFuncitons from "@/components/helpers/helperFuncitons"
import LoadingPage from "@/components/LoadingPage"
import BackButton from "@/components/other/BackButton"
import { LessonIntro } from "@/components/curriculum/LessonIntro"
import { VocabularyCard } from "@/components/curriculum/VocabularyCard"
import { TestContainer } from "@/components/assessment/TestContainer"
import SidebarContainer from "@/components/SidebarContainer"

export default function VocabularyPage() {
	const {
		query: { lessonId },
	} = useRouter()
	const { fetchOneLesson, fetchAssessment } = ApiServices()
	const { capitalizeFirstLetter } = HelperFuncitons()

	const {
		data,
		isLoading: isLoadingData,
		isError: isErrorData,
	} = useQuery(["vocabularyCards"], () => fetchAssessment("vocabularyCards"))

	const { data: lessonState, isLoading, isError } = useQuery(["lesson"], () => fetchOneLesson(String(lessonId)))

	const Vocabulary_1 = data?.data?.filter((item) => lessonState?.data.vocabulary_cards?.includes(item.uid))[0]

	if (isLoading || isLoadingData) return <LoadingPage />
	if (isError || isErrorData) return <ErrorPage />

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
					<LessonIntro lessonState={lessonState} image="/vocabulary-image.png" />

					<Box
						sx={{
							display: "flex",
							flexWrap: "wrap",
							flexDirection: "column",
							justifyContent: "center",
							background: "white",
							boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
							borderRadius: 3,
							width: "100%",
							p: "20px 0px",
						}}
					>
						<h3 style={{ color: "black", margin: "10px 30px" }}> 📒 Words of the day!</h3>
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								justifyContent: "center",
								borderRadius: 3,
								width: "100%",
							}}
						>
							{Vocabulary_1?.vocabularies?.map((word) => (
								<VocabularyCard word={word} capitalizeFirstLetter={capitalizeFirstLetter} />
							))}
						</Box>
					</Box>
					<TestContainer data={lessonState?.data} link={`/test/word-building/`} />
				</Container>
				<BackButton />
			</Box>
		</SidebarContainer>
	)
}
