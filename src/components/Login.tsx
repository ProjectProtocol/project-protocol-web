import { SubmitHandler, useForm } from "react-hook-form"
import { login } from "../api/session"
import icon from "../images/icon.svg"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useAuth } from "../contexts/auth/AuthContext"
import { Navigate } from "react-router-dom"

interface LoginFormI {
  email: string
  password: string
}

const Login = () => {
  const { user, setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormI>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit: SubmitHandler<LoginFormI> = async ({ email, password }) => {
    const { user } = await login(email, password)
    setUser(user)
  }

  return user ? (
    <Navigate to="/welcome" />
  ) : (
    <div className="vh-100 d-flex justify-content-center flex-column align-items-center">
      <div className="m-auto p-3" style={{ maxWidth: "300px" }}>
        <div
          className="bg-light bg-gradient p-2 border rounded-5 d-flex align-items-center justify-content-center m-auto mb-5"
          style={{ height: "100px", width: "100px" }}
        >
          <img src={icon} alt="Project protocol logo" />
        </div>
        <h4 className="mb-3">Log in to Project Protocol</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FloatingLabel label="Email address" className="mb-3">
            <Form.Control
              type="email"
              {...register("email", { required: true })}
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </FloatingLabel>
          <Button
            size="lg"
            variant="primary"
            disabled={!errors}
            type="submit"
            className="float-end"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Login
