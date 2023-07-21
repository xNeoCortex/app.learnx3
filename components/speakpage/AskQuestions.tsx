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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

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

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
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
						Learn through Q&A
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
								<Typography sx={{ color: "white", fontWeight: 600, fontSize: 22 }}> Learn through Q&A</Typography>
								<IconButton onClick={handleClose}>
									<CloseIcon sx={{ color: "white" }} />
								</IconButton>
							</Box>
							<Box
								sx={{
									p: "20px 0px",
									// background: "#fff",
									// borderRadius: 2,
									// color: "black",
									// marginY: "15px",
									// width: "100%",
									// height: "100%",
									// minHeight: "60vh",
									// display: "flex",
									// justifyContent: "center",
									// alignItems: "center",
									// flexDirection: "column",
									// boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
								}}
							>
								<Grid spacing={2} container>
									{lesson?.questions?.map((item, index) => (
										<Grid item xs={12} key={item}>
											<EachQuestion index={index} item={item} />
										</Grid>
									))}
								</Grid>
							</Box>
							<Box sx={{ width: "100%", display: "flex", gap: 10 }}>
								<Button
									sx={{ flex: 1, background: "#9e94cb !important", color: "#45433B", fontWeight: 600 }}
									autoFocus
									onClick={handleClose}
								>
									Close
								</Button>
							</Box>
						</Grid>
					</Grid>
				</DialogContent>
			</BootstrapDialog>
		</Box>
	)
}

const EachQuestion = ({ index, item }) => {
	const [showSampleAnswer, setShowSampleAnswer] = React.useState(false)
	return (
		<Box
			key={index}
			sx={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				m: "5px 0px",
				padding: "15px",
				borderRadius: 2,
				color: "#323331",
				background: "white",
				boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
				height: showSampleAnswer ? "fit-content" : 70,
				transition: "height 0.5s ease-in-out",
				overflow: "hidden",
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
					<Typography
						sx={{
							fontSize: 16,
							padding: "5px 10px",
							background: "#f48282",
							borderRadius: 2,
							width: "fit-content",
							mr: 2,
							color: "white",
							fontWeight: 600,
							minWidth: "fit-content",
						}}
					>
						{index + 1}
					</Typography>
					<Typography sx={{ fontSize: 16, fontWeight: 500 }}> {item.question}</Typography>
				</Box>
				{!showSampleAnswer ? (
					<IconButton onClick={() => setShowSampleAnswer(true)}>
						<ExpandMoreIcon />
					</IconButton>
				) : (
					<IconButton onClick={() => setShowSampleAnswer(false)}>
						<ExpandLessIcon />
					</IconButton>
				)}
			</Box>
			<Typography sx={{ fontSize: 16, fontWeight: 500, width: "100%", mt: 2 }}>
				{" "}
				<b> Sample answer:</b> {item.sample_answer}
			</Typography>
		</Box>
	)
}
