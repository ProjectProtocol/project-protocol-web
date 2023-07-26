import { useAuth } from "../contexts/auth/AuthContext"
import icon from "../images/icon.svg"
import { Button, FloatingLabel, Form } from "react-bootstrap"

function App() {
  const {
    state: { user },
    dispatch,
  } = useAuth()

  return (
    <>
      <h1>You are logged in {user?.email}</h1>
      <Button onClick={() => dispatch({ type: "SET_USER", data: undefined })}>
        Clear user
      </Button>
    </>
  )
}

export default App
