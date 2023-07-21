import * as React from "react"
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import CardWrapper from "../elements/CardWrapper"
import { Box, capitalize, Grid } from "@mui/material"
import SpeakMultipleChoiceTest from "./SpeakMultipleChoiceTest"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	background: "rgb(4 0 21 / 85%)",
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
	const [contentIndex, setContentIndex] = React.useState(0)

	const handleClickOpen = () => {
		setContentIndex(0)
		setShowDefinition(false)
		setOpen(true)
	}
	const handleClose = () => {
		setContentIndex(0)
		setOpen(false)
	}

	const handleNext = () => {
		lesson?.exercise?.questions[contentIndex + 1] ? setContentIndex((prev) => prev + 1) : handleClose()
	}

	const handlePrevious = () => {
		lesson?.exercise?.questions[contentIndex - 1] ? setContentIndex((prev) => prev - 1) : handleClose()
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
				<DialogContent dividers sx={{ background: "rgb(4 0 21 / 100%)" }}>
					<Grid container>
						<Grid item xs={12} sx={{ p: "5px 40px 10px", height: "100%" }}>
							<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
								<Typography sx={{ color: "white", fontWeight: 600, fontSize: 22 }}>
									{capitalize(lesson?.topic)} [{contentIndex + 1}/{lesson?.exercise?.questions.length}]
								</Typography>
								<IconButton onClick={handleClose}>
									<CloseIcon sx={{ color: "white" }} />
								</IconButton>
							</Box>
							<SpeakMultipleChoiceTest
								lesson={lesson}
								contentIndex={contentIndex}
								handleNext={handleNext}
								handlePrevious={handlePrevious}
							/>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</div>
	)
}
