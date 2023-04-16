import React, { useState } from "react"
import { Box } from "@mui/system"
import { Link } from "react-router-dom"
import HomeIcon from "@mui/icons-material/Home"
import { useLocation } from "react-router-dom"
import FolderSpecialIcon from "@mui/icons-material/FolderSpecial"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"
import ClassIcon from "@mui/icons-material/Class"
// import logo from "../../../public/logo.png"
// import miniLogo from "../../../public/logo.png"
import BarChartIcon from "@mui/icons-material/BarChart"
import {
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import QueryStatsIcon from "@mui/icons-material/QueryStats"
import SpellcheckIcon from "@mui/icons-material/Spellcheck"
import QuizIcon from "@mui/icons-material/Quiz"
import HistoryEduIcon from "@mui/icons-material/HistoryEdu"
import AdbIcon from "@mui/icons-material/Adb"
import CastForEducationIcon from "@mui/icons-material/CastForEducation"
import PersonIcon from "@mui/icons-material/Person"
import { useStoreTemporary, useStoreUser } from "../../zustand"
import VirtualTeacherPopup from "./VirtualTeacherPopup"

function Sidebar() {
  const { userInfo } = useStoreUser()
  const location = useLocation()
  const [hide, setHide] = useState(true)
  const [isShown, setIsShown] = useState(false)
  const { setSidebarWidth } = useStoreTemporary()

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
      <Link to="/" style={{ display: "flex", marginLeft: !hide && 10 }}>
        {hide ? (
          <img
            src="/logo.png"
            alt="logo"
            style={{ height: "40px", marginLeft: 5 }}
          />
        ) : (
          <img src="/logo-mini.png" alt="minilogo" style={{ height: "37px" }} />
        )}
      </Link>
      <IconButton
        onClick={() => (
          setHide(!hide),
          setIsShown(!isShown),
          hide ? setSidebarWidth(90) : setSidebarWidth(300)
        )}
        style={{
          position: "absolute",
          top: hide ? 15 : 60,
          right: hide ? 2 : 22,
          color: "#BAB9CC",
          display: isShown ? "flex" : "none",
        }}
      >
        {hide ? (
          <KeyboardDoubleArrowLeftIcon />
        ) : (
          <KeyboardDoubleArrowRightIcon />
        )}
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
            data.map((item, index) => (
              <Link key={index} to={item.link}>
                <ListItem disablePadding>
                  <ListItemButton
                    className="onHover"
                    style={{
                      background:
                        location.pathname == item.link ? "#5f6ac4" : "inherit",
                      color:
                        location.pathname == item.link ? "white" : "#BAB9CC",
                      borderRadius: 5,
                      marginBottom: 5,
                    }}
                  >
                    <ListItemIcon style={{ color: "inherit" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </Link>
            ))
          ) : userInfo?.role === "student" ? (
            <>
              {dataStudent.map((item, index) => (
                <Link key={index} to={item.link}>
                  <ListItem disablePadding>
                    <ListItemButton
                      className="onHover"
                      style={{
                        background:
                          location.pathname == item.link
                            ? "#5f6ac4"
                            : "inherit",
                        color:
                          location.pathname == item.link ? "white" : "#BAB9CC",
                        borderRadius: 5,
                        marginBottom: 5,
                      }}
                    >
                      <ListItemIcon style={{ color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
              <Link to={`/student/${userInfo.uid}`}>
                <ListItem disablePadding>
                  <ListItemButton
                    className="onHover"
                    style={{
                      background:
                        location.pathname == `/student/${userInfo.uid}`
                          ? "#5f6ac4"
                          : "inherit",
                      color:
                        location.pathname == `/student/${userInfo.uid}`
                          ? "white"
                          : "#BAB9CC",
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
            dataAdmin.map((item, index) => (
              <>
                <Link key={index} to={item.link}>
                  <ListItem disablePadding>
                    <ListItemButton
                      className="onHover"
                      style={{
                        background:
                          location.pathname == item.link
                            ? "#5f6ac4"
                            : "inherit",
                        color:
                          location.pathname == item.link ? "white" : "#BAB9CC",
                        borderRadius: 5,
                        marginBottom: 5,
                      }}
                    >
                      <ListItemIcon style={{ color: "inherit" }}>
                        {item.icon}
                      </ListItemIcon>
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
        {/* <List>
          <ListItem></ListItem>
        </List> */}
      </Box>
      <VirtualTeacherPopup />
    </Box>
  )
}

export default Sidebar

const data = [
  {
    name: "Dashboard",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Curriculum",
    link: "/class-curriculum",
    icon: <CastForEducationIcon />,
  },
  {
    name: "All Students",
    link: "/class-students",
    icon: <PersonIcon />,
  },
  {
    name: "Class Statistics",
    link: "/class-statistics",
    icon: <QueryStatsIcon />,
  },
  {
    name: "Study Resources",
    link: "/resources",
    icon: <FolderSpecialIcon />,
  },
  {
    name: "Mark Writing",
    link: "/grade-writing",
    icon: <SpellcheckIcon />,
  },
]

const dataStudent = [
  {
    name: "Dashboard",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Curriculum",
    link: "/class-curriculum",
    icon: <CastForEducationIcon />,
  },
  {
    name: "Study Resources",
    link: "/resources",
    icon: <FolderSpecialIcon />,
  },
  {
    name: "Tests",
    link: "/test",
    icon: <QuizIcon />,
  },
  {
    name: "Writing",
    link: "/writing",
    icon: <HistoryEduIcon />,
  },
  {
    name: "Professor Johny",
    link: "/virtual-teacher",
    icon: <AdbIcon />,
  },
]

const dataAdmin = [
  {
    name: "Dashboard",
    link: "/",
    icon: <HomeIcon />,
  },
  {
    name: "Curriculum",
    link: "/class-curriculum",
    icon: <CastForEducationIcon />,
  },
  {
    name: "All Students",
    link: "/class-students",
    icon: <PersonIcon />,
  },
  {
    name: "Class Statistics",
    link: "/class-statistics",
    icon: <QueryStatsIcon />,
  },
  {
    name: "Study Resources",
    link: "/resources",
    icon: <FolderSpecialIcon />,
  },
  {
    name: "Tests",
    link: "/test",
    icon: <QuizIcon />,
  },
  {
    name: "Writing",
    link: "/writing",
    icon: <HistoryEduIcon />,
  },
  {
    name: "Professor Johny",
    link: "/virtual-teacher",
    icon: <AdbIcon />,
  },
  {
    name: "Mark Writing",
    link: "/grade-writing",
    icon: <SpellcheckIcon />,
  },
]
