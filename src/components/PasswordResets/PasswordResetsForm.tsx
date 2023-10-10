import { Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '../Input'

interface IPasswordResetsFormState {
  newPassword: string
  newPasswordConfirm: string
}

interface IPasswordResetsForm {
  onSubmit: SubmitHandler<IPasswordResetsFormState>
}
export default function PasswordResetsForm({ onSubmit }: IPasswordResetsForm) {
  const { register, watch, getFieldState, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  function validationProps(fieldName: keyof IPasswordResetsFormState) {
    const { error } = getFieldState(fieldName)
    return {
      isInvalid: !!error?.message,
      error: error?.message,
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm px-2">
      <Input
        label="New Password"
        type="password"
        {...validationProps('newPassword')}
        {...register('newPassword', {
          required: 'Password is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        })}
      />
      <Input
        label="Confirm New Password"
        type="password"
        {...validationProps('newPasswordConfirm')}
        {...register('newPasswordConfirm', {
          required: 'Password confirmation is required',
          validate: (value) =>
            value === watch('newPassword') || 'Passwords do not match',
        })}
      />
      <div className="d-flex flex-row justify-content-between">
        <Link className="col btn btn-tertiary btn-lg me-3" to="/">
          Cancel
        </Link>
        <Button type="submit" size="lg" disabled={false}>
          Update password
        </Button>
      </div>
    </form>
  )
}
