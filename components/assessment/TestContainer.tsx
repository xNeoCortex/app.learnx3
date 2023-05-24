import { Box, Button, CardMedia, Typography } from "@mui/material"
import Link from "next/link"

export const TestContainer = ({ data, link }) => {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "start",
				alignItems: "center",
				width: "100%",
				background: "rgba(226, 230, 251, 0.3)",
				boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;",
				borderRadius: 3,
				p: "20px 0px 5px",
				mt: 3,
			}}
		>
			<Typography
				style={{
					padding: "0px 20px",
					color: "rgb(50, 50, 93)",
					fontWeight: 600,
					fontSize: 19,
					width: "100%",
				}}
			>
				Assessments
			</Typography>

			{data?.assessments?.length && (
				<Box
					sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "center",
						flexDirection: "column",
						width: "100%",
						p: "20px",
					}}
				>
					{data?.assessments?.map((test) => (
						<Box
							sx={{
								width: "100%",
								borderRadius: "10px",
								mb: 2,
								display: "flex",
								flexDirection: "row",
								alignItems: "center",
								justifyContent: "space-between",
								background: "white",
								boxShadow: "rgb(50 50 93 / 5%) 0px 2px 5px -1px, rgb(0 0 0 / 20%) 0px 1px 3px -1px",
							}}
						>
							<CardMedia
								component="img"
								sx={{
									height: "60px",
									width: "150px",
									objectFit: "cover",
									margin: " 10px",
									borderRadius: "10px",
								}}
								image="/test_imag.png"
								alt="test image"
							/>

							<Box
								sx={{
									display: "flex",
									width: "100%",
									justifyContent: "space-between",
									padding: "10px 20px",
									alignItems: "center",
									fontSize: 14,
									fontWeight: 600,
									color: "rgb(50, 50, 93)",
								}}
							>
								<Box sx={{ display: "flex", alignItems: "center" }}>
									<h3 style={{ width: "auto", marginRight: "20px" }}> {data?.topic} </h3>
									<p
										style={{
											fontWeight: 500,
											padding: "3px 10px",
											background: "white",
											color: "rgb(50, 50, 93)",
											border: "1px solid rgb(50, 50, 93)",
											maxWidth: "191px",
											borderRadius: 12,
											fontSize: "12px",
											marginRight: 12,
										}}
									>
										{data?.type || data?.question_type || data?.level}
									</p>
									<p
										style={{
											fontWeight: 500,
											padding: "3px 10px",
											background: "white",
											color: "rgb(50, 50, 93)",
											border: "1px solid rgb(50, 50, 93)",
											maxWidth: "191px",
											borderRadius: 12,
											fontSize: "12px",
										}}
									>
										{data?.category}
									</p>
								</Box>
								<Link href={link + `/${test}`}>
									<Button
										variant="contained"
										size="small"
										sx={{
											background: "rgb(95, 106, 196)",
											boxShadow: "none",
											fontWeight: 600,
											width: "100px",
										}}
									>
										Start
									</Button>
								</Link>
							</Box>
						</Box>
					))}
				</Box>
			)}
		</Box>
	)
}
