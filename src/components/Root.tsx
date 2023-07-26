import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthContext"

import { Container } from "react-bootstrap"
import { useEffect } from "react"
import { RootState } from "../loaders/rootLoader"

export default function Root() {
  const { user } = useLoaderData() as RootState
  const { state } = useAuth()
  console.log(state)

  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      console.log("user falsey")

      return navigate("welcome")
    }
  }, [user, navigate])

  return (
    <Container className="p-3 text-center">
      <Outlet />
    </Container>
  )
}
