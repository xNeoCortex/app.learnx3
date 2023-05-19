import * as React from "react"
import Button from "@mui/material/Button"
import Menu from "@mui/material/Menu"
import { styled, alpha } from "@mui/material/styles"
import { MenuProps } from "@mui/material/Menu"
import ClearIcon from "@mui/icons-material/Clear"
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh"
import { Box, IconButton } from "@mui/material"
import FinaAI from "../FinaAI"

export default function VirtualTeacherPopup() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<Box sx={{ position: "absolute", bottom: 15, left: 18, zIndex: 9 }}>
			<Button
				id="basic-button"
				aria-controls={open ? "basic-menu" : undefined}
				aria-haspopup="true"
				aria-expanded={open ? "true" : undefined}
				onClick={handleClick}
				sx={{
					backgroundColor: "rgb(50, 51, 49)",
					color: "white",
					fontWeight: "bold",
					textTransform: "none",
					textAlign: "center",
					width: "60px",
					height: "60px",
					borderRadius: "50%",
				}}
			>
				<AutoFixHighIcon />
			</Button>
			<StyledMenu
				id="demo-customized-menu"
				MenuListProps={{
					"aria-labelledby": "demo-customized-button",
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				<IconButton
					onClick={handleClose}
					sx={{
						position: "absolute",
						top: "-15px",
						right: "-15px",
						color: "grey",
					}}
				>
					<ClearIcon />
				</IconButton>
				<FinaAI />
			</StyledMenu>
		</Box>
	)
}

const StyledMenu = styled((props: MenuProps) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: "bottom",
			horizontal: "right",
		}}
		transformOrigin={{
			vertical: "top",
			horizontal: "right",
		}}
		{...props}
	/>
))(({ theme }) => ({
	"& .MuiPaper-root": {
		// border: "2px solid #e7c6ff",
		zIndex: 999,
		position: "relative",
		borderRadius: 6,
		display: "flex",
		justifyContent: "start",
		alignItems: "start",
		marginTop: theme.spacing(1),
		maxWidth: 500,
		maxHeight: "90vh",
		padding: "10px",
		width: "100%",
		height: "100%",
		color: theme.palette.mode === "light" ? "rgb(55, 65, 81)" : theme.palette.grey[300],
		boxShadow:
			"rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
		"& .MuiMenu-list": {
			padding: "4px 0",
		},
		"& .MuiMenuItem-root": {
			"& .MuiSvgIcon-root": {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			"&:active": {
				backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
			},
		},
	},
}))
