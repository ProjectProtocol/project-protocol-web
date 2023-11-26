import { Button, ModalProps, Spinner } from 'react-bootstrap'
import PopUp from './PopUp'
import { useForm } from 'react-hook-form'
import Input from './Input'
import AsyncButton from './AsyncButton'

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
              autoFocus
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
          <div>
            {isSubmitting ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner
                  role="status"
                  animation="border"
                  variant="black"
                  className="mt-2"
                />
              </div>
            ) : (
              <div className="d-flex flex-row justify-content-between mt-4">
                <Button variant="tertiary" onClick={modalProps.onHide}>
                  Cancel
                </Button>
                <AsyncButton
                  loading={isSubmitting}
                  variant="danger"
                  type="submit"
                  disabled={!errors || isSubmitting}
                >
                  Delete My Account
                </AsyncButton>
              </div>
            )}
          </div>
        </form>
      </div>
    </PopUp>
  )
}
