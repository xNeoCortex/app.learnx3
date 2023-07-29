import * as React from "react"
import { styled } from "@mui/material/styles"
import Dialog from "@mui/material/Dialog"
import DialogContent from "@mui/material/DialogContent"
import { Grid } from "@mui/material"
import Fina from "@/pages/fina"

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	width: "100vw",
	height: "100vh",
	zIndex: 9999,
	"& .MuiDialogContent-root": {
		padding: theme.spacing(0),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(0),
	},
}))

export default function FinaAvatarMobilePopup({ open, setOpen }) {
	return (
		<BootstrapDialog fullWidth fullScreen maxWidth="md" open={open}>
			<DialogContent dividers sx={{ background: "#271f4d" }}>
				<Fina setOpen={setOpen} />
			</DialogContent>
		</BootstrapDialog>
	)
}
