import { ErrorMessage } from '@hookform/error-message'
import { Button, FloatingLabel, FormControl } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'

interface IPasswordResetsFormState {
  newPassword: string
  newPasswordConfirm: string
}

interface IPasswordResetsForm {
  onSubmit: SubmitHandler<IPasswordResetsFormState>
}
export default function PasswordResetsForm({ onSubmit }: IPasswordResetsForm) {
  const {
    register,
    watch,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  function validationProps(fieldName: 'newPassword' | 'newPasswordConfirm'): {
    isValid: boolean
    isInvalid: boolean
  } {
    const { isTouched, invalid, error } = getFieldState(fieldName)

    return {
      isValid: isTouched && !invalid,
      isInvalid: isTouched && !!error,
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm px-2">
      <FloatingLabel label="New Password">
        <FormControl
          type="password"
          placeholder="SecurePassword123"
          {...validationProps('newPassword')}
          autoComplete="false"
          {...register('newPassword', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        <FormControl.Feedback type="invalid">
          <ErrorMessage errors={errors} name="newPassword" />
        </FormControl.Feedback>
      </FloatingLabel>
      <FloatingLabel label="Confirm New Password">
        <FormControl
          type="password"
          placeholder="SecurePassword12334"
          autoComplete="false"
          {...validationProps('newPasswordConfirm')}
          {...register('newPasswordConfirm', {
            required: 'Password confirmation is required',
            validate: (value) =>
              value === watch('newPassword') || 'Passwords do not match',
          })}
        />
        <FormControl.Feedback type="invalid">
          <ErrorMessage errors={errors} name="newPasswordConfirm" />
        </FormControl.Feedback>
      </FloatingLabel>
      <div className="d-flex flex-row justify-content-between">
        <Link className="col btn btn-tertiary btn-lg me-3" to="/">
          Cancel
        </Link>
        <Button type="submit" size="lg" disabled={isDirty && !isValid}>
          Update password
        </Button>
      </div>
    </form>
  )
}
