import { SubmitHandler, useForm } from 'react-hook-form'
import icon from '../../images/icon.svg'
import { Button, Spinner } from 'react-bootstrap'
import emailRegex from 'src/util/emailRegex'
import Input from '../Input'

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

  const fieldError = errors?.email?.message

  return (
    <div className="d-block">
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          type="email"
          label="Email"
          isInvalid={!!fieldError}
          isValid={isDirty && isValid}
          error={fieldError}
          {...register('email', {
            required: true,
            pattern: emailRegex,
          })}
          placeholder="name@example.com"
        />
        <Button
          size="lg"
          className="w-100"
          variant="primary"
          disabled={isSubmitting}
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
      </form>
    </div>
  )
}
