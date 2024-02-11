import * as React from "react"
import Dialog from "@mui/material/Dialog"

export default function AlertDialog({
	open,
	setOpen,
	component,
}: {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	component: React.ReactNode
}) {
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				{component}
			</Dialog>
		</div>
	)
}
