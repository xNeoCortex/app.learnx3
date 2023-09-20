import { Avatar, Box, Button } from "@mui/material"
import Link from "next/link"
import { memo } from "react"

const StudentCardMini = memo<{ studentDetails: any }>(({ studentDetails }) => {
	return (
		<Box
			style={{
				padding: "20px 10px",
				width: "185px",
				marginRight: "20px",
				borderRadius: "23px",
				color: "white",
				height: "200px",
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
				<h5
					style={{
						color: "#323331",
						fontWeight: 600,
						fontSize: 14,
						padding: 0,
						margin: 0,
						marginTop: 8,
						marginBottom: 8,
						textAlign: "center",
					}}
				>
					{studentDetails.name}
				</h5>
				<p
					style={{
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
						borderRadius: 12,
						marginBottom: 15,
						fontSize: "13px",
					}}
				>
					{studentDetails.level || "intermediate"}
				</p>
			</Box>
		</Box>
	)
})
export default StudentCardMini
