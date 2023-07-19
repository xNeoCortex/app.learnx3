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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	width: "100%",
	height: "100%",
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}))

export default function AskQuestions({ lesson }) {
	const [open, setOpen] = React.useState(false)
	const [flashCardIndex, setFlashCardIndex] = React.useState(0)

	const handleClickOpen = () => {
		setFlashCardIndex(0)

		setOpen(true)
	}
	const handleClose = () => {
		setFlashCardIndex(0)
		setOpen(false)
	}

	const handleNext = () => {
		lesson?.questions[flashCardIndex + 1] ? setFlashCardIndex((prev) => prev + 1) : handleClose()
	}

	const handlePrevious = () => {
		lesson?.questions[flashCardIndex - 1] ? setFlashCardIndex((prev) => prev - 1) : handleClose()
	}

	return (
		<Box sx={{ height: "100%" }}>
			<CardWrapper background="#271f4d">
				<Box
					onClick={handleClickOpen}
					sx={{
						background: "#271f4d",
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" fontWeight="bolder" sx={{ color: "white", m: 1, mt: 3, textAlign: "center" }}>
						Learn by asking and answering Questions
						<Typography>Conversation</Typography>
					</Typography>
					<img src={"/question.svg"} alt="question" style={{ width: "55%" }} />
				</Box>
			</CardWrapper>
			<BootstrapDialog fullWidth maxWidth="md" open={open}>
				<DialogContent dividers sx={{ background: "#443b73" }}>
					<Grid container>
						<Grid item xs={12} sx={{ p: "5px 40px 10px", height: "100%" }}>
							<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
								<Typography sx={{ color: "white", fontWeight: 600, fontSize: 22 }}>
									{" "}
									Learn with questions
									<Typography>
										{flashCardIndex + 1}/{lesson?.questions.length}
									</Typography>
								</Typography>
								<IconButton onClick={handleClose}>
									<CloseIcon sx={{ color: "white" }} />
								</IconButton>
							</Box>
							<Box
								sx={{
									p: 2,
									background: "#fff",
									borderRadius: 2,
									color: "black",
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
								<Typography variant="h5">{lesson?.questions[flashCardIndex]}</Typography>
							</Box>
							<Box sx={{ width: "100%", display: "flex", gap: 10 }}>
								<Button
									sx={{ flex: 1, background: "#9e94cb !important", color: "#45433B", fontWeight: 600 }}
									autoFocus
									onClick={handlePrevious}
								>
									{lesson?.questions[flashCardIndex - 1] ? "Back" : "Close"}
								</Button>
								<Button
									sx={{
										flex: 1,
										background: "#9e94cb !important",
										color: "#45433B",
										fontWeight: 600,
									}}
									autoFocus
									onClick={handleNext}
								>
									{lesson?.questions[flashCardIndex + 1] ? "Next" : "Close"}
								</Button>
							</Box>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</Box>
	)
}
