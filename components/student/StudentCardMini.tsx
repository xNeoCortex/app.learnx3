import { UserType } from "@/types/types"
import { Avatar, Box, Typography } from "@mui/material"
import { memo } from "react"
import { englishLevels } from "../utils/englishLevels"

const StudentCardMini = memo<{ studentDetails: UserType }>(({ studentDetails }) => {
	return (
		<Box sx={BoxStyle}>
			<Avatar
				src={studentDetails?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
				sx={{ bgcolor: "white", width: 55, height: 55 }}
			/>

			<Box display="flex" alignItems="center" flexDirection="column">
				<Typography noWrap sx={TypographyStyle}>
					{studentDetails.name}
				</Typography>
				<Typography
					sx={{
						color:
							studentDetails.performance == "Struggling"
								? "rgb(226, 109, 128)"
								: studentDetails.performance == "Doing Great"
								? "#5fc497"
								: "#41b6ff",
						fontWeight: "500",
						padding: "3px 10px",
						background: "white",
						border:
							studentDetails.performance == "Struggling"
								? "1px solid rgb(226, 109, 128)"
								: studentDetails.performance == "Doing Great"
								? "1px solid #5fc497"
								: "1px solid #41b6ff",
						borderRadius: "12px",
						fontSize: "12px",
						textAlign: "center",
					}}
				>
					{englishLevels[studentDetails.eng_level_form] || "intermediate"}
				</Typography>
			</Box>
		</Box>
	)
})
export default StudentCardMini

const BoxStyle = {
	padding: "15px 10px",
	width: "135px",
	marginRight: "20px",
	borderRadius: "23px",
	color: "white",
	display: "flex",
	justifyContent: "space-between",
	alignItems: "center",
	flexDirection: "column",
	background: "#f2f2f2",
	marginBottom: "10px",
	position: "relative",
}

const TypographyStyle = {
	color: "#323331",
	fontWeight: "600",
	fontSize: "14px",
	padding: "0px",
	margin: "8px 0px",
	textAlign: "center",
	maxWidth: "100px",
}
