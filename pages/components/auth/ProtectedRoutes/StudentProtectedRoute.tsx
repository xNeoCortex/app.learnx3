import { Navigate, Outlet } from "react-router-dom"
import LoadingPage from "../../educateX/LoadingPage"

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
