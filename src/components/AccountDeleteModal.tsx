import { Button, ModalProps, Spinner } from 'react-bootstrap'
import PopUp from './PopUp'
import { useForm } from 'react-hook-form'
import Input from './Input'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  onSubmit,
  ...modalProps
}: IAccountDeleteModal) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onSubmit', defaultValues: { password: '' } })

  const passwordErrors = errors?.password?.message

  return (
    <PopUp closeButton title="Delete account?" {...modalProps}>
      <div>
        <p>
          Do you wish to delete your account and any reviews you have created?
          This action cannot be undone.
        </p>
      </div>
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
          <div className="d-flex flex-row justify-content-between mt-4">
            <Button variant="tertiary" onClick={modalProps.onHide}>
              Cancel
            </Button>
            <Button
              variant="danger"
              type="submit"
              disabled={!errors || isSubmitting}
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
                'Delete My Account'
              )}
            </Button>
          </div>
        </form>
      </div>
    </PopUp>
  )
}
