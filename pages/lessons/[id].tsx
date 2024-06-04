import { Avatar, Box, Button, capitalize, Chip, Grid, Typography } from "@mui/material"
import ApiServices from "@/pages/api/ApiServices"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/router"
import ErrorPage from "@/pages/errorpage"
import ProtectedRoute from "@/components/auth/ProtectedRoute"
import SidebarContainer from "@/components/SidebarContainer"
import dayjs from "dayjs"
import EventIcon from "@mui/icons-material/Event"
import AssessmentIcon from "@mui/icons-material/Assessment"
import VideocamIcon from "@mui/icons-material/Videocam"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import { useStoreUser } from "@/components/zustand"
import ChipX from "@/components/elements/ChipX"
import { lessonTypeColors } from "@/components/utils/lessonTypeColors"
import { capitalizeFirstLetter } from "@/components/helpers/capitalizeFirstLetter"
import localTime from "@/components/helpers/localTime"
import { englishLevels } from "@/components/utils/englishLevels"
import AddLesson from "@/components/lessons/AddLesson"
import { lessonDescription } from "@/components/data/LessonDescription"
import StudentCardMini from "@/components/student/StudentCardMini"
import AddIcon from "@mui/icons-material/Add"
import LogoutIcon from "@mui/icons-material/Logout"
import { UserType } from "@/types/types"
import { useMemo } from "react"

