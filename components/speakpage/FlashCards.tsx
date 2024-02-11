import * as React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import CardWrapper from "../elements/CardWrapper"
import { Box, Grid } from "@mui/material"
import sortByWordType from "@/components/helpers/sortByWordType"
import { SpeakCard } from "../lessons/SpeakCard"
import { TopicContentType } from "@/types/generatedLessonType"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	width: "100%",
	height: "100%",
	zIndex: 9999,
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

export default function FlashCards({ lesson }: { lesson: TopicContentType }) {
	const [open, setOpen] = React.useState(false)
	const [showDefinition, setShowDefinition] = React.useState(false)
	const [flashCardIndex, setFlashCardIndex] = React.useState(0)
	const currentFlashCard = lesson?.vocabularies?.sort(sortByWordType).reverse()?.[flashCardIndex]

	const handleClickOpen = () => {
		setFlashCardIndex(0)
		setShowDefinition(false)
		setOpen(true)
	}
	const handleClose = () => {
		setFlashCardIndex(0)
		setOpen(false)
	}

	const handleNext = () => {
		lesson?.vocabularies[flashCardIndex + 1]
			? (setFlashCardIndex((prev) => prev + 1), setShowDefinition(false))
			: handleClose()
	}

	const handlePrevious = () => {
		lesson?.vocabularies[flashCardIndex - 1]
			? (setFlashCardIndex((prev) => prev - 1), setShowDefinition(false))
			: handleClose()
	}

	return (
		<div>
			<CardWrapper background="#fff6c9">
				<Box
					onClick={handleClickOpen}
					sx={{
						background: "#fff6c9",
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" fontWeight="bolder" sx={{ color: "black", m: 1, textAlign: "center" }}>
						Flashcards
						<Typography>
							Learn {lesson?.vocabularies?.length} words about <b>{lesson?.topic}</b>
						</Typography>
					</Typography>
					<img src={"/flash-cards-2.png"} alt="book" style={{ width: "80%", aspectRatio: 1 }} />
				</Box>
			</CardWrapper>
			<BootstrapDialog fullWidth maxWidth="md" open={open}>
				<DialogContent dividers sx={{ background: "#F3DC65" }}>
					<Grid container>
						<Grid item xs={12} sx={{ p: { xs: "5px", sm: "5px 40px 10px" }, height: "100%" }}>
							<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
								<Typography sx={{ color: "black", fontWeight: 600, fontSize: { xs: 19, sm: 22 } }}>
									{" "}
									Learn words with FlashCards!
									<Typography>
										{flashCardIndex + 1}/{lesson?.vocabularies.length}
									</Typography>
								</Typography>
								<IconButton onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</Box>
							<SpeakCard word={currentFlashCard} showDefinition={showDefinition} />
							<Box sx={{ width: "100%", display: "flex" }}>
								<Button
									sx={{
										background: "#FDF2C3",
										color: "#45433B",
										fontWeight: 600,
										"&:hover": { color: "#45433B", border: "1px solid #45433B" },
									}}
									autoFocus
									onClick={handlePrevious}
								>
									{lesson?.vocabularies[flashCardIndex - 1] ? "Back" : "Close"}
								</Button>
								<Button
									sx={{
										marginX: 1,
										flex: 2,
										background: "#FDF2C3",
										color: "#45433B",
										fontWeight: 600,
										"&:hover": { color: "#45433B", border: "1px solid #45433B" },
									}}
									autoFocus
									onClick={() => setShowDefinition(!showDefinition)}
								>
									{showDefinition ? "Hide definition" : "Show definition"}
								</Button>
								<Button
									sx={{
										background: "#FDF2C3",
										color: "#45433B",
										fontWeight: 600,
										"&:hover": { color: "#45433B", border: "1px solid #45433B" },
									}}
									autoFocus
									onClick={handleNext}
								>
									{lesson?.vocabularies[flashCardIndex + 1] ? "Next" : "Close"}
								</Button>
							</Box>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</div>
	)
}
