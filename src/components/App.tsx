import { Outlet, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthContext"

import { Button, Container } from "react-bootstrap"
import { useEffect } from "react"

export default function App() {
  const {
    state: { user },
    dispatch,
  } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      console.log("user falsey")

      return navigate("/login")
    }
  }, [user, navigate])

  return (
    <Container className="p-3 text-center">
      <h1>You are logged in '{user?.email}'</h1>
      <Button onClick={() => dispatch({ type: "SET_USER", data: undefined })}>
        Clear user
      </Button>
      <Outlet />
    </Container>
  )
}
