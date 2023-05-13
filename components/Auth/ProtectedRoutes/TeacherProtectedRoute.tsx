import { Navigate, Outlet } from "react-router-dom"

function TeacherProtectedRoute({ user }) {
  if (user) {
    return user?.role === "teacher" || user?.role === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/error" />
    )
  }
}

export default TeacherProtectedRoute
