import { Box, Button, capitalize, Typography } from "@mui/material"
import dayjs from "dayjs"
import ChipX from "../elements/ChipX"
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter"
import localTime from "../helpers/localTime"
import AddLesson from "./AddLesson"
import EventIcon from "@mui/icons-material/Event"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { useStoreUser } from "../zustand"
import Link from "next/link"
import { LessonTimetableType } from "@/types/types"
import { memo } from "react"
import CustomAvatar from "../elements/CustomAvatar"
import { useQuery } from "@tanstack/react-query"
import ApiServices from "@/api/ApiServices"
import { brandColors } from "../utils/brandColors"

const LessonTimetableCard = memo(({ lesson }: { lesson: LessonTimetableType }) => {
	const { userInfo } = useStoreUser()
	const { apiRequest } = ApiServices()

	// fetch teacher data
	const {
		data: teacherData,
		isLoading: teacherIsLoading,
		isError: teacherIsError,
	} = useQuery({
		queryKey: [`teachers-${lesson?.teacher_id}`],
		queryFn: () => apiRequest("GET", null, { collectionName: "teachers", uid: lesson?.teacher_id }),
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		enabled: !!lesson?.teacher_id,
	})
	return (
		<Link href={`/lessons/${lesson.uid}`} style={{ textDecoration: "none" }}>
			<Box sx={BoxStyle}>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						width: "100%",
					}}
				>
					<Box sx={{ display: "flex", alignItems: "center" }}>
						<CustomAvatar image={teacherData?.data?.image} gender={userInfo?.gender} style={AvatarStyle} />
						<Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
							<Typography noWrap sx={{ maxWidth: 140, fontSize: "8px", color: brandColors.grey, marginBottom: "-4px" }}>
								Teacher
							</Typography>
							<Typography noWrap sx={{ maxWidth: 70, fontSize: "12px", fontWeight: 600 }}>
								{lesson?.teacher_name}
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: "flex" }}>
						<ChipX
							color={"black"}
							text={capitalize(lesson?.lesson_type.split("_").join(" "))}
							style={{
								background: "white",
								fontWeight: 600,
								borderColor: brandColors.grey,
								color: brandColors.grey,
								padding: "3px 6px",
								borderRadius: "5px",
								fontSize: "8px",
								margin: "0px",
							}}
						/>
					</Box>
				</Box>

				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						flexDirection: "column",
						mb: 1,
						height: "100%",
					}}
				>
					<img
						src={
							lesson.lesson_type === "speaking_club"
								? "/images/speaking-infographic.png"
								: "/images/teacher-image-infographic.png"
						}
						alt="question"
						style={{ width: lesson.lesson_type === "speaking_club" ? "95%" : "90%" }}
					/>
				</Box>

				<Box
					sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "space-between",
						flexDirection: "column",
						width: "100%",
						mt: 1,
					}}
				>
					<Typography
						sx={{
							fontWeight: 600,
							fontSize: 16,
							padding: 0,
							mb: 2,
							ml: "4px",
						}}
					>
						{capitalizeFirstLetter(lesson.topic)}
					</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "start",
							color: brandColors.grey,
							fontSize: "12px",
							fontWeight: 600,
						}}
					>
						<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
							<EventIcon sx={{ mr: 1, height: 20 }} />
							<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
								{dayjs(localTime(lesson.lesson_date)).format("dddd, MMM D")}
							</Typography>
						</Box>
						<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
							<AccessTimeIcon sx={{ mr: 1, height: 20 }} />
							<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
								{dayjs(localTime(lesson.lesson_date)).format(" HH:mm")} ({lesson.lesson_duration_minutes} min)
							</Typography>
						</Box>
					</Box>
					<Box sx={{ display: "flex", justifyContent: "space-between" }}>
						{userInfo.role == "admin" ||
							(userInfo.role == "teacher" && <AddLesson _lesson={lesson} buttonName="Edit lesson" />)}
					</Box>
				</Box>
			</Box>
		</Link>
	)
})
export default LessonTimetableCard

const BoxStyle = {
	display: "flex",
	flexDirection: "column",
	color: "black",
	justifyContent: "space-between",
	alignItems: "start",
	minHeight: "110px",
	borderRadius: "10px",
	padding: "5px 15px 15px",
	position: "relative",
	height: "100%",
	overflow: "hidden",
	width: { xs: "200px" },
	marginRight: { xs: "20px", sm: "0px" },
	minWidth: "190px",
	border: "0.5px solid #f3f3f3",
	background: brandColors.lightGrey,
	boxShadow: "0 2px 6px #efeaea",
	transition: "transform 0.3s ease-in-out",
	"&:hover": {
		cursor: "pointer",
		transform: "scale(1.02)",
	},
}

const AvatarStyle = {
	width: "30px",
	height: "30px",
	m: "10px 10px 10px 0px",
}

const ButtonStyle = {
	marginRight: "5px",
	textTransform: "none",
	background: "linear-gradient(45deg, #8b58fe, #5fdee7)",
	color: "white",
	fontWeight: "600",
	padding: "3px 10px",
	"&:hover": { background: "#424493" },
}
