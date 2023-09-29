import { SubmitHandler, useForm } from 'react-hook-form'
import icon from '../../images/icon.svg'
import { Button, FloatingLabel, Form, Spinner } from 'react-bootstrap'

export interface IUserFormState {
  email: string
  password: string
}

interface IUserForm {
  title: string
  submitLabel: string
  onSubmit: SubmitHandler<IUserFormState>
  inputClassName?: string
}

export default function UserForm({
  title,
  submitLabel = 'Submit',
  onSubmit,
  inputClassName,
}: IUserForm) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUserFormState>({
    defaultValues: {
      email: '',
      password: '',
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
          {title}
        </h3>
        <p className="small help">
          Create an account to share your own experiences.
        </p>

        <FloatingLabel label="Email address" className="mb-3">
          <Form.Control
            type="email"
            className={inputClassName}
            {...register('email', { required: true })}
            placeholder="name@example.com"
          />
        </FloatingLabel>
        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            className={inputClassName}
            data-bs-theme="primary"
            {...register('password', { required: true })}
          />
        </FloatingLabel>
        <div className="mb-3">
          <Button
            size="lg"
            className="w-100"
            variant="primary"
            disabled={!errors || isSubmitting}
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
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
