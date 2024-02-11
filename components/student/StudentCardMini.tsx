import { UserType } from "@/types/types"
import { Avatar, Box, Typography } from "@mui/material"
import { memo } from "react"
import { englishLevels } from "../utils/englishLevels"

const StudentCardMini = memo<{ studentDetails: UserType }>(({ studentDetails }) => {
	return (
		<Box
			style={{
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
			}}
		>
			<Avatar
				src={studentDetails?.gender === "male" ? "/pupil-avatar.png" : "/school-girl.svg"}
				sx={{ bgcolor: "white", width: 55, height: 55 }}
			/>

			<Box display="flex" alignItems="center" flexDirection="column">
				<Typography
					noWrap
					style={{
						color: "#323331",
						fontWeight: 600,
						fontSize: 14,
						padding: 0,
						margin: 0,
						marginTop: 8,
						marginBottom: 8,
						textAlign: "center",
						maxWidth: 100,
					}}
				>
					{studentDetails.name}
				</Typography>
				<p
					style={{
						color:
							studentDetails.performance == "Struggling"
								? "rgb(226, 109, 128)"
								: studentDetails.performance == "Doing Great"
								? "#5fc497"
								: "#41b6ff",
						fontWeight: 500,
						padding: "3px 10px",
						background: "white",
						border:
							studentDetails.performance == "Struggling"
								? "1px solid rgb(226, 109, 128)"
								: studentDetails.performance == "Doing Great"
								? "1px solid #5fc497"
								: "1px solid #41b6ff",
						borderRadius: 12,
						fontSize: "12px",
						textAlign: "center",
					}}
				>
					{englishLevels[studentDetails.eng_level_form] || "intermediate"}
				</p>
			</Box>
		</Box>
	)
})
export default StudentCardMini
