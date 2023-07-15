import React, { useEffect } from "react"
import { Box } from "@mui/system"
import HomeIcon from "@mui/icons-material/Home"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
import BarChartIcon from "@mui/icons-material/BarChart"
import { List, ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import QuizIcon from "@mui/icons-material/Quiz"
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"
import AdbIcon from "@mui/icons-material/Adb"
import CastForEducationIcon from "@mui/icons-material/CastForEducation"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import PersonIcon from "@mui/icons-material/Person"
import VirtualTeacherPopup from "./other/VirtualTeacherPopup"
import { useStoreTemporary, useStoreUser } from "./zustand"
import { useRouter } from "next/router"
import Link from "next/link"

function sidebar({ classId }) {
	const { push: navigate } = useRouter()
	const { pathname } = useRouter()
	const { userInfo } = useStoreUser()
	const { setSidebarWidth, class_id } = useStoreTemporary()

	useEffect(() => {
		classId === undefined && userInfo.role !== "admin" && navigate("/classes")
	}, [])

	return (
		<Box
			style={{
				background: "white",
				maxWidth: "none",
				width: 120,
				transition: "width 0.5s ease-out",
				display: "flex",
				flexDirection: "column",
				position: "relative",
				overflow: "overlay",
				overflowX: "hidden",
			}}
		>
			<Link
				href={userInfo?.role === "admin" ? "/" : `/classes/${classId}`}
				style={{ display: "flex", margin: "20px auto 10px", alignContent: "center" }}
			>
				<img src="/logo-mini.png" alt="mini logo" style={{ height: "37px" }} />
			</Link>

			<Box
				sx={{
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					borderRadius: 2,
					m: 1,
					p: "1px",
					marginTop: "40px",
				}}
			>
				<List>
					{userInfo?.role === "teacher" ? (
						dataTeacher(classId)?.map((item, index) => (
							<Link key={index} href={item?.link}>
								<ListItem disablePadding>
									<ListItemButton
										className="onHover"
										style={{
											color: pathname == item.href ? "rgb(4, 7, 24)" : "#BAB9CC",
											borderRadius: 5,
											marginBottom: 5,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											maxWidth: 100,
										}}
									>
										<ListItemIcon style={{ color: "inherit", display: "flex", justifyContent: "center" }}>
											{item.icon}
										</ListItemIcon>
										<Typography sx={{ fontSize: 11, textAlign: "center", width: "100%" }}>{item.name}</Typography>
									</ListItemButton>
								</ListItem>
							</Link>
						))
					) : userInfo?.role === "student" ? (
						<>
							{dataStudent(classId)?.map((item, index) => (
								<Link key={index} href={item?.link}>
									<ListItem disablePadding>
										<ListItemButton
											className="onHover"
											style={{
												color: pathname == item.href ? "rgb(4, 7, 24)" : "#BAB9CC",
												borderRadius: 5,
												marginBottom: 5,
												display: "flex",
												flexDirection: "column",
												alignItems: "center",
												maxWidth: 100,
												padding: "10px 5px",
											}}
										>
											<ListItemIcon style={{ color: "inherit", display: "flex", justifyContent: "center" }}>
												{item.icon}
											</ListItemIcon>
											<Typography sx={{ fontSize: 11, textAlign: "center", width: "100%" }}>{item.name}</Typography>
										</ListItemButton>
									</ListItem>
								</Link>
							))}
							<Link href={`/student/${userInfo?.uid}`}>
								<ListItem disablePadding>
									<ListItemButton
										className="onHover"
										style={{
											color: pathname == `/student/[id]` ? "rgb(4, 7, 24)" : "#BAB9CC",
											borderRadius: 5,
											marginBottom: 5,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											maxWidth: 100,
										}}
									>
										<ListItemIcon style={{ color: "inherit", display: "flex", justifyContent: "center" }}>
											<BarChartIcon />
										</ListItemIcon>
										<Typography sx={{ fontSize: 11, textAlign: "center", width: "100%" }}>My Result</Typography>
									</ListItemButton>
								</ListItem>
							</Link>
						</>
					) : userInfo?.role === "admin" ? (
						dataAdmin(class_id).map((item, index) => (
							<Link key={index} href={item?.link}>
								<ListItem disablePadding>
									<ListItemButton
										className="onHover"
										style={{
											color: pathname == item.href ? "rgb(4, 7, 24)" : "#BAB9CC",
											borderRadius: 5,
											marginBottom: 5,
											display: "flex",
											flexDirection: "column",
											alignItems: "center",
											maxWidth: 100,
										}}
									>
										<ListItemIcon style={{ color: "inherit", display: "flex", justifyContent: "center" }}>
											{item.icon}
										</ListItemIcon>{" "}
										<Typography sx={{ fontSize: 11, textAlign: "center", width: "100%" }}>{item.name}</Typography>
									</ListItemButton>
								</ListItem>
							</Link>
						))
					) : (
						""
					)}
				</List>
			</Box>
			<VirtualTeacherPopup />
		</Box>
	)
}

export default sidebar

const dataTeacher = (classId) => {
	return [
		{
			name: "Dashboard",
			href: "/classes/[id]",
			link: `/classes/${classId}`,
			icon: <HomeIcon sx={{ width: 30, height: 30 }} />,
		},
		// {
		// 	name: "Curriculum",
		// 	href: "/curriculum",
		// 	link: "/curriculum",
		// 	icon: <CastForEducationIcon sx={{ width: 30, height: 30 }} />,
		// },
		{
			name: "Speak English",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "All Students",
			href: `/classes/[id]/class-students`,
			link: `/classes/${classId}/class-students`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Student Results",
			href: `/student/results`,
			link: `/student/results`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Class Statistics",
			href: "/class-statistics",
			link: "/class-statistics",
			icon: <QueryStatsIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Study Resources",
			href: "/resources",
			link: "/resources",
			icon: <FolderSpecialIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Mark Writing",
			href: "/grade-writing",
			link: "/grade-writing",
			icon: <SpellcheckIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Teacher Fina",
			href: "/fina",
			link: "/fina",
			icon: <AdbIcon sx={{ width: 30, height: 30 }} />,
		},
	]
}

const dataStudent = (classId) => {
	return [
		{
			name: "Dashboard",
			href: "/classes/[id]",
			link: `/classes/${classId}`,
			icon: <HomeIcon sx={{ width: 30, height: 30 }} />,
		},
		// {
		// 	name: "Curriculum",
		// 	href: "/curriculum",
		// 	link: "/curriculum",
		// 	icon: <CastForEducationIcon sx={{ width: 30, height: 30 }} />,
		// },
		{
			name: "Speak English",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Study Resources",
			href: "/resources",
			link: "/resources",
			icon: <FolderSpecialIcon sx={{ width: 30, height: 30 }} />,
		},
		// {
		// 	name: "Tests",
		// 	href: "/test",
		// 	link: "/test",
		// 	icon: <QuizIcon sx={{ width: 30, height: 30 }}/>,
		// },
		// {
		// 	name: "Writing",
		// 	href: "/writing",
		// 	link: "/writing",
		// 	icon: <HistoryEduIcon sx={{ width: 30, height: 30 }} />,
		// },
		{
			name: "Teacher Fina",
			href: "/fina",
			link: "/fina",
			icon: <AdbIcon sx={{ width: 30, height: 30 }} />,
		},
	]
}

const dataAdmin = (class_id) => {
	return [
		{
			name: "Dashboard",
			href: "/classes",
			link: "/classes",
			icon: <CastForEducationIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Class",
			href: "/classes/[id]",
			link: "/classes",
			icon: <HomeIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Curriculum",
			href: "/curriculum",
			link: "/curriculum",
			icon: <CastForEducationIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "All Students",
			href: `/classes/[id]/class-students`,
			link: `/classes/${class_id}/class-students`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Speak English",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Student Results",
			href: `/student/results`,
			link: `/student/results`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Class Statistics",
			href: "/class-statistics",
			link: "/class-statistics",
			icon: <QueryStatsIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Study Resources",
			href: "/resources",
			link: "/resources",
			icon: <FolderSpecialIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Tests",
			href: "/test",
			link: "/test",
			icon: <QuizIcon sx={{ width: 30, height: 30 }} />,
		},
		// {
		// 	name: "Writing",
		// 	href: "/writing",
		// 	link: "/writing",
		// 	icon: <HistoryEduIcon sx={{ width: 30, height: 30 }} />,
		// },
		{
			name: "Mark Writing",
			href: "/grade-writing",
			link: "/grade-writing",
			icon: <SpellcheckIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Teacher Fina",
			href: "/fina",
			link: "/fina",
			icon: <AdbIcon sx={{ width: 30, height: 30 }} />,
		},
	]
}
