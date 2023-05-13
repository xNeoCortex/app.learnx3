import LoadingPage from "@/pages/components/Components/LoadingPage"
import WaitingPage from "@/pages/components/Components/WaitingPage"
import { Navigate, Outlet } from "react-router-dom"

function ProtectedRoute({ user, userInfo }) {
  if (user === undefined) {
    return <LoadingPage/>
  }
  if (!userInfo.permit && userInfo.role == "teacher") return <WaitingPage />
  return user ? <Outlet /> : <Navigate to="/auth/login" />
}

export default ProtectedRoute
