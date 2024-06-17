import { memo } from "react"
import { UserType } from "@/types/types"
import { Avatar, Box, Button, Typography } from "@mui/material"
import Link from "next/link"
import CustomAvatar from "../elements/CustomAvatar"

const StudentCard = memo<{ studentDetails: UserType }>(({ studentDetails }) => {
	return (
		<Box sx={BoxStyle}>
			<CustomAvatar
				image={studentDetails?.image}
				gender={studentDetails?.gender}
				style={{ width: "70px", height: "70px" }}
			/>

			<Box display="flex" alignItems="center" flexDirection="column">
				<Typography sx={TypographyStyle}>{studentDetails.name}</Typography>
				<Typography
					sx={{
						color:
							studentDetails.performance == "Struggling"
								? "rgb(226, 109, 128)"
								: studentDetails.performance == "Doing Great"
								? "#5fc497"
								: "#41b6ff",
						fontWeight: 600,
						padding: "3px 10px",
						background: "white",
						border:
							studentDetails.performance == "Struggling"
								? "2px solid rgb(226, 109, 128)"
								: studentDetails.performance == "Doing Great"
								? "2px solid #5fc497"
								: "2px solid #41b6ff",
						borderRadius: "12px",
						marginBottom: "15px",
						fontSize: "13px",
					}}
				>
					{studentDetails.performance}
				</Typography>
			</Box>
			<Box display="flex" alignItems="center" flexDirection="column">
				<Link href={`/student/${studentDetails.uid}`}>
					<Button variant="contained" sx={ButtonStyle}>
						View
					</Button>
				</Link>
			</Box>
		</Box>
	)
})
export default StudentCard

const BoxStyle = {
	padding: "20px 10px",
	width: "200px",
	marginRight: "20px",
	borderRadius: "23px",
	color: "white",
	height: "250px",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	flexDirection: "column",
	background: "#e0e1f1",
	marginBottom: "20px",
	position: "relative",
}

const ButtonStyle = {
	borderRadius: "20px",
	color: "black",
	background: "white",
	width: "100px",
	boxShadow: "none",
	textTransform: "none",
}

const TypographyStyle = {
	color: "#323331",
	fontWeight: "600",
	fontSize: "16px",
	padding: "0",
	margin: "0",
	marginTop: "8px",
	marginBottom: "8px",
	textAlign: "center",
}
