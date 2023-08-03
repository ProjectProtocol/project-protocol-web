import { Outlet } from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthContext"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import { reauthenticate } from "../api/session"

export default function Root() {
  const { user, setUser } = useAuth()

  useEffect(() => {
    async function checkAuth() {
      const isAuthenticated = await reauthenticate()
      if (!isAuthenticated) {
        setUser()
      }
    }

    if (user) {
      checkAuth()
    }
  }, [user, setUser])

  return (
    <Container className="p-3 text-center">
      <p>{user?.email}</p>
      <Outlet />
    </Container>
  )
}
