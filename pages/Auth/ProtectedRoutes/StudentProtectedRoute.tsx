import { Navigate, Outlet } from "react-router-dom"

function StudentProtectedRoute({ user }) {
  if (user) {
    return user?.role === "student" || user?.role === "admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/error" />
    )
  }
}

export default StudentProtectedRoute
