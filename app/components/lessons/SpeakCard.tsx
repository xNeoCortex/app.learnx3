import React, { memo } from "react"
import { Box, capitalize, Typography } from "@mui/material"
import TextToSpeechButton from "@/components/speakpage/TextToSpeechButton"
import { VocabularyType } from "@/types/generatedLessonType"
import sortByWordType from "../helpers/sortByWordType"
import Translator from "../elements/Translator"
import { brandColors } from "../utils/brandColors"

export const SpeakCard = memo(
	({ lesson, showDefinition, flashCardIndex }: { lesson: any; showDefinition: boolean; flashCardIndex: number }) => {
		const currentFlashCard = React.useMemo(
			() => lesson?.vocabularies?.sort(sortByWordType).reverse()?.[flashCardIndex],
			[flashCardIndex]
		)
		return (
			<Box
				//@ts-ignore
				sx={{
					background: "#fff",
					borderRadius: 2,
					p: 2,
					marginY: "15px",
					width: "100%",
					height: "100%",
					minHeight: "50vh",
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "column",
					boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
				}}
			>
				{!showDefinition ? (
					<Box
						sx={{
							height: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							textAlign: "center",
							flexDirection: { xs: "column", sm: "row" },
						}}
					>
						<Translator
							text={currentFlashCard?.word}
							flexDirection={"column"}
							iconColor={brandColors.iconGrey}
							translateIconWidth={"30px"}
						>
							<TextToSpeechButton text={currentFlashCard?.word} />
							<Typography
								variant="h4"
								sx={{
									height: "fit-content",
									color: "black",
									fontWeight: "bold",
									overflow: "hidden",
									maxWidth: { xs: "250px", sm: "none" },
								}}
							>
								{currentFlashCard?.word}
							</Typography>
						</Translator>
					</Box>
				) : (
					<>
						{["definition", "example"].map((item, index) => (
							<Typography
								key={index}
								sx={{
									background: "white",
									color: "black",
									textAlign: "center",
									marginBottom: "2px",
									borderRadius: "3px",
									padding: "6px",
								}}
							>
								<b>{capitalize(item)}: </b> {currentFlashCard[item as keyof VocabularyType]}
							</Typography>
						))}
						<Box
							sx={{
								display: "flex",
								flexWrap: "wrap",
								mt: 2,
								justifyContent: "center",
								alignItems: "center",
								flexDirection: "row",
							}}
						>
							<Typography>
								<b> Synonyms: </b>
							</Typography>

							{(currentFlashCard.synonyms || []).map((item: string, index: number) => {
								return (
									<Typography
										key={index}
										sx={{
											background: "white",
											color: "black",
											textAlign: "center",
											p: "2px 5px",
											margin: "2px",
											borderRadius: "4px",
											border: "1px solid black",
										}}
									>
										{capitalize(item)}
									</Typography>
								)
							})}
						</Box>
					</>
				)}
			</Box>
		)
	}
)
