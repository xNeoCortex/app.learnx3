import { auth } from "./firebaseX"
import { Alert, Box, Button, Grid, Typography } from "@mui/material"
import VideocamIcon from "@mui/icons-material/Videocam"
import AccountMenu from "./auth/SignOut"
import { useStoreTemporary } from "./zustand"
import AddClass from "./school/AddClassDialog"

const Navbar = () => {
	const { classInfo } = useStoreTemporary()
	return (
		<Grid
			item
			xs={12}
			style={{
				// background: "#5f6ac4",
				color: "white",
				padding: "0px 10px",
				borderRadius: 5,
				maxWidth: "none",
				alignItems: "center",
				marginBottom: 20,
				display: "flex",
				justifyContent: "space-between",
			}}
		>
			<Box>
				<h2 style={{ color: "#32325d", marginLeft: 2 }}>
					{auth?.currentUser ? "Hello, " + auth?.currentUser?.displayName + " 👨‍🏫" : "Hello"}
				</h2>
				<p style={{ color: "#32325d", marginLeft: 2 }}>
					<span style={{ color: "rgba(50, 50, 93, 0.7)" }}>Class: </span> {classInfo?.class_name}
				</p>
			</Box>
			<Box display="flex" alignItems="center">
				<Box style={{ display: "flex", flexDirection: "row" }}>
					<a target="_blank" rel="noreferrer" href={classInfo?.video_call_link}>
						<Button
							style={{
								marginRight: 5,
								textTransform: "none",
								background: "#5f61c4",
								color: "white",
								fontWeight: "600",
								padding: "6px 10px",
							}}
						>
							<VideocamIcon
								style={{
									color: "white",
									marginRight: 6,
								}}
							/>{" "}
							<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Video Call</Typography>
						</Button>
					</a>
					<AddClass _class={classInfo} buttonName="Edit Class" />
					{!classInfo?.video_call_link && (
						<Alert severity="error" sx={{ p: 1, paddingY: "0px", fontSize: 14, marginLeft: "5px" }}>
							Please add video link
						</Alert>
					)}
				</Box>

				<AccountMenu />
			</Box>
		</Grid>
	)
}

export default Navbar
