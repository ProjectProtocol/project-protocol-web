import { Button, ModalProps, Spinner } from 'react-bootstrap'
import PopUp from './PopUp'
import { useState } from 'react'
import Input from './Input'
import apiClient from 'src/api/client'
import { useForm } from 'react-hook-form'

interface IAccountDeleteModal extends ModalProps {}

interface IDeleteAccount {
  password: string
}

export default function AccountDeleteModal({
  ...modalProps
}: IAccountDeleteModal) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    formState: { errors },
  } = useForm<IDeleteAccount>({
    mode: 'onSubmit',
    defaultValues: {
      password: '',
    },
  })

  const passwordErrors = errors?.password?.message

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(true)
  }

  // const handleDeleteAccount = (password: string) => {
  // console.log(password)
  const handleDeleteAccount = async (userPassword: string) => {
    setIsLoading(true)
    const deleteAccount = await apiClient
      .delete('/auth', {
        data: { password: userPassword },
      })
      .finally(() => {
        setIsLoading(false)
      })
    console.log(deleteAccount)
    // setShowConfirmPassword(false)
    // modalProps.onHide
  }

  return (
    <PopUp closeButton title="Delete account?" {...modalProps}>
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
          <form>
            <Input
              type="password"
              label="password"
              error={passwordErrors}
              isInvalid={!!passwordErrors}
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: 'Password is too short (minimum 8 characters)',
                },
              })}
            ></Input>
            <Button
              variant="danger"
              size="lg"
              type="submit"
              disabled={!errors || isLoading}
              className="w-100 mt-4"
              onClick={() => handleDeleteAccount}
            >
              {isLoading ? (
                <>
                  <Spinner
                    size="sm"
                    role="status"
                    animation="border"
                    variant="black"
                    className="me-2"
                  >
                    Deleting...
                  </Spinner>
                </>
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
