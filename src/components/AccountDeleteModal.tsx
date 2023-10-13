import { Button, ModalProps } from 'react-bootstrap'
import PopUp from './PopUp'
import { useState } from 'react'
import Input from './Input'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  ...modalProps
}: IAccountDeleteModal) {
  const [showPasswordConfirmation, setShowPasswordComfiration] = useState(false)

  const handlePasswordConfirmation = () => {
    setShowPasswordComfiration(true)
  }

  // const handleAccountDelete = (password: string) => {
  // console.log(password)
  const handleAccountDelete = () => {
    setShowPasswordComfiration(false)
    modalProps.onHide
  }

  return (
    <PopUp closeButton title="Delete account?" {...modalProps}>
      {!showPasswordConfirmation ? (
        <div>
          <p>
            Do you wish to delete your account and any reviews you have created?
            This action cannot be undone.
          </p>
          <div className="d-flex flex-row justify-content-between">
            <Button variant="tertiary" onClick={modalProps.onHide}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handlePasswordConfirmation}>
              Delete my account
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <p>Please enter your password to confirm account deletion</p>
          <form>
            <Input type="password" label="password"></Input>
          </form>
          <Button
            variant="danger"
            size="lg"
            type="submit"
            className="w-100 mt-4"
            onClick={handleAccountDelete}
          >
            Delete Account
          </Button>
        </div>
      )}
    </PopUp>
  )
}
