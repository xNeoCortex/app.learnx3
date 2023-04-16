import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute({ user }) {
  if (user === undefined) {
    return null // or loading indicator/spinner/etc
  }
  return user ? <Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute
