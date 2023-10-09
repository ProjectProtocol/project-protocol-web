import { SubmitHandler, useForm } from 'react-hook-form'
import icon from '../../images/icon.svg'
import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap'

export interface IForgotPasswordFormState {
  email: string
}

interface IForgotPasswordForm {
  onSubmit: SubmitHandler<IForgotPasswordFormState>
}

export default function ForgotPasswordForm({ onSubmit }: IForgotPasswordForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<IForgotPasswordFormState>({
    defaultValues: {
      email: '',
    },
  })

  return (
    <div className="d-block">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h3>
          <img
            src={icon}
            alt="Project protocol logo"
            className="me-2"
            style={{ height: '1.125rem' }}
          />
          Forgot password
        </h3>
        <p className="small help">
          Enter the email address you used to register, and we'll send you a
          password reset link.
        </p>

        <FloatingLabel label="Email" className="mb-3">
          <Form.Control
            type="email"
            isInvalid={!!errors?.email}
            isValid={isDirty && isValid}
            {...register('email', {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <div className="mb-3">
          <Button
            size="lg"
            className="w-100"
            variant="primary"
            disabled={!isValid || isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <Spinner
                  size="sm"
                  role="status"
                  animation="border"
                  variant="black"
                  className="me-2"
                />
              </>
            ) : (
              'Reset password'
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
