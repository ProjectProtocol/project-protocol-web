import { SubmitHandler, useForm } from "react-hook-form"
import { login } from "../api/session"
import icon from "../images/icon.svg"
import { Button, FloatingLabel, Form } from "react-bootstrap"
import { useAuth } from "../contexts/auth/AuthContext"

interface LoginFormI {
  email: string
  password: string
}

const Login = () => {
  const { setUser } = useAuth()

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

  return (
    <div className="d-flex justify-content-center flex-column align-items-center vh-100">
      <div className="w-100 p-4" style={{ maxWidth: 350 }}>
        <div className="mb-5 text-center">
          <img src={icon} alt="Project protocol logo" style={{ width: 50 }} />
        </div>
        <h4 className="mb-3 fw-normal">Log in to Project Protocol</h4>
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
