import { Button, ModalProps, Spinner } from 'react-bootstrap'
import PopUp from './PopUp'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import Input from './Input'
import axios from 'axios'
import { toast } from 'react-hot-toast'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  ...modalProps
}: IAccountDeleteModal) {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: { password: '' } })

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(true)
  }

  const handleDeleteAccount = async (data) => {
    await axios
      .delete('/auth', { data: { password: data.password } })
      .then((r) => toast.success(r.statusText))
      .catch((e) => toast.error(e.message))
      .finally()
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
          <form onSubmit={handleSubmit(handleDeleteAccount)}>
            <div>
              <Input
                type="password"
                label="Password"
                {...register('password', {
                  required: true,
                  minLength: {
                    value: 8,
                    message: 'Password is too short (minimum 8 characters)',
                  },
                })}
              ></Input>
            </div>
            <Button
              variant="danger"
              size="lg"
              type="submit"
              disabled={!errors || isSubmitting}
              className="w-100 mt-4"
            >
              {isSubmitting ? (
                <>
                  <Spinner
                    size="sm"
                    role="status"
                    animation="border"
                    variant="black"
                    className="me-2"
                  ></Spinner>
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
