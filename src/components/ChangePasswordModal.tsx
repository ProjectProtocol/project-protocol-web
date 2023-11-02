import PopUp from './PopUp'
import { Button, ModalProps, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { useEffect } from 'react'

interface IChangePasswordModal extends ModalProps {}

export interface IChangePasswordModalForm {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export default function ChangePasswordModal({
  onSubmit,
  onHide,
  ...modalProps
}: IChangePasswordModal) {
  const {
    register,
    watch,
    getFieldState,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  useEffect(() => {
    !modalProps.show && reset()
  }, [modalProps.show, reset])

  const handleClose = () => {
    onHide && onHide()
    reset()
  }

  function validationProps(fieldName: keyof IChangePasswordModalForm) {
    const { error } = getFieldState(fieldName)
    return {
      isInvalid: !!error?.message,
      error: error?.message,
    }
  }

  return (
    <PopUp
      closeButton
      title="Change Password"
      {...modalProps}
      onHide={handleClose}
    >
      <div>
        <p>Please enter a new password of at least 8 characters.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          label="Current Password"
          type="password"
          {...validationProps('password')}
          {...register('password', {
            required: 'Current password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters long',
            },
          })}
        />
        <hr />
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
          <Button
            size="lg"
            variant="primary"
            type="submit"
            disabled={!errors || isSubmitting}
            className="w-100"
          >
            {isSubmitting ? (
              <>
                <Spinner
                  size="sm"
                  role="status"
                  animation="border"
                  variant="black"
                  className="mt-2"
                />
              </>
            ) : (
              'Submit'
            )}
          </Button>
        </div>
      </form>
    </PopUp>
  )
}
