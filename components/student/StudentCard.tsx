import { Avatar, Box, Button } from "@mui/material"
import Link from "next/link"
import { memo } from "react"

const StudentCard = memo<{ studentDetails: any }>(({ studentDetails }) => {
	return (
		<Box
			style={{
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
			}}
		>
			<Avatar src="/pupil-avatar.png" sx={{ bgcolor: "grey", width: 70, height: 70 }} />

			<Box display="flex" alignItems="center" flexDirection="column">
				<h5
					style={{
						color: "#323331",
						fontWeight: 600,
						fontSize: 16,
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
					{studentDetails.performance}
				</p>
			</Box>
			<Box display="flex" alignItems="center" flexDirection="column">
				<Link href={`/student/[id]`} as={`/student/${studentDetails.uid}`}>
					<Button
						variant="contained"
						style={{
							borderRadius: 20,
							color: "black",
							background: "white",
							width: 100,
							boxShadow: "none",
							textTransform: "none",
						}}
					>
						View
					</Button>
				</Link>
			</Box>
		</Box>
	)
})
export default StudentCard