function Lesson() {
	const queryClient = useQueryClient()
	const { apiRequest } = ApiServices()
	const { userInfo } = useStoreUser()
	const {
		query: { id },
	} = useRouter()

	// Fetch lessons
	const {
		data: lessonTimetableList,
		isLoading: cIsLoading,
		isError: cIsError,
	} = useQuery({
		queryKey: [`lessonTimetableOneLesson-${id}`],
		queryFn: () => apiRequest("GET", null, { collectionName: "lessonTimetable", uid: id as string }),
		refetchOnWindowFocus: false,
	})

	// Join class
	const {
		mutate: joinClass,
		isLoading: isLoadingDelete,
		isError: isErrorDelete,
	} = useMutation(
		(students) => apiRequest("PATCH", students, { collectionName: "lessonTimetable", uid: id as string }),
		{
			onSuccess: () => queryClient.invalidateQueries([`lessonTimetableOneLesson-${id}`]),
		}
	)

	// fetch student data
	const { data, isLoading, isError } = useQuery({
		queryKey: ["students"],
		queryFn: () => apiRequest("GET", null, { collectionName: "students" }),
		refetchOnWindowFocus: false,
	})

	const handleJoinCLass = () => {
		if (userInfo.uid) {
			if (!lessonTimetableList?.data?.students?.includes(userInfo.uid)) {
				//@ts-ignore
				joinClass({ students: [...lessonTimetableList?.data?.students, userInfo.uid] })
			} else {
				const filteredStudents = lessonTimetableList?.data?.students?.filter((item: string) => item !== userInfo.uid)
				//@ts-ignore
				joinClass({ students: filteredStudents })
			}
		}
	}

	const studentJoined = useMemo(
		() => lessonTimetableList?.data?.students?.includes(userInfo?.uid) || false,
		[lessonTimetableList?.data?.students, userInfo?.uid]
	)

	if (cIsError || isError) return <ErrorPage />

	return (
		<ProtectedRoute permitArray={["admin", "teacher", "student"]}>
			<SidebarContainer>
				<Box sx={BoxWrapperStyle}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<Box
								sx={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "space-between",
									alignItems: "start",
									minHeight: "110px",
									height: "100%",
									minWidth: "290px",
								}}
							>
								<Box sx={{ display: { xs: "none", sm: "flex" } }}>
									<img
										style={{ position: "absolute", top: 30, right: 30, width: 330 }}
										src="/teacher-online-presentation.svg"
										alt="teacher"
									/>
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
											fontSize: 19,
											padding: 0,
											color: "black",
										}}
									>
										Topic: {capitalizeFirstLetter(lessonTimetableList?.data?.topic)}
									</Typography>
								</Box>

								<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
									<Avatar
										alt="Remy Sharp"
										src={userInfo.image || "/teacher-johny.png"}
										sx={{
											cursor: "pointer",
											width: "30px",
											height: "30px",
											m: "10px 10px 10px 0px",
										}}
									/>
									<Typography noWrap sx={{ maxWidth: 140, color: "black", mr: 1 }}>
										{lessonTimetableList?.data?.teacher_name}
									</Typography>
									<Box sx={{ display: "flex" }}>
										{lessonTimetableList?.data?.lesson_type && (
											<ChipX
												color={lessonTypeColors[lessonTimetableList?.data?.lesson_type]}
												text={capitalize(lessonTimetableList?.data?.lesson_type?.split("_")?.join(" "))}
											/>
										)}
									</Box>
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
												{dayjs(localTime(lessonTimetableList?.data?.lesson_date)).format("dddd, MMM D")}
											</Typography>
										</Box>
										<Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
											<AccessTimeIcon sx={{ mr: 1 }} />
											<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
												{dayjs(localTime(lessonTimetableList?.data?.lesson_date)).format(" HH:mm")} (
												{lessonTimetableList?.data?.lesson_duration_minutes} min)
											</Typography>
										</Box>
										<Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
											<AssessmentIcon sx={{ mr: 1 }} />
											<Typography sx={{ fontSize: "inherit", fontWeight: "inherit" }}>
												{englishLevels[lessonTimetableList?.data?.level]}
											</Typography>
										</Box>
									</Box>
									<Box sx={{ display: "flex", justifyContent: "space-between" }}>
										{lessonTimetableList?.data?.students?.length < 100 ? (
											<Button
												onClick={handleJoinCLass}
												sx={{
													marginRight: "5px",
													textTransform: "none",
													background: studentJoined ? "#ef476f" : "linear-gradient(45deg, #8b58fe, #5fdee7)",
													color: "white",
													fontWeight: "600",
													padding: "3px 10px",
													"&:hover": { background: "#424493" },
												}}
											>
												{!studentJoined ? (
													<>
														<AddIcon
															sx={{
																color: "white",
																marginRight: "6px",
															}}
														/>
														<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Join</Typography>
													</>
												) : (
													<>
														<LogoutIcon
															sx={{
																color: "white",
																marginRight: "6px",
															}}
														/>
														<Typography sx={{ fontSize: 12, fontWeight: 600 }}>Leave</Typography>
													</>
												)}
											</Button>
										) : (
											<ChipX text="Class is full" color="#ef476f" />
										)}
										{studentJoined && (
											<a target="_blank" rel="noreferrer" href={lessonTimetableList?.data?.video_call_link}>
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
										)}
										{userInfo?.role == "admin" ||
											(userInfo?.role == "teacher" && (
												<AddLesson _lesson={lessonTimetableList?.data} buttonName="Edit lesson" />
											))}
									</Box>
								</Box>
							</Box>
						</Grid>
						<Grid item xs={12} sx={{ color: "rgb(50, 50, 93)", mt: 2 }}>
							<Typography fontSize="18px" fontWeight={500}>
								{" "}
								Lesson description
							</Typography>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									border: "1px solid rgb(50, 50, 93)",
									background: "white",
									mb: 1,
									p: "10px 20px",
									borderRadius: 2,
									color: "rgb(50, 50, 93)",
									mt: 1,
								}}
							>
								<Typography sx={{ fontSize: "15px", fontWeight: "inherit" }}>
									{lessonDescription[lessonTimetableList?.data?.lesson_type as keyof typeof lessonDescription]}
								</Typography>
							</Box>
						</Grid>
						<Grid item xs={12} sx={{ color: "rgb(50, 50, 93)", mt: 2 }}>
							<Typography fontSize="18px" fontWeight={500}>
								{" "}
								Students joining the class
							</Typography>
							<Box
								sx={{
									display: "flex",
									flexWrap: "nowrap",
									overflowX: "scroll",
									marginBottom: "25px",
									mt: 1,
								}}
							>
								{data?.data
									?.filter((x: UserType) => lessonTimetableList?.data?.students?.includes(x.uid))
									.map((item: UserType, index: number) => (
										<Box key={index}>
											<StudentCardMini studentDetails={item} />
										</Box>
									))}
							</Box>
						</Grid>
					</Grid>
				</Box>
			</SidebarContainer>
		</ProtectedRoute>
	)
}

export default Lesson

const BoxWrapperStyle = {
	padding: { xs: "20px", sm: "25px 40px" },
	borderRadius: "23px",
	color: "white",
	height: "100%",
	display: "flex",
	justifyContent: "start",
	alignItems: "center",
	flexDirection: "column",
	boxSizing: "border-box",
	width: "100%",
	overflow: "auto",
	position: "relative",
	border: "0.5px solid #ebfff6",
	background: "linear-gradient(45deg, #D0DFFB, rgb(206 236 248 / 22%))",
}
