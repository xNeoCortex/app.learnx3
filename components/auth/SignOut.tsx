import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut } from "firebase/auth"
import Box from "@mui/material/Box"
import Avatar from "@mui/material/Avatar"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import ListItemIcon from "@mui/material/ListItemIcon"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Settings from "@mui/icons-material/Settings"
import Logout from "@mui/icons-material/Logout"
import { Typography } from "@mui/material"
import { styled } from "@mui/material/styles"
import Badge from "@mui/material/Badge"
import PersonIcon from "@mui/icons-material/Person"
import { useStoreUser } from "../zustand"
import { auth } from "../firebaseX"

const AccountMenu = React.memo(({ isSmallScreen }: { isSmallScreen: boolean }) => {
	const { push: navigate } = useRouter()
	const { userInfo, setUserInfo } = useStoreUser((state) => state)

	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigate("/auth/login")
				setUserInfo(null)
			})
			.catch((error) => {
				// An error happened.
			})
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const accountType = React.useMemo(() => {
		if (userInfo?.role === "teacher") {
			return "Teacher Account"
		} else if (userInfo?.role === "student") {
			return "Student Account"
		} else {
			return ""
		}
	}, [userInfo])

	return (
		<>
			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					textAlign: "center",
				}}
			>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: { xs: "0px", sm: 2 } }}
						aria-controls={open ? "account-menu" : undefined}
						aria-haspopup="true"
						aria-expanded={open ? "true" : undefined}
					>
						<StyledBadge overlap="circular" anchorOrigin={{ vertical: "bottom", horizontal: "right" }} variant="dot">
							<Avatar
								sx={{
									width: 28,
									height: 28,
									border: "2px solid rgb(95, 106, 196)",
									background: "rgba(95, 106, 196, 0.05)",
									color: "rgb(95, 106, 196)",
								}}
							>
								<PersonIcon />
							</Avatar>
						</StyledBadge>
					</IconButton>
				</Tooltip>
				<Typography
					sx={{
						display: isSmallScreen ? "none" : "flex",
						color: "rgb(50, 50, 93)",
						maxWidth: "50px",
						marginLeft: "10px",
						textAlign: "start",
						fontSize: "11px",
						lineHeight: "1.4",
					}}
				>
					{accountType}
				</Typography>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						width: "200px",
						overflow: "visible",
						filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
						mt: 1.5,
						"& .MuiAvatar-root": {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						"&:before": {
							content: '""',
							display: "block",
							position: "absolute",
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: "background.paper",
							transform: "translateY(-50%) rotate(45deg)",
						},
					},
				}}
				transformOrigin={{ horizontal: "right", vertical: "top" }}
				anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
			>
				<MenuItem>
					<Link href="/user-settings" style={{ display: "flex", alignItems: "center" }}>
						<ListItemIcon>
							<Settings fontSize="small" />
						</ListItemIcon>
						Profile Settings
					</Link>
				</MenuItem>
				<Divider />
				<MenuItem onClick={handleLogout}>
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	)
})

const StyledBadge = styled(Badge)(({ theme }) => ({
	"& .MuiBadge-badge": {
		display: "none",
		backgroundColor: "#44b700",
		color: "#44b700",
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		"&::after": {
			position: "absolute",
			top: 0,
			left: 0,
			width: "100%",
			height: "100%",
			borderRadius: "50%",
			animation: "ripple 1.2s infinite ease-in-out",
			border: "1px solid currentColor",
			content: '""',
		},
	},
	"@keyframes ripple": {
		"0%": {
			transform: "scale(.8)",
			opacity: 1,
		},
		"100%": {
			transform: "scale(2.4)",
			opacity: 0,
		},
	},
}))

export default AccountMenu
