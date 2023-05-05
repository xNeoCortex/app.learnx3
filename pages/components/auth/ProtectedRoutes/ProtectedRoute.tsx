import { Navigate, Outlet } from "react-router-dom"
import WaitingPage from "../../Components/WaitingPage"
import LoadingPage from "../../Components/LoadingPage"

function ProtectedRoute({ user, userInfo }) {
  if (user === undefined) {
    return <LoadingPage />
  }
  if (!userInfo.permit && userInfo.role == "teacher") return <WaitingPage />
  return user ? <Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute
