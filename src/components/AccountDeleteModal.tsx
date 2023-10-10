import { Button, ModalProps } from 'react-bootstrap'
import PopUp from './PopUp'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  ...modalProps
}: IAccountDeleteModal) {
  return (
    <PopUp closeButton title="Delete account?" {...modalProps}>
      <p>
        Do you wish to delete your account and any reviews you have created?
        This action cannot be undone.
      </p>
      <div className="d-flex flex-row justify-content-between">
        <Button variant="tertiary" onClick={modalProps.onHide}>
          Cancel
        </Button>
        <Button variant="danger">Delete my account</Button>
      </div>
    </PopUp>
  )
}
