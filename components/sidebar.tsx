import React, { useState } from "react"
import { Box } from "@mui/system"
import HomeIcon from "@mui/icons-material/Home"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import BarChartIcon from "@mui/icons-material/BarChart"
import { IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import QuizIcon from "@mui/icons-material/Quiz"
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"
import AdbIcon from "@mui/icons-material/Adb"
import CastForEducationIcon from "@mui/icons-material/CastForEducation"
import PersonIcon from "@mui/icons-material/Person"
import VirtualTeacherPopup from "./other/VirtualTeacherPopup"
import { useStoreTemporary, useStoreUser } from "./zustand"
import { useRouter } from "next/router"
import Link from "next/link"

function Sidebar({ classId }) {
	const { pathname } = useRouter()
	const { userInfo } = useStoreUser()
	const [hide, setHide] = useState(true)
	const [isShown, setIsShown] = useState(false)
	const { setSidebarWidth, class_id } = useStoreTemporary()

	return (
		<Box
			style={{
				background: "white",
				padding: "16px",
				maxWidth: "none",
				width: hide ? 300 : 90,
				transition: "width 0.5s ease-out",
				display: "flex",
				flexDirection: "column",
				position: "relative",
				overflow: "overlay",
				overflowX: "hidden",
			}}
			onMouseEnter={() => setIsShown(true)}
			onMouseLeave={() => setIsShown(false)}
		>
			<Link
				href={userInfo.role === "admin" ? "/" : `/classes/${classId}`}
				style={{ display: "flex", marginLeft: !hide && 10 }}
			>
				{hide ? (
					<img src="/logo.png" alt="logo" style={{ height: "40px", marginLeft: 5 }} />
				) : (
					<img src="/logo-mini.png" alt="minilogo" style={{ height: "37px" }} />
				)}
			</Link>
			<IconButton
				onClick={() => (setHide(!hide), setIsShown(!isShown), hide ? setSidebarWidth(90) : setSidebarWidth(300))}
				style={{
					position: "absolute",
					top: hide ? 15 : 60,
					right: hide ? 2 : 22,
					color: "#BAB9CC",
					display: isShown ? "flex" : "none",
				}}
			>
				{hide ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
			</IconButton>
			<Box
				style={{
					height: "100%",
					display: "flex",
					justifyContent: "space-between",
					flexDirection: "column",
					marginTop: 66,
				}}
			>
				<List>
					{userInfo?.role === "teacher" ? (
						dataTeacher(classId)?.map((item, index) => (
							<Link key={index} href={item?.href} as={item?.link}>
								<ListItem disablePadding>
									<ListItemButton
										className="onHover"
										style={{
											background: pathname == item.link ? "#5f6ac4" : "inherit",
											color: pathname == item.link ? "white" : "#BAB9CC",
											borderRadius: 5,
											marginBottom: 5,
										}}
									>
										<ListItemIcon style={{ color: "inherit" }}>{item.icon}</ListItemIcon>
										<ListItemText primary={item.name} />
									</ListItemButton>
								</ListItem>
							</Link>
						))
					) : userInfo?.role === "student" ? (
						<>
							{dataStudent(classId)?.map((item, index) => (
								<Link key={index} href={item?.href} as={item?.link}>
									<ListItem disablePadding>
										<ListItemButton
											className="onHover"
											style={{
												background: pathname == item.link ? "#5f6ac4" : "inherit",
												color: pathname == item.link ? "white" : "#BAB9CC",
												borderRadius: 5,
												marginBottom: 5,
											}}
										>
											<ListItemIcon style={{ color: "inherit" }}>{item.icon}</ListItemIcon>
											<ListItemText primary={item.name} />
										</ListItemButton>
									</ListItem>
								</Link>
							))}
							<Link href={`/student/[id]`} as={`/student/${userInfo.uid}`}>
								<ListItem disablePadding>
									<ListItemButton
										className="onHover"
										style={{
											background: pathname == `/student/${userInfo.uid}` ? "#5f6ac4" : "inherit",
											color: pathname == `/student/${userInfo.uid}` ? "white" : "#BAB9CC",
											borderRadius: 5,
											marginBottom: 5,
										}}
									>
										<ListItemIcon style={{ color: "inherit" }}>
											<BarChartIcon />
										</ListItemIcon>
										<ListItemText primary="My Results" />
									</ListItemButton>
								</ListItem>
							</Link>
						</>
					) : userInfo?.role === "admin" ? (
						dataAdmin(class_id).map((item, index) => (
							<>
								<Link key={index} href={item?.href} as={item?.link}>
									<ListItem disablePadding>
										<ListItemButton
											className="onHover"
											style={{
												background: pathname == item.link ? "#5f6ac4" : "inherit",
												color: pathname == item.link ? "white" : "#BAB9CC",
												borderRadius: 5,
												marginBottom: 5,
											}}
										>
											<ListItemIcon style={{ color: "inherit" }}>{item.icon}</ListItemIcon>
											<ListItemText primary={item.name} />
										</ListItemButton>
									</ListItem>
								</Link>
							</>
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

export default Sidebar

const dataTeacher = (classId) => {
	return [
		{
			name: "Dashboard",
			href: "/classes/[id]",
			link: `/classes/${classId}`,
			icon: <HomeIcon />,
		},
		{
			name: "Curriculum",
			href: "/curriculum",
			link: "/curriculum",
			icon: <CastForEducationIcon />,
		},
		{
			name: "All Students",
			href: `/classes/[id]/class-students`,
			link: `/classes/${classId}/class-students`,
			icon: <PersonIcon />,
		},
		{
			name: "Class Statistics",
			href: "/class-statistics",
			link: "/class-statistics",
			icon: <QueryStatsIcon />,
		},
		{
			name: "Study Resources",
			href: "/resources",
			link: "/resources",
			icon: <FolderSpecialIcon />,
		},
		{
			name: "Mark Writing",
			href: "/grade-writing",
			link: "/grade-writing",
			icon: <SpellcheckIcon />,
		},
		{
			name: "Teacher Fina",
			href: "/fina",
			link: "/fina",
			icon: <AdbIcon />,
		},
	]
}

const dataStudent = (classId) => {
	return [
		{
			name: "Dashboard",
			href: "/classes/[id]",
			link: `/classes/${classId}`,
			icon: <HomeIcon />,
		},
		{
			name: "Curriculum",
			href: "/curriculum",
			link: "/curriculum",
			icon: <CastForEducationIcon />,
		},
		{
			name: "Study Resources",
			href: "/resources",
			link: "/resources",
			icon: <FolderSpecialIcon />,
		},
		{
			name: "Tests",
			href: "/test",
			link: "/test",
			icon: <QuizIcon />,
		},
		{
			name: "Writing",
			href: "/writing",
			link: "/writing",
			icon: <HistoryEduIcon />,
		},
		{
			name: "Teacher Fina",
			href: "/fina",
			link: "/fina",
			icon: <AdbIcon />,
		},
	]
}

const dataAdmin = (class_id) => {
	return [
		{
			name: "Dashboard",
			href: "/",
			link: "/",
			icon: <CastForEducationIcon />,
		},
		{
			name: "Class",
			href: "/classes/[id]",
			link: "/classes",
			icon: <HomeIcon />,
		},
		{
			name: "Curriculum",
			href: "/curriculum",
			link: "/curriculum",
			icon: <CastForEducationIcon />,
		},
		{
			name: "All Students",
			href: `/classes/[id]/class-students`,
			link: `/classes/${class_id}/class-students`,
			icon: <PersonIcon />,
		},
		{
			name: "Class Statistics",
			href: "/class-statistics",
			link: "/class-statistics",
			icon: <QueryStatsIcon />,
		},
		{
			name: "Study Resources",
			href: "/resources",
			link: "/resources",
			icon: <FolderSpecialIcon />,
		},
		{
			name: "Tests",
			href: "/test",
			link: "/test",
			icon: <QuizIcon />,
		},
		{
			name: "Writing",
			href: "/writing",
			link: "/writing",
			icon: <HistoryEduIcon />,
		},
		{
			name: "Mark Writing",
			href: "/grade-writing",
			link: "/grade-writing",
			icon: <SpellcheckIcon />,
		},
		{
			name: "Teacher Fina",
			href: "/fina",
			link: "/fina",
			icon: <AdbIcon />,
		},
	]
}
