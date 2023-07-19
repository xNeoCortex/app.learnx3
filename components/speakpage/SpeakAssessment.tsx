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
import { SpeakCard } from "../curriculum/SpeakCard"
import SpeakMultipleChoiceTest from "./SpeakMultipleChoiceTest"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	background: "#07002b",
	width: "100%",
	height: "100%",
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

export default function SpeakAssessment({ lesson }) {
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
			<CardWrapper background="#07002b">
				<Box
					onClick={handleClickOpen}
					sx={{
						background: "#07002b",
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" fontWeight="bolder" sx={{ color: "white", m: 1, mt: 3, textAlign: "center" }}>
						Assessment
						<Typography>Ready for the challenge? Take a test and see how much you have learned</Typography>
					</Typography>
					<img src={"/online-exam.svg"} alt="book" style={{ width: "80%", aspectRatio: 1 }} />
				</Box>
			</CardWrapper>
			<BootstrapDialog fullWidth maxWidth="md" open={open}>
				<DialogContent dividers sx={{ background: "#161F23" }}>
					<Grid container>
						<Grid item xs={12} sx={{ p: "5px 40px 10px", height: "100%" }}>
							<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
								<Typography sx={{ color: "white", fontWeight: 600, fontSize: 22 }}>
									{" "}
									Assessment: Select the correct answers
									{/* <Typography>
										{flashCardIndex + 1}/{lesson?.vocabularies.length}
									</Typography> */}
								</Typography>
								<IconButton onClick={handleClose}>
									<CloseIcon sx={{ color: "white" }} />
								</IconButton>
							</Box>
							<SpeakMultipleChoiceTest lesson={lesson} />
							{/* <Box sx={{ width: "100%", display: "flex" }}>
								<Button
									sx={{ background: "#A0D151", color: "#45433B", fontWeight: 600 }}
									autoFocus
									onClick={handlePrevious}
								>
									{lesson?.vocabularies[flashCardIndex - 1] ? "Back" : "Close"}
								</Button>
								<Button
									sx={{ marginX: 1, flex: 2, background: "#A0D151", color: "#45433B", fontWeight: 600 }}
									autoFocus
									onClick={() => setShowDefinition(!showDefinition)}
								>
									{showDefinition ? "Hide definition" : "Show definition"}
								</Button>
								<Button
									sx={{ background: "#A0D151", color: "#45433B", fontWeight: 600 }}
									autoFocus
									onClick={handleNext}
								>
									{lesson?.vocabularies[flashCardIndex + 1] ? "Next" : "Close"}
								</Button>
							</Box> */}
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</div>
	)
}
