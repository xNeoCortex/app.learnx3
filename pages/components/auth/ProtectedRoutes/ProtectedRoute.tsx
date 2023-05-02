import { Navigate, Outlet } from "react-router-dom"
import LoadingPage from "../../educateX/LoadingPage"
import WaitingPage from "../../educateX/WaitingPage"

function ProtectedRoute({ user, userInfo }) {
  if (user === undefined) {
    return <LoadingPage />
  }
  if (!userInfo.permit && userInfo.role == "teacher") return <WaitingPage />
  return user ? <Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute
