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
import TextToSpeechButton from "./TextToSpeechButton"
import { LessonType } from "@/types/lessonType"

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

const Phrases = React.memo(({ lesson }: { lesson: LessonType }) => {
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
		lesson?.phrases?.[flashCardIndex + 1] ? setFlashCardIndex((prev) => prev + 1) : handleClose()
	}

	const handlePrevious = () => {
		lesson?.phrases?.[flashCardIndex - 1] ? setFlashCardIndex((prev) => prev - 1) : handleClose()
	}

	return (
		<Box sx={{ height: "100%" }}>
			<CardWrapper background="white">
				<Box
					onClick={handleClickOpen}
					sx={{
						background: "white",
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" fontWeight="bolder" sx={{ color: "#001663", m: 1, textAlign: "center" }}>
						Phrases
						<Typography>
							Learn {lesson?.phrases?.length} phrases about <b>{lesson?.topic}</b>
						</Typography>
					</Typography>
					<img src={"/phrases.svg"} alt="book" style={{ width: "90%" }} />
				</Box>
			</CardWrapper>
			<BootstrapDialog fullWidth maxWidth="md" open={open}>
				<DialogContent dividers sx={{ background: "#6ea4fe" }}>
					<Grid container>
						<Grid item xs={12} sx={{ p: { xs: "5px", sm: "5px 40px 10px" }, height: "100%" }}>
							<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
								<Typography sx={{ color: "black", fontWeight: 600, fontSize: 22 }}>
									{" "}
									Learn with Phrases
									<Typography>
										{flashCardIndex + 1}/{lesson?.phrases?.length}
									</Typography>
								</Typography>
								<IconButton onClick={handleClose}>
									<CloseIcon />
								</IconButton>
							</Box>
							<Box
								sx={{
									background: "#fff",
									borderRadius: 2,
									p: 2,
									marginY: "15px",
									width: "100%",
									height: "100%",
									minHeight: "50vh",
									display: "flex",
									flexDirection: { xs: "column", sm: "row" },
									justifyContent: "center",
									alignItems: "center",
									boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
								}}
							>
								<TextToSpeechButton text={lesson?.phrases?.[flashCardIndex]} />
								<Typography variant="h5" sx={{ textAlign: "center" }}>
									{lesson?.phrases?.[flashCardIndex]}
								</Typography>
							</Box>
							<Box sx={{ width: "100%", display: "flex", gap: 2 }}>
								<Button
									sx={{
										flex: 1,
										background: "#c3d8fa !important",
										color: "#45433B",
										fontWeight: 600,
										"&:hover": { color: "#45433B", border: "1px solid #45433B" },
									}}
									autoFocus
									onClick={handlePrevious}
								>
									{lesson?.phrases?.[flashCardIndex - 1] ? "Back" : "Close"}
								</Button>
								<Button
									sx={{
										flex: 1,
										background: "#c3d8fa !important",
										color: "#45433B",
										fontWeight: 600,
										"&:hover": { color: "#45433B", border: "1px solid #45433B" },
									}}
									autoFocus
									onClick={handleNext}
								>
									{lesson?.phrases?.[flashCardIndex + 1] ? "Next" : "Close"}
								</Button>
							</Box>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</Box>
	)
})

export default Phrases
