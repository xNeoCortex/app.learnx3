import React, { useEffect } from "react"
import Head from "next/head"
import { db } from "./firebaseX"
import { getDoc, doc } from "firebase/firestore"
import { useStoreUser } from "./zustand"
import { Inter } from "next/font/google"
import { Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./firebaseX"
import AuthContainer from "./components/auth/User/AuthContainer"
import LoginWithPhone from "./components/auth/User/SignInPhone"
import Login from "./components/auth/User/SignIn"
import SignUp from "./components/auth/User/SignUp"
import AppContainer from "./components/educateX/AppContainer"
import MyDashboard from "./components/educateX/Teacher/MyDashboard"
import ClassStatistics from "./components/educateX/Teacher/ClassStatistics"
import ClassStudents from "./components/educateX/Teacher/ClassStudents"
import MySettings from "./components/educateX/Teacher/MySettings"
import StudentProfile from "./components/educateX/Teacher/Student/StudentProfile"
import ProtectedRoute from "./components/auth/ProtectedRoutes/ProtectedRoute"
import UserInfo from "./components/auth/FirstTimeLogin/UserInfo"
import ForgotPassword from "./components/auth/User/ForgotPassword"
import Curriculum from "./components/educateX/Curriculum/Curriculum"
import StudentDashboard from "./components/educateX/Student/StudentDashboard"
import EnglishTest from "./components/educateX/Student/EnglishTest"
import Test from "./components/educateX/Student/Test"
import EnglishWriting from "./components/educateX/Writing/EnglishWriting"
import Writing from "./components/educateX/Writing/Writing"
import VirtualTeacher from "./components/educateX/Student/VirtualTeacher"
import Resources from "./components/educateX/Resources"
import StudentInfo from "./components/auth/FirstTimeLogin/StudentInfo"
import Iam from "./components/auth/FirstTimeLogin/Iam"
import ErrorPage from "./components/educateX/ErrorPage"
import StudentProtectedRoute from "./components/auth/ProtectedRoutes/StudentProtectedRoute"
import LoadingPage from "./components/educateX/LoadingPage"
import TeacherProtectedRoute from "./components/auth/ProtectedRoutes/TeacherProtectedRoute"
import LessonPage from "./components/educateX/Curriculum/LessonPage"
import GradeWritingPage from "./components/educateX/Writing/GradeWritingPage"
import GradeWritingList from "./components/educateX/Writing/GradeWritingList"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  const [loading, setLoading] = React.useState(false)
  const { userInfo, setUserInfo, userLogin, setUserLogin } = useStoreUser()
  const [currentUser, setCurrentUser] = React.useState(null)

  // Fetch current user data
  async function fetchData(uid: string) {
    setLoading(true)
    try {
      const docRef = doc(db, "teachers", uid)
      const usersData = await getDoc(docRef)

      const docRefStudent = doc(db, "students", uid)
      const usersDataStudent = await getDoc(docRefStudent)

      // console.log("usersDataStudent :>> ", usersData.data())

      if (usersData.exists()) {
        setUserInfo(usersData.data())
        setCurrentUser(usersData.data())
      } else if (usersDataStudent.exists()) {
        setUserInfo(usersDataStudent.data())
        setCurrentUser(usersDataStudent.data())
      } else {
        console.log("No such document!")
      }
      setLoading(false)
    } catch (error) {
      console.log("fetchData :>> ", error)
    }
  }

  // set logged in user and fethced user data
  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogin(user)
        fetchData(user.uid)
      } else {
        // User is signed out
        setUserLogin(null)
        fetchData(null)
      }
    })
  }, [])

  return (
    <>
      <Head>
        <title>LearnX3 App</title>
        <meta name="description" content="English Language teaching platform" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Routes>
        <Route path="/auth" element={<AuthContainer />}>
          <Route path="login" element={<Login />} />
          <Route path="login-phone" element={<LoginWithPhone />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute user={userLogin} />}>
          <Route path="who-iam" element={<Iam />} />
          <Route path="user-info" element={<UserInfo />} />
          <Route path="student-info" element={<StudentInfo />} />
          <Route path="/" element={<AppContainer />}>
            <Route index element={<MyDashboard />} />
            <Route path="class-curriculum" element={<Curriculum />} />
            <Route path="class-curriculum/:id" element={<LessonPage />} />
            <Route path="settings" element={<MySettings />} />
            <Route path="resources" element={<Resources />} />
            <Route path="error" element={<ErrorPage />} />
            <Route path="student/:id" element={<StudentProfile />} />
            <Route path="grade-writing/:id" element={<GradeWritingPage />} />
            <Route path="virtual-teacher" element={<VirtualTeacher />} />
            <Route path="*" element={<Navigate to="/" replace />} />

            <Route element={<TeacherProtectedRoute user={currentUser} />}>
              <Route path="class-statistics" element={<ClassStatistics />} />
              <Route path="class-students" element={<ClassStudents />} />
              <Route path="grade-writing" element={<GradeWritingList />} />
            </Route>

            <Route element={<StudentProtectedRoute user={currentUser} />}>
              <Route path="test" element={<EnglishTest />} />
              <Route path="test/:id" element={<Test />} />
              <Route path="writing" element={<EnglishWriting />} />
              <Route path="writing/:id" element={<Writing />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}
