import { Button, ModalProps, Spinner } from 'react-bootstrap'
import PopUp from './PopUp'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { ApiUsers } from 'src/api'
import { toast } from 'react-hot-toast'
import { useAuth } from 'src/contexts/auth/AuthContext'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  ...modalProps
}: IAccountDeleteModal) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { setUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onSubmit', defaultValues: { password: '' } })

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(true)
  }
  const handleCloseConfirmPassword = () => {
    setShowConfirmPassword(false)
    modalProps.onHide && modalProps.onHide()
  }

  const onSubmit = async (data: { password: string }) => {
    const userPassword = data.password

    await ApiUsers.destroy(userPassword)
      .then(() => {
        toast.success('Account successfully deleted')
        setUser(undefined)
      })
      .catch(() => {
        toast.error('Incorrect password entered. Please try again.')
      })
  }
  const passwordErrors = errors?.password?.message

  return (
    <PopUp
      closeButton
      title="Delete account?"
      {...modalProps}
      onHide={handleCloseConfirmPassword}
    >
      {!showConfirmPassword ? (
        <div>
          <p>
            Do you wish to delete your account and any reviews you have created?
            This action cannot be undone.
          </p>
          <div className="d-flex flex-row justify-content-between">
            <Button variant="tertiary" onClick={modalProps.onHide}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleShowConfirmPassword}>
              Delete my account
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p>Please enter your password to confirm account deletion.</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                type="password"
                label="Password"
                error={passwordErrors}
                isInvalid={!!passwordErrors}
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Password is too short (minimum 8 characters)',
                  },
                })}
              />
            </div>
            <Button
              variant="danger"
              size="lg"
              type="submit"
              disabled={!errors || isSubmitting}
              className="w-100 mt-4"
            >
              {isSubmitting ? (
                <Spinner
                  size="sm"
                  role="status"
                  animation="border"
                  variant="black"
                  className="me-2"
                />
              ) : (
                'Delete Account'
              )}
            </Button>
          </form>
        </div>
      )}
    </PopUp>
  )
}
