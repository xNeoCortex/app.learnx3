import * as React from "react"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert, { AlertProps } from "@mui/material/Alert"

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export const SnackbarX = React.memo(
	({
		open,
		setOpen,
		message,
		backgroundColor,
	}: {
		open: boolean
		setOpen: React.Dispatch<React.SetStateAction<boolean>>
		message: string
		backgroundColor: string
	}) => {
		return (
			<Stack spacing={2} sx={{ width: "100%" }}>
				<Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
					<Alert onClose={() => setOpen(false)} sx={{ width: "100%", background: backgroundColor }}>
						{message}
					</Alert>
				</Snackbar>
			</Stack>
		)
	}
)
