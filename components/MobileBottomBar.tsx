import React from "react"
import { useRouter } from "next/router"
import { Box } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import BarChartIcon from "@mui/icons-material/BarChart"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import QuizIcon from "@mui/icons-material/Quiz"
import CastForEducationIcon from "@mui/icons-material/CastForEducation"
import LightbulbIcon from "@mui/icons-material/Lightbulb"
import PersonIcon from "@mui/icons-material/Person"
import { useStoreUser } from "./zustand"
import VerifiedIcon from "@mui/icons-material/Verified"
import AppsIcon from "@mui/icons-material/Apps"
import SidebarItem from "./SidebarItem"

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
				dataTeacher()?.map((item, index) => <SidebarItem key={index} item={item} pathname={pathname} />)
			) : userInfo?.role === "student" ? (
				<>
					{dataStudent()?.map((item, index) => (
						<SidebarItem key={index} item={item} pathname={pathname} />
					))}
					<SidebarItem
						item={{
							name: "My Result",
							href: `/student/[id]`,
							link: `/student/${userInfo?.uid}`,
							icon: <BarChartIcon sx={{ width: 30, height: 30 }} />,
						}}
						pathname={pathname}
					/>
				</>
			) : userInfo?.role === "admin" ? (
				dataAdmin().map((item, index) => <SidebarItem key={index} item={item} pathname={pathname} />)
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
			href: "/",
			link: `/`,
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
		// {
		// 	name: "Class Statistics",
		// 	href: "/class-statistics",
		// 	link: "/class-statistics",
		// 	icon: <QueryStatsIcon sx={{ width: 30, height: 30 }} />,
		// },
	]
}

const dataStudent = () => {
	return [
		{
			name: "Dashboard",
			href: "/",
			link: `/`,
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
	]
}
