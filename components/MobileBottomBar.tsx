import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import BarChartIcon from "@mui/icons-material/BarChart"
import { ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import QuizIcon from "@mui/icons-material/Quiz"
import CastForEducationIcon from "@mui/icons-material/CastForEducation"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import PersonIcon from "@mui/icons-material/Person"
import { useStoreUser } from "./zustand"
import VerifiedIcon from "@mui/icons-material/Verified"
import AppsIcon from "@mui/icons-material/Apps"

function MobileBottomBar() {
	const { pathname } = useRouter()
	const { userInfo } = useStoreUser()

	return (
		<Box
			sx={{
				position: "fixed",
				bottom: 0,
				right: 0,
				left: 0,
				background: "white",
				padding: "0 10px",
				width: "100vw",
				display: { xs: "flex", sm: "none" },
				justifyContent: "space-between",
				alignItems: "center",
				height: "65px",
				backgroundColor: "white",
				zIndex: 9000,
			}}
		>
			{userInfo?.role === "teacher" ? (
				dataTeacher()?.map((item, index) => (
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
					{dataStudent()?.map((item, index) => (
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
									padding: "10px 5px",
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
				dataAdmin().map((item, index) => (
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
		</Box>
	)
}

export default MobileBottomBar

const dataTeacher = () => {
	return [
		{
			name: "Dashboard",
			href: "/home/teacher",
			link: `/home/teacher`,
			icon: <HomeIcon sx={{ width: 30, height: 30 }} />,
		},
		// {
		// 	name: "Curriculum",
		// 	href: "/curriculum",
		// 	link: "/curriculum",
		// 	icon: <CastForEducationIcon sx={{ width: 30, height: 30 }} />,
		// },
		{
			name: "Topics",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "All Students",
			href: `/home/class-students`,
			link: `/home/class-students`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Student Results",
			href: `/student/results`,
			link: `/student/results`,
			icon: <VerifiedIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Class Statistics",
			href: "/class-statistics",
			link: "/class-statistics",
			icon: <QueryStatsIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Mark Writing",
			href: "/grade-writing",
			link: "/grade-writing",
			icon: <SpellcheckIcon sx={{ width: 30, height: 30 }} />,
		},
		// {
		// 	name: "Teacher Fina",
		// 	href: "/fina",
		// 	link: "/fina",
		// 	icon: <AdbIcon sx={{ width: 30, height: 30 }} />,
		// },
	]
}

const dataStudent = () => {
	return [
		{
			name: "Dashboard",
			href: "/home",
			link: `/home`,
			icon: <HomeIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Lessons",
			href: "/lessons",
			link: "/lessons",
			icon: <AppsIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Topics",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
	]
}

const dataAdmin = () => {
	return [
		{
			name: "Dashboard",
			href: "/home/admin",
			link: "/home/admin",
			icon: <CastForEducationIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Home teacher",
			href: "/home/teacher",
			link: "/home/teacher",
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
			href: `/home/class-students`,
			link: `/home/class-students`,
			icon: <PersonIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Topics",
			href: "/speak",
			link: "/speak",
			icon: <LightbulbIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Student Results",
			href: `/student/results`,
			link: `/student/results`,
			icon: <VerifiedIcon sx={{ width: 30, height: 30 }} />,
		},
		{
			name: "Class Statistics",
			href: "/class-statistics",
			link: "/class-statistics",
			icon: <QueryStatsIcon sx={{ width: 30, height: 30 }} />,
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
		// {
		// 	name: "Teacher Fina",
		// 	href: "/fina",
		// 	link: "/fina",
		// 	icon: <AdbIcon sx={{ width: 30, height: 30 }} />,
		// },
	]
}
