import { Button } from "react-bootstrap"
import { logout } from "../api/session"
import { useAuth } from "../contexts/auth/AuthContext"
import { Navigate } from "react-router-dom"

export default function Welcome() {
  const { user, setUser } = useAuth()

  const handleLogout = async () => {
    await logout()
    setUser()
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return (
    <div>
      <h1>Welcome, {user?.email}</h1>
      <Button onClick={handleLogout}>Log Out</Button>
    </div>
  )
}
