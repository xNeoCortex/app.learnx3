import * as React from "react"
import Button from "@mui/material/Button"
import { styled, useTheme } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import IconButton from "@mui/material/IconButton"
import CloseIcon from "@mui/icons-material/Close"
import Typography from "@mui/material/Typography"
import CardWrapper from "../elements/CardWrapper"
import { Box, capitalize, Grid, useMediaQuery } from "@mui/material"
import dayjs from "dayjs"
import TextToSpeechButton from "./TextToSpeechButton"
import { LessonType } from "@/types/allLessonType"

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

const Conversation = React.memo(({ lesson }: { lesson: LessonType }) => {
	const theme = useTheme()
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"))
	const [open, setOpen] = React.useState(false)
	const now = dayjs().format("MMM D, YYYY")

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<Box sx={{ height: "100%" }}>
			<CardWrapper background="#eff9ff">
				<Box
					onClick={handleClickOpen}
					sx={{
						background: "#eff9ff",
						height: "100%",
						width: "100%",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
						alignItems: "center",
					}}
				>
					<Typography variant="h5" fontWeight="bolder" sx={{ color: "#001663", m: 1, textAlign: "center" }}>
						Practice Speaking
						<Typography>Speak with a friend about {lesson.topic} </Typography>
					</Typography>
					<img src={"/conversation.svg"} alt="conversation" style={{ width: "55%" }} />
				</Box>
			</CardWrapper>
			<BootstrapDialog fullWidth fullScreen={isSmallScreen} maxWidth="md" open={open}>
				<DialogContent dividers sx={{ background: "#5e548e" }}>
					<Grid container>
						<Grid item xs={12} sx={{ p: { xs: "5px", sm: "5px 40px 10px" }, height: "100%" }}>
							<Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "start" }}>
								<Typography sx={{ color: "white", fontWeight: 600, fontSize: 22 }}> Learn with Practice 📣</Typography>
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
								<Grid spacing={2} container>
									<Typography sx={{ width: "100%", textAlign: "center", m: "10px auto 0px", color: "grey" }}>
										{now}
									</Typography>
									{lesson?.conversation.map((item, index) => (
										<Grid item xs={12} key={index}>
											<Box
												key={index}
												sx={{
													display: "flex",
													width: "100%",
													color: "#323331",
													justifyContent: item.order % 2 ? "start" : "end",
												}}
											>
												<Box
													sx={{
														display: "flex",
														width: "fit-content ",
														maxWidth: "90%",
														padding: "10px",
														alignItems: "center",
														borderRadius: 2,
														background: "#ffadad0a",
														boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
													}}
												>
													{item.order % 2 ? (
														<Box
															sx={{
																display: "flex",
																alignItems: { sm: "center" },
																flexDirection: { xs: "column", sm: "row" },
															}}
														>
															<Box
																sx={{
																	display: "flex",
																	flexDirection: "row",
																	alignItems: "center",
																}}
															>
																<Typography
																	sx={{
																		fontSize: 14,
																		padding: "5px 10px",
																		background: item.order % 2 ? "#06d6a0" : "rgb(95, 97, 196)",
																		borderRadius: 2,
																		width: "fit-content",
																		color: "white",
																		minWidth: "fit-content",
																		height: "fit-content",
																	}}
																>
																	👩‍🎓 {item.speaker}
																</Typography>
																<TextToSpeechButton
																	text={item.content}
																	buttonSize="25px"
																	personType={capitalize(item.speaker) === "Child" ? "child" : "male"}
																/>{" "}
															</Box>
															<Typography sx={{ fontSize: 16 }}> {item.content} </Typography>
														</Box>
													) : (
														<Box
															sx={{
																display: "flex",
																alignItems: { sm: "center" },
																flexDirection: { xs: "column", sm: "row" },
																width: "content-fit",
															}}
														>
															<Box
																sx={{
																	display: "flex",
																	flexDirection: "row",
																	alignItems: "center",
																	justifyContent: "flex-end",
																	width: "content-fit",
																}}
															>
																<Typography
																	sx={{
																		fontSize: 14,
																		padding: "5px 10px",
																		background: item.order % 2 ? "#06d6a0" : "rgb(95, 97, 196)",
																		borderRadius: 2,
																		width: "fit-content",
																		color: "white",
																		minWidth: "fit-content",
																	}}
																>
																	👨‍🏫 {item.speaker}
																</Typography>
																<TextToSpeechButton text={item.content} buttonSize="25px" personType="female" />
															</Box>
															<Typography sx={{ fontSize: 16, textAlign: "end" }}> {item.content} </Typography>
														</Box>
													)}
												</Box>
											</Box>
										</Grid>
									))}
								</Grid>{" "}
							</Box>
							<Box sx={{ width: "100%", display: "flex", gap: 10 }}>
								<Button
									sx={{
										flex: 1,
										background: "#9e94cb !important",
										color: "#45433B",
										fontWeight: 600,
										"&:hover": { color: "#45433B", border: "1px solid #45433B" },
									}}
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
})

export default Conversation
