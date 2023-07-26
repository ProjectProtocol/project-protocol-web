import { Outlet, useLoaderData, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/auth/AuthContext"

import { Container } from "react-bootstrap"
import { useEffect } from "react"
import { RootState } from "../loaders/rootLoader"

export default function Root() {
  const { user } = useLoaderData() as RootState
  const { state, dispatch } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      console.log("user falsey")

      return navigate("login")
    } else {
      console.log("Setting user")

      dispatch({ type: "SET_USER", data: user })
    }
  }, [user, dispatch, navigate])

  return (
    <Container className="p-3 text-center">
      <p>{user?.email}</p>
      <Outlet />
    </Container>
  )
}
