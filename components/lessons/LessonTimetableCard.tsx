import { Avatar, Box, Button, capitalize, Grid, Typography } from "@mui/material"
import dayjs from "dayjs"
import ChipX from "../elements/ChipX"
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter"
import localTime from "../helpers/localTime"
import { englishLevels } from "../utils/englishLevels"
import { lessonTypeColors } from "../utils/lessonTypeColors"
import AddLesson from "./AddLesson"
import EventIcon from "@mui/icons-material/Event"
import AssessmentIcon from "@mui/icons-material/Assessment"
import VideocamIcon from "@mui/icons-material/Videocam"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import VisibilityIcon from "@mui/icons-material/Visibility"

import { useStoreUser } from "../zustand"
import Link from "next/link"

export default function LessonTimetableCard({ index, x }) {
	const { userInfo } = useStoreUser()

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				alignItems: "start",
				minHeight: "110px",
				borderRadius: "10px",
				padding: "10px 20px 20px",
				position: "relative",
				height: "100%",
				overflow: "hidden",
				width: { xs: "300px", sm: "100%" },
				marginRight: { xs: "20px", sm: "0px" },
				minWidth: "290px",
				border: x?.lesson_type === "speaking_club" ? "0.5px solid #ebfff6" : "0.5px solid #eeebff",
				background:
					x?.lesson_type === "speaking_club"
						? "linear-gradient(45deg, #D9F0E1, #FAFDE9)"
						: "linear-gradient(45deg, #D0DFFB, rgb(206 236 248 / 22%))",
				boxShadow: "0 2px 17px rgba(0,0,0,.08)",
			}}
		>
			{/* <img
				style={{ position: "absolute", bottom: 10, right: -30, width: 170 }}
				src="/teacher-online-presentation.svg"
				alt="teacher"
			/> */}

			<Box
				sx={{
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					width: "100%",
					mb: 1,
				}}
			>
				<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
					<Avatar
						alt="Remy Sharp"
						src="/teacher-johny.png"
						sx={{
							cursor: "pointer",
							width: "30px",
							height: "30px",
							m: "10px 10px 10px 0px",
						}}
					/>
					<Typography noWrap sx={{ maxWidth: 140 }}>
						{x.teacher_name}
					</Typography>
				</Box>
				<Box sx={{ display: "flex" }}>
					<ChipX color={lessonTypeColors[x.lesson_type]} text={capitalize(x.lesson_type.split("_").join(" "))} />
				</Box>
			</Box>
			<Box
				sx={{
					display: "flex",
					alignItems: "start",
					flexDirection: "column",
					mb: 1,
					height: "100%",
				}}
			>
				<Typography
					sx={{
						fontWeight: 600,
						fontSize: 15,
						padding: 0,
					}}
				>
					{capitalizeFirstLetter(x.topic)}
				</Typography>
			</Box>

			<Box
				sx={{
					display: "flex",
					alignItems: "start",
					justifyContent: "space-between",
					flexDirection: "column",
					width: "100%",
					mt: 2,
				}}
			>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "start",
						mr: 3,
						mb: 2,
						color: "rgb(50, 50, 93)",
						fontSize: "13px",
						fontWeight: 500,
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
						<EventIcon sx={{ mr: 1 }} />
						<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
							{dayjs(localTime(x.lesson_date)).format("dddd, MMM D")}
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
						<AccessTimeIcon sx={{ mr: 1 }} />
						<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
							{dayjs(localTime(x.lesson_date)).format(" HH:mm")} ({x.lesson_duration_minutes} min)
						</Typography>
					</Box>
					<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
						<AssessmentIcon sx={{ mr: 1 }} />
						<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>{englishLevels[x.level]}</Typography>
					</Box>
				</Box>
				<Box sx={{ display: "flex", justifyContent: "space-between" }}>
					<a target="_blank" rel="noreferrer" href={x?.video_call_link}>
						<Button
							sx={{
								marginRight: "5px",
								textTransform: "none",
								background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
								color: "white",
								fontWeight: "600",
								padding: "3px 10px",
								"&:hover": { background: "#424493" },
							}}
						>
							<VideocamIcon
								sx={{
									color: "white",
									marginRight: "6px",
								}}
							/>
							<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Video Call</Typography>
						</Button>
					</a>
					<Link href={`/lessons/${x.uid}`} style={{ textDecoration: "none" }}>
						<Button
							sx={{
								marginRight: "5px",
								textTransform: "none",
								background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
								color: "white",
								fontWeight: "600",
								padding: "3px 10px",
								"&:hover": { background: "#424493" },
							}}
						>
							<VisibilityIcon
								sx={{
									color: "white",
									marginRight: "6px",
								}}
							/>
							<Typography sx={{ fontSize: 12, fontWeight: 600 }}>View</Typography>
						</Button>
					</Link>
					{userInfo.role == "admin" && <AddLesson _lesson={x} buttonName="Edit lesson" />}
				</Box>
			</Box>
		</Box>
	)
}
