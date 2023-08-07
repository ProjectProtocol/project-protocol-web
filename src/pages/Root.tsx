import { useAuth } from "../contexts/auth/AuthContext"
import { Container } from "react-bootstrap"
import { useEffect } from "react"
import { reauthenticate } from "../api/session"
import Login from "./Login"
import Home from "./Home"

export default function Root() {
  const { user, setUser } = useAuth()

  useEffect(() => {
    async function checkAuth() {
      const { user } = await reauthenticate()
      if (user) {
        setUser(user)
      }
    }

    if (!user) {
      checkAuth()
    }
  }, [user, setUser])

  return <Container fluid>{user ? <Home /> : <Login />}</Container>
}
