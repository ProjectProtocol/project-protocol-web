import { Button } from "react-bootstrap"
import { logout } from "../api/session"
import { useAuth } from "../contexts/auth/AuthContext"
import { useState } from "react"

export default function Welcome() {
  const { user, setUser } = useAuth()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    setLoading(true)
    await logout()
    setLoading(false)
    setUser()
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
      <h1>Welcome, {user?.email}</h1>
      <Button disabled={loading} onClick={handleLogout}>
        {`Log Out${loading ? "..." : ""}`}
      </Button>
    </div>
  )
}
