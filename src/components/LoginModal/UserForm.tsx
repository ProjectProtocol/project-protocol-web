import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Spinner } from 'react-bootstrap'
import Input from '../Input'
import emailRegex from 'src/util/emailRegex'
import { useEffect } from 'react'
import { kebabCase } from 'lodash'

export interface IUserFormState {
  email: string
  password: string
}

interface IUserForm {
  title: string
  submitLabel: string
  onSubmit: SubmitHandler<IUserFormState>
  isActive: boolean
}

export default function UserForm({
  title,
  isActive,
  submitLabel = 'Submit',
  onSubmit,
}: IUserForm) {
  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUserFormState>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (!isActive) {
      unregister(['email', 'password'])
      reset({
        email: '',
        password: '',
      })
    }
  }, [isActive, unregister, reset])

  const passwordErrors = errors?.password?.message
  const emailErrors = errors?.email?.message

  return (
    <div className="d-block">
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          controlId={`${kebabCase(title)}-email`}
          error={emailErrors}
          isInvalid={!!emailErrors}
          label="Email address"
          type="email"
          {...register('email', {
            required: true,
            pattern: {
              value: emailRegex,
              message: 'Email is invald',
            },
          })}
          placeholder="name@example.com"
        />
        <Input
          controlId={`${kebabCase(title)}-password`}
          error={passwordErrors}
          isInvalid={!!passwordErrors}
          label="Password"
          type="password"
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: 'Password is too short (minimum 8 characters)',
            },
          })}
        />
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
      </form>
    </div>
  )
}
